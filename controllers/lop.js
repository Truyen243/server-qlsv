const {Lop, Khoa,SinhVien} = require("../models/index");

let createL = async (req, res) => {
    try {
        const {ten, khoa_id, malop} = req.body;
        const lop = await Lop.create({
            ten: ten,
            khoa_id: khoa_id,
            malop: malop
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

let getL = async (req, res) => {
    try {
        const {id} = req.params;
        const lop = await Lop.findByPk(id, {
            include: [{
                model: Khoa,
                as: 'lops'
            }]
        });
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

let getLALL = async (req, res) => {
    try {

        const lop = await Lop.findAll({
            include: [{
                model: Khoa,
                as: 'lops'
            }]
        });
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

let editL = async (req, res) => {
    try {
        const {id, ten, khoa_id, malop} = req.body;
        const lop = await Lop.findByPk(id);
        lop.ten = ten || lop.ten;
        lop.khoa_id = khoa_id || lop.khoa_id;
        lop.malop = malop || lop.malop;

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
                data:lopedit
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

let getLSV = async (req, res) => {
    try {
        const {id} = req.params;
        const lop = await Lop.findByPk(id, {
            include: [{
                model: SinhVien,
                as: 'sinhviens'
            }]
        });
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
                data:lop
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


let searchMsl = async (req, res) => {
    try {
        const {malop} = req.params;
        const lop = await Lop.findAll({
            where: {
                malop: malop
            },
            include: [{
                model: Khoa,
                as: 'lops'
            }]
        });
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
    deleteL,
    getLALL,
    searchMsl,
    getLSV
}