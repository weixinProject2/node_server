const mysql = require('mysql');
const config = require('./defaultConfig');

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});
let allServices = {
  query:function (sql,values) {
    return new Promise((resolve ,reject) =>{
      pool.getConnection(function (err,connection) {
          if(err){
            reject(err)
          }else
          {
            connection.query(sql,values,(err,rows) => {
                if(err){
                  reject(err)
                }else
              {
                resolve(rows)
              }
              connection.release()
            })
          }
      })
    })
  },
  savetableList:function (tableData) {
    let _sql = `insert into paymentlist set 
    projectNum="${tableData.projectNum}",
    custormNames="${tableData.custormNames}",
    houseSouce="${tableData.houseSouce}",
    paymentCode="${tableData.paymentCode}",
    paymentDesc="${tableData.paymentDesc}";`;
    return  allServices.query(_sql);
  },
  deleteTableList:function (tableData) {
    let _sql = `delete from paymentlist where id = "${tableData.id}"`;
    return  allServices.query(_sql);
  },
  getParmentList:function (data) {
    let _sql = `select * from paymentlist`;
    let sql = '';
    let count = 0;
    for (let key in data){
      if(data[key]) {
        count ++;
        if (count === 1) {
          sql = ` where ${key} = ${data[key]} `
        } else {
          sql = ` and where ${key} = ${data[key]} `
        }
        _sql += sql ;
      }
    }
    _sql += `;`;
    return allServices.query(_sql);
  },
  getOrderList:function(){
    let _sql = `select * from orderList;`;
    return allServices.query(_sql);
  },
  saveOrderList:function(tableData){
      let _sql = `insert into orderList set 
      id="${tableData.id}",
      projectNum="${tableData.projectNum}",
      custormName="${tableData.custormName}",
      houseSouce="${tableData.houseSouce}",
      paymentCode="${tableData.paymentCode}",
      paymentDesc="${tableData.paymentDesc}";`;
      return allServices.query(_sql);
  },
  deleteOrderList:function(id){
    let _sql = `DELETE FROM orderList WHERE id=${id};`;
    return allServices.query(_sql);
  }
};


module.exports = allServices;