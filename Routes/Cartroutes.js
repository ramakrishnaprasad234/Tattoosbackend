// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/Cartcontroller');

// Route to add an item to the cart
router.post('/add', cartController.addItem);

// Route to get all cart items for a user
router.get('/:user_id', cartController.getCartItems);
router.post('/update/cart',cartController.updateCartItem)
// Route to delete an item from the cart
router.delete('/delete', cartController.deleteItem);
router.get('/clear/:user_id',cartController.clearCart)


module.exports = router;
