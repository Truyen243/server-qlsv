const {Khoa,Lop} = require("../models/index");

let createK = async (req, res) => {
    try {
        const {ten,makhoa} = req.body;
        const khoa = await Khoa.create({
            ten: ten,
            makhoa:makhoa
        });
        if (khoa === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Tao khoa that bai',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: {
                    id: khoa.id,
                    ten: khoa.ten,
                    makhoa: khoa.makhoa,
                }
            });
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

let getK = async (req, res) => {
    try {
        const {id} = req.params;
        const khoa = await Khoa.findByPk(id);
        if (khoa === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Khong tim thay mon khoa',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: {
                    id: khoa.id,
                    ten: khoa.ten,
                    makhoa: khoa.makhoa,
                }
            });
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
let searchMK = async (req, res) => {
    try {
        const {makhoa} = req.params;
        const khoa = await Khoa.findAll({
            where:{
                makhoa:makhoa
            },
            include:[{
                model:Lop,
                as:'lops'
            }]
        });
        if (khoa === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Khong tim thay mon khoa',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data:khoa
            });
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

let getKALL = async (req, res) => {
    try {
        const khoa = await Khoa.findAll();
        if (khoa === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Khong tim thay mon khoa',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: khoa
            });
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

let editK = async (req, res) => {
    try {
        const {id, ten} = req.body;
        const khoa = await Khoa.findByPk(id);
        khoa.ten = ten || khoa.ten;

        const khoaedit = await khoa.save();
        if (khoaedit === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Sua khoa that bai ',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: {
                    id: khoaedit.id,
                    ten: khoaedit.ten,
                    makhoa: khoaedit.makhoa,
                }
            });
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

let deleteK = async (req, res) => {
    try {
        const {id} = req.params;
        const khoa = await Khoa.destroy({
            where:{
                id:id
            }
        });

        if (khoa === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Sua mon hoc that bai ',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: khoa
            });
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


module.exports={
    createK,
    getK,
    editK,
    deleteK,
    getKALL,
    searchMK
}