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

io.use(socketioJwt.authorize({
  secret: secret,
  handshake: true
}));

io.on("connection", function (socket) {

  socket.id = socket.decoded_token.id
  console.log("connecting: " + socket.decoded_token.email)


  const id = socket.decoded_token.id
  const passwd = socket.decoded_token.pw
  const sql = "SELECT id FROM users WHERE id = ? AND password = ?"
  const placeholder = [id, passwd]
  con.query(sql, placeholder,
  function (err, result, fields) {
    if (err) throw err
    if (result.length == 1) {

      var groupMessages = []

      con.query("Select customer.id, customer.name from groupMessage INNER JOIN customer ON groupMessage.idCustomer = customer.id WHERE idUser = ? ORDER BY groupMessage.updated_at DESC", [1],
      function (err, result, fields) {
        if (err) throw err
        groupMessages = result
        socket.emit("userList", result)
      })


      socket.on('sendchat', function(data) {
        con.query("INSERT INTO chatlog (idFrom, idTo, message, created_at) VALUE (?, ?, ?, NOW())",
        [socket.id, data.idTo, data.message],
        function (err, result, fields) {
          if (err) throw err
          //Handle sent to Customer
          // socket.emit("...", result)
        })
        console.log(data);
      })



    } else {
      socket.disconnect()
    }
  })

  socket.on('disconnect', function(){
    console.log('disconnected: ' + socket.id)

  });
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
    console.log(result);
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
