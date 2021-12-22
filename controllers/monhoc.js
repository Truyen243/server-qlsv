const {Monhoc} = require('../models/index');

let createMH = async (req, res) => {
    try {
        const {ten, hesodiem, sotiet,mamonhoc} = req.body;
        const monhoc = await Monhoc.create({
            ten: ten,
            hesodiem: hesodiem,
            sotiet: sotiet,
            mamonhoc:mamonhoc
        });
        if (monhoc === null) {
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
                data: {
                    id: monhoc.id,
                    ten: monhoc.ten,
                    hesodiem: monhoc.hesodiem,
                    sotiet: monhoc.sotiet,
                    mamonhoc: monhoc.mamonhoc
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

let getMH = async (req, res) => {
    try {
        const {id} = req.params;
        const monhoc = await Monhoc.findByPk(id);
        if (monhoc === null) {
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
                data: {
                    id: monhoc.id,
                    ten: monhoc.ten,
                    hesodiem: monhoc.hesodiem,
                    sotiet: monhoc.sotiet,
                    mamonhoc: monhoc.mamonhoc
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

let getMHALL = async (req, res) => {
    try {
        const monhoc = await Monhoc.findAll();
        if (monhoc === null) {
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
                data: monhoc
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

let editMH = async (req, res) => {
    try {
        const {id, ten, hesodiem, sotiet,mamonhoc} = req.body;
        const monhoc = await Monhoc.findByPk(id);
        monhoc.ten = ten || monhoc.ten;
        monhoc.hesodiem = hesodiem || monhoc.hesodiem;
        monhoc.sotiet = sotiet || monhoc.sotiet;
        monhoc.mamonhoc = mamonhoc || monhoc.mamonhoc;

        const monhocedit = await monhoc.save();
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
                data: {
                    id: monhocedit.id,
                    ten: monhocedit.ten,
                    hesodiem: monhocedit.hesodiem,
                    sotiet: monhocedit.sotiet
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

let deleteMH = async (req, res) => {
    try {
        const {id} = req.params;
        const monhoc = await Monhoc.destroy({
            where:{
                id:id
            }
        });

        if (monhoc === null) {
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
                data: monhoc
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
    createMH,
    getMH,
    editMH,
    deleteMH,
    getMHALL
}