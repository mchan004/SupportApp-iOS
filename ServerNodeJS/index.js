const app = require("express")()
const server = require ('http').Server(app)
const io = require('socket.io')(server)
const socketioJwt = require("socketio-jwt")
const bodyParser  = require('body-parser')
const bcrypt = require('bcrypt')
const path = require('path')
server.listen(3000, function(){
  console.log('listening on *:3000');
})

//Mysql
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SupportApp"
});
con.connect()

//jwt
const jwt = require('jsonwebtoken')
const secret = "bi mat"

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


function getCurrentTime() {
  const today = new Date();
  return today.toISOString()
}


/////////////////
////Socket.io////
/////////////////

io.on('connection', function(socket) {




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
              const sql = "SELECT t2.id, t2.name, t1.message, t1.created_at FROM chatlog t1 JOIN (SELECT cu.id, cu.name, MAX(c.created_at) created_at FROM chatlog c JOIN customer cu ON (cu.id=c.idTo OR cu.id=c.idFrom) GROUP BY cu.id) t2 ON (t1.idFrom = t2.id OR t1.idTo = t2.id) AND t1.created_at = t2.created_at	JOIN users u ON (t1.idFrom=u.id OR t1.idTo=u.id) WHERE u.id = ?	ORDER BY t1.created_at DESC"
              con.query(sql, [1], function (err, result, fields) {
                if (err) throw err


                /////////////
                //Validated//
                /////////////
                socket.join(idSQL)
                socket.emit("userList", result)


                socket.on('FromSupporterSendMessage', function(data) {
                  con.query("INSERT INTO chatlog (idFrom, idTo, message, created_at) VALUE (?, ?, ?, NOW())",
                  [socket.idSQL, data.idTo, data.message],
                  function (err, result, fields) {
                    if (err) throw err
                    io.to(data.idTo).emit('FromSupporterSendMessage', data.message)
                  })
                })




                ///////////////////////////
                ///////////////////////////
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






  //////////
  //Client//
  //////////
  socket.idCus = socket.id
  console.log("connected: " + socket.idCus)
  socket.emit('idClient', socket.id)
  socket.on("CustomerReconnect", function(data) {
    socket.join(data.idCus)
    socket.chooseSupporter = data.idSup
    socket.idCus = data.idCus

    const sql = "Select * FROM chatlog WHERE (idFrom = ? AND idTo = ?) OR (idFrom = ? AND idTo = ?)"
    const placeholder = [data.idSup, data.idCus, data.idCus, data.idSup]
    con.query(sql, placeholder,
    function (err, result, fields) {
      if (err) throw err
      socket.emit('CustomerGetChatlog', result)
    })
  })

  socket.on('ChooseSupporter', function(data) {
    const sql = "INSERT INTO customer (id, name, email, phone, created_at) VALUE (?, ?, ?, ?, NOW())"
    const placeholder = [socket.idCus, data.name, data.email, data.phone]
    con.query(sql, placeholder, function (err, result, fields) {
      if (err) throw err
      socket.chooseSupporter = data.chooseSupporter
      const st = {'name': data.name, 'idFrom': socket.idCus, 'date': getCurrentTime()};
      io.to(data.chooseSupporter).emit('NewCustomer', st)
    })
  })

  socket.on('FromCustomerSendMessage', function(data) {
    const sql = "INSERT INTO chatlog (idFrom, idTo, message, attack, created_at) VALUE (?, ?, ?, ?, NOW())"
    const placeholder = [socket.idCus, socket.chooseSupporter, data, null]
    con.query(sql, placeholder, function (err, result, fields) {
      if (err) throw err
      const mess = {'idTo': socket.chooseSupporter, 'idFrom': socket.idCus, 'message': data, 'date': getCurrentTime()}
      io.to(socket.chooseSupporter).emit('FromCustomerSendMessage', mess)
      io.to(socket.idCus).emit('ResFromCusSendMess', data)
    })
  })



  socket.on('disconnect', function(){
    console.log('disconnected: ' + socket.idCus)
  })
})

/////////////
////Route////
/////////////
app.get("/", function(req,res) {
  // res.render("index");
  // res.send('Hello World!')
  res.sendFile(path.join(__dirname+'/index.html'));
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

app.post("/getUserList", mid, function(req,res) {
  const id = req.id
  const sql = "SELECT t2.id, t2.name, t1.message, t1.created_at FROM chatlog t1 JOIN (SELECT cu.id, cu.name, MAX(c.created_at) created_at FROM chatlog c JOIN customer cu ON (cu.id=c.idTo OR cu.id=c.idFrom) GROUP BY cu.id) t2 ON (t1.idFrom = t2.id OR t1.idTo = t2.id) AND t1.created_at = t2.created_at	JOIN users u ON (t1.idFrom=u.id OR t1.idTo=u.id) WHERE u.id = ?	ORDER BY t1.created_at DESC"
  const placeholder = [id]
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


app.post("/updateProfile", mid, function(req,res) {
  const id = req.id
  const idCus = req.body.idCus
  const name = req.body.name
  const phone = req.body.phone
  const sql = "Select * FROM chatlog WHERE (idFrom = ? AND idTo = ?) OR (idFrom = ? AND idTo = ?)"
  const placeholder = [id, idCus, idCus, id]
  con.query(sql, placeholder,
  function (err, result, fields) {
    if (err) throw err
    res.json(result);
  })
})
