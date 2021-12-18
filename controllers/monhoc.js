const {Monhoc} = require('../models/index');

let createMH = async (req, res) => {
    try{

    }catch (e) {
        res.json({
            status: 'error',
            code: '404',
            message: 'Vui long dang nhap',
            data: null
        })
    }
}