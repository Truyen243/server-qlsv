const jwt = require("jsonwebtoken");
const {Admin} = require('../models/index');
exports.verifyToken = (req, res, next) => {
    try {
        const {authorization} = req.headers;
        const token = authorization.split(' ')[1];
        if (!token) {
            return res.json({
                status: 'error',
                code: '401',
                message: 'Vui long dang nhap lai',
                data: null
            })
        } else {
            jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
                if (err) {
                    return res.json({
                        status: 'error',
                        code: '401',
                        message: 'Vui long dang nhap lai',
                        data: null
                    });
                }
                req.id = decoded.id;
                const admin = await Admin.findByPk(req.id);
                if (admin === null) {
                    return res.json({
                        status: 'error',
                        code: '401',
                        message: 'Vui long dang nhap',
                        data: null
                    })
                } else {
                    if (admin.verify) {
                        next();
                    } else {
                        return res.json({
                            status: 'error',
                            code: '401',
                            message: 'Vui long xac nhan email',
                            data: null
                        })
                    }
                }
            });
        }
    } catch {
        res.json({
            status: 'error',
            code: '401',
            message: 'Vui long dang nhap',
            data: null
        })
    }
}