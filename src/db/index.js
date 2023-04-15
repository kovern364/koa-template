const mysql = require("mysql");
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require("../config/config.default");

function connect() {
  return mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PWD,
    database: MYSQL_DB,
    connectionLimit: 5,
  });
}

const sqlconnection = (sql, parmas = null) => {
  // 获取数据库链接对象
  const conn = connect();
  return new Promise(function (resolve, reject) {
    // 执行SQL语句
    try {
      conn.query(sql, parmas, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    } finally {
      conn.end(); // 关闭链接
    }
  });
};

module.exports = { sqlconnection };
