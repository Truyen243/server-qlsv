const {Admin} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {validatePassword, validateEmail} = require('../validate/index');
const {sendMail} = require('../sendmail/index');


let createAmin = async (req, res) => {
    try {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const check = await checkEmail(email);
        if (!check) {
            if (validateEmail(email)) {
                if (validatePassword(password)) {

                    const hashedPassword = hashPassword(password);
                    const code = randomCode(8);

                    const admin = await Admin.create({
                        ten: name,
                        email: email,
                        password: hashedPassword,
                        code: code,
                        verify: false
                    });

                    if (admin === null) {
                        return res.json({
                            status: 'error',
                            code: '405',
                            message: 'Tao tai khoan that bai 1',
                            data: null
                        })
                    } else {

                        const token = jwt.sign({
                            id: admin.id,
                            name: admin.ten,
                            email: admin.email,
                            updatedAt: admin.updatedAt,
                            createdAt: admin.createdAt,
                            exp: Math.floor(Date.now() / 1000) + (86400 * 10),
                            iat: Math.floor(Date.now())
                        }, process.env.JWT_SECRET);
                        admin.token = token;
                        await admin.save();
                        const url = `${process.env.URL_APP}/admin/verify/email/${admin.email}/code/${admin.code}`;
                        await sendMail(admin.email, url);
                        res.json({
                            status: 'success',
                            code: '200',
                            message: 'Thanh cong',
                            data: {
                                id: admin.id,
                                name: admin.ten,
                                email: admin.email,
                                updatedAt: admin.updatedAt,
                                createdAt: admin.createdAt
                            },
                            token: token
                        });
                    }

                } else {
                    return res.json({
                        status: 'error',
                        code: '405',
                        message: 'Password can co ki tu in hoa ,ki tu dac biet,co so',
                        data: null
                    })
                }
            } else {
                return res.json({
                    status: 'error',
                    code: '405',
                    message: 'Email khong dung',
                    data: null
                })
            }
        } else {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Email da ton tai',
                data: null
            })
        }


    } catch (e) {
        console.log(e)
        res.json({
            status: 'error',
            code: '405',
            message: 'Tao tai khoan that bai 2',
            data: null
        })
    }
}

let getAdminId = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await Admin.findByPk(id);
        if (admin === null) {
            return res.json({
                status: 'error',
                code: '401',
                message: 'Tai khaon khong ton tai',
                data: null
            })
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: {
                    id: admin.id,
                    name: admin.ten,
                    email: admin.email,
                    updatedAt: admin.updatedAt,
                    createdAt: admin.createdAt
                },
                token: admin.token
            })
        }

    } catch (e) {
        res.json({
            status: 'error',
            code: '401',
            message: 'Vui long dang nhap 6',
            data: null
        })
    }
}

let loginAdmin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const admin = await Admin.findOne({
            where: {
                email: email
            }
        });
        if (admin === null) {
            return res.json({
                status: 'error',
                code: '401',
                message: 'Email hoac Password sai',
                data: null
            });
        } else {
            if (admin.verify) {
                if (verifyPassword(password, admin.password)) {
                    const token = await jwt.sign({
                            id: admin.id,
                            name: admin.ten,
                            email: admin.email,
                            updatedAt: admin.updatedAt,
                            createdAt: admin.createdAt,
                            exp: Math.floor(Date.now() / 1000) + (86400 * 10),
                            iat: Math.floor(Date.now())
                        }, process.env.JWT_SECRET
                    );
                    res.json({
                        status: 'success',
                        code: '200',
                        message: 'Thanh cong',
                        data: {
                            id: admin.id,
                            name: admin.ten,
                            email: admin.email,
                            updatedAt: admin.updatedAt,
                            createdAt: admin.createdAt
                        },
                        token: token
                    })
                } else {
                    return res.json({
                        status: 'error',
                        code: '401',
                        message: 'Email hoac Password sai',
                        data: null
                    });
                }
            } else {
                return res.json({
                    status: 'error',
                    code: '401',
                    message: 'Vui long xac nhan email',
                    data: null
                })
            }

        }
    } catch (e) {
        res.json({
            status: 'error',
            code: '401',
            message: 'Vui long dang nhap',
            data: null
        })
    }
}

let forgotAdmin = async (req, res) => {
    try {
        const {id} = req.params;
        const password = req.body.password;
        const newpassword = req.body.newpassword;
        const admin = await Admin.findByPk(id);

        if (admin === null) {
            return res.json({
                status: 'error',
                code: '401',
                message: 'Tai khoan khong ton tai',
                data: null
            });
        } else {
            if (verifyPassword(password, admin.password)) {
                admin.password = hashPassword(newpassword);
                await admin.save()
                res.json({
                    status: 'success',
                    code: '200',
                    message: 'Doi mat khau thanh cong',
                    data:null
                })
            } else {
                return res.json({
                    status: 'error',
                    code: '401',
                    message: 'Sai mat khau',
                    data: null
                });
            }
        }
    } catch (e) {
        res.json({
            status: 'error',
            code: '401',
            message: 'Vui long dang nhap',
            data: null
        })
    }
}

let verifyEmailAdmin = async (req, res) => {
    try {
        const {email, code} = req.params;
        const verify = await Admin.findOne({
            where: {
                email: email,
                code: code
            }
        });
        if (verify === null) {
            return res.json({
                status: 'error',
                code: '401',
                message: 'Code da het han hoac email chua duoc tao',
                data: null
            })
        } else {
            verify.code = randomCode(8);
            verify.verify = 1;
            await verify.save();
            res.json({
                status: 'success',
                code: '200',
                message: 'Email da duoc xac minh thanh cong',
                data: null
            })
        }
    } catch (e) {
        res.json({
            status: 'error',
            code: '404',
            message: 'Vui long dang nhap',
            data: null
        })
    }

}


let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Admin.findAll({
                where: {
                    email: email
                },
                limit: 1
            });
            resolve(false);
        } catch (e) {
            reject(true)
        }
    })
}

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

function verifyPassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}

function randomCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {
    createAmin,
    getAdminId,
    loginAdmin,
    verifyEmailAdmin,
    forgotAdmin
}