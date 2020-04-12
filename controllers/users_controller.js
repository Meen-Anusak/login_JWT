const User = require('../models/users_model')
const jwt = require('jsonwebtoken');


exports.register = async(req, res, next) => {
    const { username, password } = req.body;

    // ! check username ซ้ำ //
    const user = await User.findOne({ username: username });
    if (user) return res.json({ message: 'username นี้มีผู้ใช้งานแล้ว' })

    const newUser = new User({
        username: username,
        password: password
    });
    User.Register(newUser, (err, user) => {
        res.json(user);
    });
}


exports.login = async(req, res, next) => {

    const { username, password } = req.body;

    //! check username ในระบบ //
    const user = await User.findOne({ username: username });
    if (!user) {
        res.json({
            message: "ไม่พบผู้ใช้ในระบบ"
        })
    } else {
        const isMatch = await User.comparepassword(password, user.password)
        if (!isMatch) {
            res.json({
                message: "รหัสผ่านไม่ถูกต้อง"
            })
        } else {

            //* สร้าง Token //
            const token = await jwt.sign({
                id: user._id,
            }, 'JAXxpHjTTgHLASWDpJ5oZf3bfh2f9ggA6DIO9gUGN3UTVjPOstrru7jpVdVRBTg', { expiresIn: '5 days' });

            //* decode วันหมดอายุ //
            const expires_in = jwt.decode(token);


            res.json({
                access_token: token,
                expires_in: expires_in.exp,
                token_type: "Bearar"
            });
        }
    }
}


exports.profile = ((req, res, next) => {
    res.json(req.user);
});