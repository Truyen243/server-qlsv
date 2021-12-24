const Sequelize = require('sequelize');
const {SinhVien, Lop,Khoa} = require("../models/index");


let createSV = async (req, res) => {
    try {
        const {name, email, address, date, phone, sex, lop_id} = req.body;
        const uid = await getIdMax();

        const sinhvien = await SinhVien.create({
            name: name,
            uid: uid,
            email: email,
            address: address,
            date: date,
            phone: phone,
            sex: sex,
            lop_id: lop_id
        });
        if (sinhvien === null) {
            return res.json({
                status: 'error',
                code: '404',
                message: 'Khong thanh cong',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: sinhvien
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

let getSV = async (req, res) => {
    try {
        const id = req.params.id;
        const sinhvien = await SinhVien.findByPk(id, {
            include: [{
                model: Lop,
                as: 'sinhviens',
                required: true,
                include:[{
                    model:Khoa,
                    as:'lops',
                    required: true,
                }]
            }]
        });
        if (sinhvien === null) {
            return res.json({
                status: 'error',
                code: '404',
                message: 'Khong tim thay sinh vien',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: sinhvien
            })
        }
    } catch (e) {
        console.log(e)
        res.json({
            status: 'error',
            code: '404',
            message: 'Vui long dang nhap',
            data: null
        })
    }
}

let getSVALL = async (req, res) => {
    try {

        const sinhvien = await SinhVien.findAll({
            include: [{
                model: Lop,
                as: 'sinhviens',
                required: true,
                include:[{
                    model:Khoa,
                    as:'lops',
                    required: true,
                }]
            }]
        });
        if (sinhvien === null) {
            return res.json({
                status: 'error',
                code: '404',
                message: 'Khong tim thay sinh vien',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: sinhvien
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

let editSV = async (req, res) => {
    try {
        const {id, name, address, email, phone, date, sex} = req.body;
        const sinhvien = await SinhVien.findByPk(id);
        sinhvien.name = name || sinhvien.name
        sinhvien.address = address || sinhvien.address
        sinhvien.email = email || sinhvien.email
        sinhvien.phone = phone || sinhvien.phone
        sinhvien.date = date || sinhvien.date
        sinhvien.sex = sex || sinhvien.sex
        const sinhvienedit = await sinhvien.save();
        if (sinhvienedit === null) {
            return res.json({
                status: 'error',
                code: '404',
                message: 'Khong tim thay sinh vien',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: sinhvienedit
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

let deleteSV = async (req, res) => {
    try {
        const {id} = req.params;
        const sinhvien = await db.SinhVien.destroy({
            where: {
                id: id
            }
        });

        if (sinhvien === null) {
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
                data: sinhvien
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


let searchMssv = async (req, res) => {
    try {
        const {mssv} = req.params;
        const sinhvien = await SinhVien.findAll({
            where: {
                uid: mssv
            },
            include: [{
                model: Lop,
                as: 'sinhviens',
                required: true,
                include:[{
                    model:Khoa,
                    as:'lops',
                    required: true,
                }]
            }]
        });
        if (sinhvien === null) {
            return res.json({
                status: 'error',
                code: '404',
                message: 'Khong tim thay sinh vien',
                data: null
            });
        } else {

            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: sinhvien
            })
        }
    } catch (e) {
        console.log(e)
        res.json({
            status: 'error',
            code: '404',
            message: 'Vui long dang nhap',
            data: e
        })
    }
}

let getIdMax = async () => {
    const id = await SinhVien.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'max']],
        raw: true
    });
    if (id === null) {
        return 119000000
    } else {
        return 119000000 + (id[0].max + 1);
    }
}

module.exports = {
    createSV,
    getSV,
    editSV,
    deleteSV,
    getSVALL,
    searchMssv
}