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



/////////////////
////Socket.io////
/////////////////

io.on('connection', function(socket) {
  var groupMessages = []
  console.log("connected: " + socket.id);


  var chosseSupporter = ''
  socket.on('choose supporter', function(data) {
    // socket.join(data)
    chosseSupporter = data
  })

  socket.on('FromCustomerSendMessage', function(data) {
    const mess = {'idTo': chosseSupporter, 'idFrom': socket.id, 'message': data, 'datetime': Date.now()}
    console.log(mess);
    io.to(chosseSupporter).emit('FromCustomerSendMessage', mess)
  })


  socket.on('FromSupporterSendMessage', function(data) {
    con.query("INSERT INTO chatlog (idFrom, idTo, message, created_at) VALUE (?, ?, ?, NOW())",
    [socket.id, data.idTo, data.message],
    function (err, result, fields) {
      if (err) throw err
      //Handle sent to Customer
      // socket.emit("...", result)
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
          con.query(sql, placeholder,
          function (err, result, fields) {
            if (err) throw err
            if (result.length == 1) {
              socket.emit('authenticated', {"win": 0})
              const sql = "SELECT cu.id, cu.name, c.created_at FROM customer as cu INNER JOIN chatlog as c ON (cu.id=c.idFrom OR cu.id=c.idTo) INNER JOIN users as u ON (c.idFrom=u.id OR c.idTo=u.id) WHERE u.id=? GROUP BY cu.name ORDER BY c.created_at DESC"
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
