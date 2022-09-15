var express = require("express");
var router = express.Router();
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { TOKEN_SECRET_KEY } = require("../config");
const verify = require("./verifytoken");
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "sport-db",
  database: "infobox",
  password: "eMonoo5b",
  port: 54321,
});
// var user = mongoose.model('accounts');

/* GET users listing. */
router.get("/", async function (req, res, next) {
  //   console.log(req.query.userid);
  await pool.query(
    "SELECT email, userid, username, userrole, userstorage FROM users ORDER BY userid ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      // console.log(Buffer.from(results.rows[0].filedata, 'base64').toString('utf8'));
      //const user = JSON.parse(results.rows[0].userstorage);
      //   var user = results.rows.filter((val) => val.userid === req.query.userid);
      //   console.log(user[0].userrole);
      //   if (user[0].userrole != "admin") {
      //     return res.status(404).end();
      //   } else {
      //     res.json(results.rows);
      //   }
      res.json(results.rows);
    }
  );
});

router.get("/verifytoken", verify, async function (req, res, next) {
  await pool.query(
    "SELECT email, userid, username, userrole, userstorage FROM users ORDER BY userid ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      // console.log(Buffer.from(results.rows[0].filedata, 'base64').toString('utf8'));
      //const user = JSON.parse(results.rows[0].userstorage);
      // res.json(results.rows)
    }
  );
});

router.post("/", async function (req, res) {
  hash = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.data.password, salt, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
  pool.query(
    "INSERT INTO users (userid, username, email, password, userrole, userstorage) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      nanoid(6),
      req.body.data.username,
      req.body.data.email,
      hash,
      "moderator",
      {},
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json({ success: "JSON data is saved." });
    }
  );
});

router.post("/login", async function (req, res) {
  await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [req.body.data.username],
    async (error, results) => {
      if (results.rows.length === 0)
        return res.json({ error: "User dosn't exist." });
      hash = await new Promise((resolve, reject) => {
        bcrypt.compare(
          req.body.data.password,
          results.rows[0].password,
          function (err, hash) {
            if (err) reject(err);
            resolve(hash);
          }
        );
      });
      if (hash) {
        var id = results.rows[0].userid;
        let token = jwt.sign(
          {
            id: results.rows[0].userid,
            name: results.rows[0].username,
            role: results.rows[0].userrole,
          },
          TOKEN_SECRET_KEY,
          { algorithm: "HS256" }
        );
        res.json({ success: "Login successful.", token, uid: id });
      } else {
        res.json({ error: "Incorrect credentials." });
      }
    }
  );
});

router.put("/save", async function (req, res) {
  console.log(req.body.data.storageData);
  await pool.query(
    "UPDATE users SET userstorage = $1 WHERE userid = $2",
    [req.body.data.storageData, req.body.data.userid],
    async (error, results) => {
      console.log(results.rows);

      res.send("Speichern erfolgreich");
    }
  );
});

module.exports = router;
