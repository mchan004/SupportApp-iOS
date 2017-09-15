const app = require("express")()
const server = require ('http').Server(app)
const io = require('socket.io')(server)
const socketioJwt = require("socketio-jwt");
const bodyParser  = require('body-parser');
const bcrypt = require('bcrypt');
server.listen(3000, function(){
  console.log('listening on *:3000');
});

//Mysql
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SupportApp"
});
con.connect();

//jwt
const jwt = require('jsonwebtoken');
const secret = "bi mat";

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


function getCurrentTime() {
  const today = new Date();
  return today.toISOString();
}


/////////////////
////Socket.io////
/////////////////

io.on('connection', function(socket) {
  var groupMessages = []
  console.log("connected: " + socket.id);


  var chooseSupporter = ''
  socket.on('ChooseSupporter', function(data) {
    const sql = "INSERT INTO customer (id, name, email, phone, created_at) VALUE (?, ?, ?, ?, NOW())"
    const placeholder = [socket.id, data.name, data.email, data.phone]
    con.query(sql, placeholder, function (err, result, fields) {
      if (err) throw err
      chooseSupporter = data.chooseSupporter
      console.log(data.chooseSupporter);
      const st = {'name': data.name, 'idFrom': socket.id, 'date': getCurrentTime()};
      console.log(st);
      io.to(data.chooseSupporter).emit('NewCustomer', st)
    })
  })

  socket.on('FromCustomerSendMessage', function(data) {
    const sql = "INSERT INTO chatlog (idFrom, idTo, message, attack, created_at) VALUE (?, ?, ?, ?, NOW())"
    const placeholder = [socket.id, chooseSupporter, data, null]
    con.query(sql, placeholder, function (err, result, fields) {
      if (err) throw err
      const mess = {'idTo': chooseSupporter, 'idFrom': socket.id, 'message': data, 'date': getCurrentTime()}
      io.to(chooseSupporter).emit('FromCustomerSendMessage', mess)
    })
  })


  socket.on('FromSupporterSendMessage', function(data) {
    con.query("INSERT INTO chatlog (idFrom, idTo, message, created_at) VALUE (?, ?, ?, NOW())",
    [socket.idSQL, data.idTo, data.message],
    function (err, result, fields) {
      if (err) throw err
      io.to(data.idTo).emit('FromSupporterSendMessage', data.message)
    })
  })


  // validate token
  socket.emit('connect', socket.id)
  socket.on('authenticate', function(data) {
    if (data != null){
      jwt.verify(data, secret, function(err, decoded){
        if(err) {
          socket.emit('unauthorized', {"err": "invalid token"})
        }
        else {
          const idSQL = decoded.id
          socket.idSQL = idSQL
          const sql = "SELECT id FROM users WHERE id = ? AND password = ?"
          const placeholder = [idSQL, decoded.pw]
          con.query(sql, placeholder, function (err, result, fields) {
            if (err) throw err
            if (result.length == 1) {
              socket.emit('authenticated', {"win": 0})
              const sql = "SELECT CU.id, CU.name, C.message, C.created_at FROM customer AS CU INNER JOIN (SELECT * FROM chatlog GROUP BY idFrom, idTo ORDER BY created_at DESC) AS C ON (CU.id=C.idFrom OR CU.id=C.idTo) INNER JOIN users as u ON (C.idFrom=u.id OR C.idTo=u.id) WHERE u.id=? GROUP BY CU.name ORDER BY C.created_at DESC"
              con.query(sql, [1], function (err, result, fields) {
                if (err) throw err
                groupMessages = result
                socket.join(idSQL)
                socket.emit("userList", result)
              })
            } else {
              socket.emit('unauthorized', {"err": "token expred"}, function() {
                socket.disconnect()
              })
            }
          })
        }
      })
    }
  })
  socket.on('disconnect', function(){
    console.log('disconnected: ' + socket.id)
  })
})

/////////////
////Route////
/////////////
app.get("/", function(req,res) {
  // res.render("index");
  res.send('Hello World!')
})

const mid = function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token){
    jwt.verify(token, secret, function(err, decoded){
      if(err) {
        const myObj = { "code": 0, "mess": err}
        res.json(myObj)
      }
      else {
        const id = decoded.id
        const passwd = decoded.pw
        const sql = "SELECT id FROM users WHERE id = ? AND password = ?"
        const placeholder = [id, passwd]
        req.id = id
        con.query(sql, placeholder,
        function (err, result, fields) {
          if (err) throw err
          if (result.length == 1) {
            next()
          } else {
            const myObj = { "code": 0, "mess": "Token sai password"}
            res.json(myObj)
          }
        })
      }
    })
  }
}

app.post("/getChatlog", mid, function(req,res) {
  const id = req.id
  const idCus = req.body.idCus
  const sql = "Select * FROM chatlog WHERE (idFrom = ? AND idTo = ?) OR (idFrom = ? AND idTo = ?)"
  const placeholder = [id, idCus, idCus, id]
  con.query(sql, placeholder,
  function (err, result, fields) {
    if (err) throw err
    res.json(result);
  })
})

app.post("/login", function (req, res) {
  const username = req.body.username
  const password = req.body.password
  const sql = "Select * FROM users WHERE email = ?"
  const placeholder = [username]
  con.query(sql, placeholder,
  function (err, result, fields) {
    if (err) throw err
    if (result.length == 1) {
      //Change password to type Laravel
      var coded = (result[0].password).replace('$2y$', '$2a$')
      if ( bcrypt.compareSync(password, coded) ) {
        const token = jwt.sign({id: result[0].id, email: result[0].email, pw: result[0].password}, secret)
        const myObj = { "code": 1, "token": token};
        res.json(myObj)
      } else {
        const myObj = { "code": 0, "mess": "Sai pass" }
        res.json(myObj)
      }

    } else {
      const myObj = { "code": 0, "mess": "Chua dk tai khoan"}
      res.json(myObj)
    }
  })
})
