const Sequelize = require('sequelize');
const {SinhVien, Lop} = require('../models/index');


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
                data: {
                    id: sinhvien.id,
                    name: sinhvien.name,
                    mssv: sinhvien.uid,
                    address: sinhvien.address,
                    email: sinhvien.email,
                    date: sinhvien.date,
                    sex: sinhvien.sex,
                    phone: sinhvien.phone,
                    updatedAt: sinhvien.updatedAt,
                    createdAt: sinhvien.createdAt
                }
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
        const sinhvien = await SinhVien.findByPk('1',{
            include: [{
                module: Lop,
                as: 'sinhviens',
            }]
        });
        console.log(sinhvien)
        if (sinhvien === null) {
            return res.json({
                status: 'error',
                code: '404',
                message: 'Khong tim thay sinh vien',
                data: null
            });
        } else {
            // res.json({
            //     status: 'success',
            //     code: '200',
            //     message: 'Thanh cong',
            //     data: {
            //         id: sinhvien.id,
            //         name: sinhvien.name,
            //         mssv: sinhvien.uid,
            //         address: sinhvien.address,
            //         email: sinhvien.email,
            //         date: sinhvien.date,
            //         sex: sinhvien.sex,
            //         phone: sinhvien.phone,
            //         updatedAt: sinhvien.updatedAt,
            //         createdAt: sinhvien.createdAt
            //     }
            // })
            res.json(sinhvien)
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
    getSV
}