const {MonHoc, SinhVien, Diem} = require('../models/index');
const Sequelize = require('sequelize');
let createD = async (req, res) => {
    try {
        const {sv_id, mh_id, diem10, diem30, diem60, diemtong} = req.body;
        const check = await Diem.findAll({
            where: Sequelize.or({
                sv_id: sv_id
            }, {
                mh_id: mh_id
            }),
            limit: 1
        });
        console.log(check)
        if (check.sv_id === sv_id && check.mh_id === mh_id) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Tao mon hoc that bai trung',
                data: null
            });
        } else {
            const diem = await Diem.create({
                sv_id: sv_id,
                mh_id: mh_id,
                diem10: diem10,
                diem30: diem30,
                diem60: diem60,
                diemtong: diemtong
            });
            if (diem === null) {
                return res.json({
                    status: 'error',
                    code: '405',
                    message: 'Tao mon hoc that bai',
                    data: null
                });
            } else {
                res.json({
                    status: 'success',
                    code: '200',
                    message: 'Thanh cong',
                    data: diem
                });
            }
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

let getD = async (req, res) => {
    try {
        const {id} = req.params;
        const diem = await SinhVien.findByPk(id, {
            include: [{
                model: MonHoc,
                as: 'sinhvienmh',
                through: {
                    attributes: []
                }
            }]
        });
        if (diem === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Khong tim thay mon hoc',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: diem
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

let getDALL = async (req, res) => {
    try {
        const diem = await SinhVien.findAll({
            include: [{
                model: MonHoc,
                as: 'sinhvienmh',
                through: {
                    attributes: []
                }
            }]
        });
        if (diem === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Khong tim thay mon hoc',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: diem
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

let editD = async (req, res) => {
    try {
        const id = req.params.id;
        const {diem10, diem30, diem60, diemtong} = req.body;
        const diem = await Diem.findByPk(id);
        diem.diem10 = diem10 || diem.diem10;
        diem.diem30 = diem30 || diem.diem30;
        diem.diem60 = diem60 || diem.diem60;
        diem.diemtong = diemtong || diem.diemtong;


        const monhocedit = await diem.save();
        if (monhocedit === null) {
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
                data: monhocedit
            });
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

let deleteD = async (req, res) => {
    try {
        const {id} = req.params;
        const diem = await Diem.destroy({
            where: {
                id: id
            }
        });

        if (diem === null) {
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
                data: diem
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

let getDMH = async (req, res) => {
    try {
        const {id} = req.params;
        const diem = await MonHoc.findByPk(id, {
            include: [{
                model: SinhVien,
                as: 'monhocs',
                through: {
                    attributes: []
                }
            }]
        });
        if (diem === null) {
            return res.json({
                status: 'error',
                code: '405',
                message: 'Khong tim thay mon hoc',
                data: null
            });
        } else {
            res.json({
                status: 'success',
                code: '200',
                message: 'Thanh cong',
                data: diem
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
    createD,
    getD,
    editD,
    deleteD,
    getDALL,
    getDMH
}