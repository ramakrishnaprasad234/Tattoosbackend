
const Cart = require('../models/Cartmodels')
const Design = require('../models/design');


exports.addItem = async (req, res) => {
  try {
    const { user_id, design_id, quantity } = req.body;

    // Fetch the design to get its price
    const design = await Design.findById(design_id);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    const price = design.price;
    const subtotal = price * quantity;

    let cart = await Cart.findOne({ user_id });

    if (cart) {
      // Check if the item already exists
      const itemIndex = cart.items.findIndex((item) => item.design.toString() === design_id);
      if (itemIndex >= 0) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].subtotal = cart.items[itemIndex].quantity * price;
      } else {
        cart.items.push({ design: design_id, quantity, subtotal });
      }
    } else {
      // Create a new cart
      cart = new Cart({
        user_id,
        items: [{ design: design_id, quantity, subtotal }],
        totalPrice: subtotal,
        totalQuantity: quantity,
      });
    }

    // Update total price and quantity
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
    cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    // Save the updated cart
    await cart.save();

    // Populate the design details in the cart response
    const updatedCart = await Cart.findOne({ user_id }).populate({
      path: 'items.design', // Populate design details
      select: '', // Adjust fields as needed
    });

    return res.status(200).json({ message: 'Item added to cart', cart: updatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};




// exports.addItem = async (req, res) => {
//   try {
//     const { user_id, design_id, image, image_name, time } = req.body;
//     const cartItem = new Cart({ user_id, design_id, image, image_name, time });
//     await cartItem.save();
//     res.status(201).json({ message: 'Item added to cart successfully', cartItem });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding item to cart', error });
//   }
// };

// Get all cart items for a user
exports.getCartItems = async (req, res) => {
  try {
    const { user_id } = req.params;

    const cart = await Cart.findOne({ user_id }).populate({
      path: 'items.design',
      select: '', // Adjust fields based on your schema
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.status(200).json({ message: 'Cart fetched successfully', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};




// exports.getCartItems = async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const cartItems = await Cart.find({ user_id }).populate('design_id');
//     res.status(200).json(cartItems);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving cart items', error });
//   }
// };

// Delete an item from cart
// exports.deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Cart.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Item removed from cart successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error removing item from cart', error });
//   }
// };
exports.updateCartItem = async (req, res) => {
  try {
    const { user_id, designId, quantity } = req.body;

    // Find the cart for the given user
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the design in the cart items
    const itemIndex = cart.items.findIndex((item) => item.design.toString() === designId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Fetch the design details
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    // Update the cart item's quantity and subtotal
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].subtotal = quantity * design.price;

    // Update the cart's total price and quantity
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
    cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    // Save the updated cart
    await cart.save();

    // Populate the design details in the cart
    const updatedCart = await Cart.findOne({ user_id }).populate({
      path: 'items.design',
    });

    return res.status(200).json({ message: 'Cart item updated successfully', cart: updatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating cart', error: error.message });
  }
};


exports.deleteItem = async (req, res) => {
  try {
    const { user_id, design_id } = req.body;
    console.log(user_id,design_id)
    // Find the cart and populate the design details
    const cart = await Cart.findOne({ user_id }).populate({
      path: 'items.design',
      select: '-__v', // Exclude internal fields if necessary
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.design._id.toString() === design_id);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const removedItem = cart.items[itemIndex];

    // Ensure price is available
    if (!removedItem.design.price) {
      return res.status(400).json({ message: 'Design price is missing. Cannot remove item.' });
    }

    // Update totalPrice and totalQuantity
    cart.totalPrice -= removedItem.quantity * removedItem.design.price;
    cart.totalQuantity -= removedItem.quantity;

    // Remove the item
    cart.items.splice(itemIndex, 1);

    await cart.save();

    // Fetch the updated cart with populated design details
    const updatedCart = await Cart.findOne({ user_id }).populate({
      path: 'items.design',
      select: '-__v', // Adjust fields to include all design details needed in the response
    });

    return res.status(200).json({ message: 'Item removed from cart', cart: updatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
};





exports.clearCart = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Delete all carts associated with the given user_id
    const result = await Cart.deleteMany({ user_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No carts found for the given user_id' });
    }

    return res.status(200).json({ 
      message: 'All carts cleared successfully', 
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error clearing carts', error: error.message });
  }
};



