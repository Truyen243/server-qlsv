const {SinhVien} = require("./models/index");
const Sequelize = require("sequelize");
let getIdMax = async () => {
    const id =await SinhVien.findAll({
        attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'max']],
        raw:true
    });
    console.log(119000000 + (id[0].max+1))
    return 119000000 + (id[0].max+1);
}
getIdMax()
