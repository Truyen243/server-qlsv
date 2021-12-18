const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        if (!token) {
            return res.json({
                status: 'error',
                code: '401',
                message: 'Vui long dang nhap lai',
                data: null
            })
        } else {
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return res.json({
                        status: 'error',
                        code: '401',
                        message: 'Vui long dang nhap lai',
                        data: null
                    });
                }
                req.token = token;
                req.id = decoded.id;
                next();
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