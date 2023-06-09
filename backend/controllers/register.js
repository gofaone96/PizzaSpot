const bcrypt = require("bcrypt");

const client = require("../config/db_config");

const jwt = require("jsonwebtoken");

//Registration Function

exports.register = async (req, res) => {
  const { name, email, surname, password,account } = req.body;


  try {
    const data = await client.query(`SELECT * FROM Users WHERE email= $1;`, [
      email,
    ]); //Checking if user already exists
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        message: "Email already exists, Please sign in",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            message: "Server error",
          });
        var flag = 1; //Declaring a flag

        //Inserting data into the database

        client.query(
          `INSERT INTO Users ( name,surname,email, password,account) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
          [
            name,
            surname,
            email,
            hash,
            account,
          ],
          (err,results) => {
            if (err) {
              flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
              console.error(err);
              return res.status(500).json({
                message: "Database error",
              });
            } else {
              flag = 1;
              const token = jwt.sign(
                //Signing a jwt token
                {
                  email: email,
                  name : results.rows[0].name,
                  surname : results.rows[0].surname,
                  account : results.rows[0].account,
                  user_id : results.rows[0].user_id
                },
                "egfiuehfiejfpiejfpiefhpiehf3pifnepkfnepfnepi",
                {
                  algorithm: "HS256",
                  expiresIn: '24h'
                });
              
              res.status(201).json({message:'You are now registered',token:token});


              
            }
          }
        );
       
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Database error while registring user!", //Database connection error
    });
  }
};