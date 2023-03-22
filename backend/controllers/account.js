const client = require("../config/db_config");
const bcrypt = require("bcrypt");



emailDetails = {
  from: "", //where the email is from
  to: "", //where the email is to
  subject: "", //email subject
  text: "", //email
};

exports.getUser = (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT * FROM users WHERE user_id = $1";

  client.query(sql, [user_id], (err, result) => {
    if (err) {
      res.status(400).json({ message: "Failed to get user" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
};

exports.updatePassword = (req, res) => {
  const user_id = req.params.user_id;
  const { oldPassword, newPassword } = req.body;
  const sql = "SELECT * FROM users WHERE user_id = $1";
  console.log(oldPassword);

  client.query(sql, [user_id], (err, result) => {
    if (err) {
      res.status(400).json({ message: "Failed to get user" });
    } else {
      bcrypt.compare(oldPassword, result.rows[0].password, (error, same) => {
        //console.log(result.rows[0].password)
        if (error) {
        } else if (same) {
          const sql1 = "UPDATE users SET password = $1";
          bcrypt.hash(newPassword, 10, (err, hash) => {
            if (err) {
              res.status(err).json({ message: "Encryption error" });
            } else {
              client.query(sql1, [hash], (err2, result) => {
                if (err2) {
                  console.log(err2);
                  res.status(400).json({ message: "Error updating password" });
                } else {
                  res.status(203).json({ message: "Password changed" });
                }
              });
            }
          });
        } else if (!same) {
          res.status(400).json({ message: "Invalid old password" });
        }
      });
    }
  });
};

exports.updateDetails = (req, res) => {
  const user_id = req.params.user_id;
  const { name, surname } = req.body;
  const sql = "UPDATE users SET name = $1, surname = $2 WHERE user_id = $3";

  client.query(sql, [name, surname, user_id], (err, result) => {
    if (err) {
      res.status(400).json({ message: "Error updating details" });
    } else {
      res.status(200).json({ message: "Details updated successfully" });
    }
  });
};





