const pg = require('pg')
var client = new pg.Client('postgres://qytgorgd:***@babar.db.elephantsql.com/qytgorgd');
client.connect(function(err){
  if (err) {
    console.log("Database connection error");
    console.log(err)
  }else
  {
    console.log("Database connected successfully");
  }
  
})

module.exports = client;