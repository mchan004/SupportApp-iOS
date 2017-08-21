const app = require("express")()
const server = require ('http').Server(app)
const io = require('socket.io')(server)
const socketioJwt = require("socketio-jwt");
const bodyParser  = require('body-parser');
server.listen(3000, function(){
  console.log('listening on *:3000');
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//PostGre
const pg = require('pg');
const QueryStream = require('pg-query-stream')
// const JSONStream = require('JSONStream')
const config = {
  user: 'postgres', //env var: PGUSER
  database: 'SupportApp', //env var: PGDATABASE
  password: '123', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
const pool = new pg.Pool(config);
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

//jwt
const jwt = require('jsonwebtoken');
const secret = "bi mat";



/////////////////
////Socket.io////
/////////////////
io.use(socketioJwt.authorize({
  secret: secret,
  handshake: true
}));

const { Client, Query } = require('pg')
io.on("connection", function (socket) {

  socket.id = socket.decoded_token.email
  console.log("connecting: " + socket.decoded_token.email);

  // con.query("Select customer.id, customer.name from groupMessage INNER JOIN customer ON groupMessage.idCustomer = customer.id WHERE idUser = ?", [1],
  // function (err, result, fields) {
  //   if (err) throw err
  //   socket.emit("userList", result)
  //   // console.log(result);
  // })


  // pool.connect((err, client, release) {
  //   if (err) {
  //   return console.error('Error acquiring client', err.stack)
  // }
  // client.query('SELECT NOW()', (err, result) => {
  //   release()
  //   if (err) {
  //     return console.error('Error executing query', err.stack)
  //   }
  //   console.log(result.rows)
  // })
    // SQL Query > Select Data
    // const q = "Select customer.id, customer.name from 'groupMessage' INNER JOIN customer ON 'groupMessage'.'idCustomer' = customer.id WHERE 'idUser' = $1"
    // const p = [1]
    // const query = await client.query(q, p)
    // query.on('row', (row) => {
    //   // results.push(row);
    //   console.log(row);
    // })
    // // After all data is returned, close connection and return results
    // query.on('end', () => {
    //   done()
    //   // return res.json(results);
    // })

    // client.query('SELECT NOW()', (err, result) => {
    //     release()
    //     if (err) {
    //       return console.error('Error executing query', err.stack)
    //     }
    //     console.log(result.rows)
    //   })

  // })

  // pool.connect((err, client, release) => {
  //   if (err) {
  //     return console.error('Error acquiring client', err.stack)
  //   }
  //   client.query('SELECT NOW()', (err, result) => {
  //     release()
  //     if (err) {
  //       return console.error('Error executing query', err.stack)
  //     }
  //     console.log(result.rows)
  //   })
  // })




  // (async () => {
  // const client = await pool.connect()
  // try {
  //   // const q = "Select customer.id, customer.name from 'groupMessage' INNER JOIN customer ON 'groupMessage'.'idCustomer' = customer.id WHERE 'idUser' = $1"
  //   const q = "select * from customer"
  //   const p = [1]
  //   const data = await client.query(q)
  //   console.log(data.rows)
  // } finally {
  //   client.release()
  // }
  // })().catch(e => console.log(e.stack))

  // pg.connect(connectionString, (err, client, done) => {
  //   // Handle connection errors
  //   if(err) {
  //     done();
  //     console.log(err);
  //     return res.status(500).json({success: false, data: err});
  //   }
  //   // SQL Query > Select Data
  //   const query = client.query('SELECT * FROM items ORDER BY id ASC;');
  //   // Stream results back one row at a time
  //   query.on('row', (row) => {
  //     results.push(row);
  //   });
  //   // After all data is returned, close connection and return results
  //   query.on('end', () => {
  //     done();
  //     return res.json(results);
  //   });
  // });




  socket.on('disconnect', function(){
    console.log('user disconnected' + socket.id)

  })




})



pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT * from customer', (err, result) => {
    // release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
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
      if(err) res.send("err: " + err)
      else {
        const id = decoded.id
        const passwd = decoded.pw
        req.id = id

        pool.connect(function(err, client, done) {
          if(err) {
            return console.error('error fetching client from pool', err);
          }
          client.query("Select id FROM users WHERE id = '" + id +"' AND password = '" + passwd + "'", function(err, result) {
            done();
            if(err) {
              return console.error('error running query', err);
            } else {
              if (result.rowCount == 1) {
                next()
              }
            }
          })
        })


      }
    })
  }
}


app.post("/getChatlog", mid, function(req,res) {


  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    const id = req.id
    const idCus = req.body.idCus
    const q = "Select * FROM chatlog WHERE (\"idFrom\" = $1 AND \"idTo\" = $2) OR (\"idFrom\" = $3 AND \"idTo\" = $4)"
    const p = [id, idCus, idCus, id]
    pool.query(q, p, (err, data) => {
      if (err) {
        console.log(err.stack)
      } else {
        res.json(result.rows)
      }
    })
  })
})



app.post("/login", function (req, res) {
  const username = req.body.username
  const password = req.body.password


  const q = "Select * FROM users WHERE email = $1 AND password = $2"
  const p = [username, password]
  pool.query(q, p, (err, data) => {
    if (err) {
      console.log(err.stack)
    } else {
      if (data.rowCount == 1) {
        const token = jwt.sign({id: data.rows[0].id, email: data.rows[0].email, pw: data.rows[0].password}, secret)
        const myObj = { "code": 1, "token": token};
        res.json(myObj)
      } else {
        const myObj = { "code": 0 };
        res.json(myObj)
      }
    }
  })

})
