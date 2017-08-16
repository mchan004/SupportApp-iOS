const app = require("express")()
const server = require ('http').Server(app)
const io = require('socket.io')(server)
const socketioJwt = require("socketio-jwt");
server.listen(3000, function(){
  console.log('listening on *:3000');
});






/////////////
////Mysql////
/////////////
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "SupportApp"
});

con.connect();


///////////
////jwt////
///////////
const jwt = require('jsonwebtoken');
const secret = "bi mat";

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })


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



  // socket.on('select', function(){
  //   console.log('user disconnected' + socket.id)
  //
  // });


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

app.post("/send", function(req,res) {

  res.send('Hello World!')
})

app.post("/login", urlencodedParser, function (req, res) {
  const username = req.body.username
  const password = req.body.password



  const sql = "Select * FROM users WHERE email = ? AND password = ?"
  const placeholder = [username, password]
  con.query(sql, placeholder,
  function (err, result, fields) {
    if (err) throw err

    if (result.length == 1) {
      const token = jwt.sign({id: result[0].id, email: result[0].email, pw: result[0].password}, secret, {expiresIn:60000000})
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
