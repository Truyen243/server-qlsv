const {Lop} = require("../models/index");

let createL = async (req, res) => {
    try {
        const {ten, khoa_id} = req.body;
        const lop = await Lop.create({
            ten: ten,
            khoa_id: khoa_id
        });
        if (lop === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Tao lop that bai',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: {
                    id: lop.id,
                    ten: lop.ten,
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

let getL = async (req, res) => {
    try {
        const {id} = req.params;
        const lop = await Lop.findByPk(id);
        if (lop === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Khong tim thay mon lop',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: {
                    id: lop.id,
                    ten: lop.ten,
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

let editL = async (req, res) => {
    try {
        const {id, ten, khoa_id} = req.body;
        const lop = await Lop.findByPk(id);
        lop.ten = ten || lop.ten;
        lop.khoa_id = khoa_id || lop.khoa_id;

        const lopedit = await khoa.save();
        if (lopedit === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Sua lop that bai ',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: {
                    id: lopedit.id,
                    ten: lopedit.ten,
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

let deleteL = async (req, res) => {
    try {
        const {id} = req.params;
        const lop = await Lop.destroy({
            where: {
                id: id
            }
        });

        if (lop === null) {
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
                data: lop
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

module.exports = {
    createL,
    getL,
    editL,
    deleteL
}