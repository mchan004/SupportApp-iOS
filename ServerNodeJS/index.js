const app = require("express")()
const server = require ('http').Server(app)
const io = require('socket.io')(server)
const socketioJwt = require("socketio-jwt");
const bodyParser  = require('body-parser');
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

  socket.id = socket.decoded_token.email
  console.log("connecting: " + socket.decoded_token.email)

  con.query("Select customer.id, customer.name from groupMessage INNER JOIN customer ON groupMessage.idCustomer = customer.id WHERE idUser = ?", [1],
  function (err, result, fields) {
    if (err) throw err
    socket.emit("userList", result)
    // console.log(result);
  })

  socket.on('disconnect', function(){
    console.log('user disconnected' + socket.id)

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
      if(err) res.send("err: " + err)
      else {
        const id = decoded.id
        const passwd = decoded.pw
        const sql = "Select id FROM users WHERE id = ? AND password = ?"
        const placeholder = [id, passwd]
        req.id = id
        con.query(sql, placeholder,
        function (err, result, fields) {
          if (err) throw err
          if (result.length == 1) {
            next()
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
  const sql = "Select * FROM users WHERE email = ? AND password = ?"
  const placeholder = [username, password]
  con.query(sql, placeholder,
  function (err, result, fields) {
    if (err) throw err
    if (result.length == 1) {
      const token = jwt.sign({id: result[0].id, email: result[0].email, pw: result[0].password}, secret)
      const myObj = { "code": 1, "token": token};
      res.json(myObj)
      const sql = "UPDATE users SET remember_token = ? WHERE email = ?";
      const placeholder = [token, username]
      con.query(sql, placeholder, function (err, result) {
        if (err) throw err;
      });

    } else {
      const myObj = { "code": 0 };
      res.json(myObj)
    }
  })
})
