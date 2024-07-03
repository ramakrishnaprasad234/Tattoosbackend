const User = require('../modules/user')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            password
        });

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.jwt_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, msg: 'User registered successfully' });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};