const express = require('express')

// create an express, aka web server, instance
// 建立一個 express (也就是網頁伺服器)實體
const app = express()
var cors = require("cors");
const port = 2222;
const corsOptions = {
  origin: ["http://localhost:8080"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// app.use(cors(corsOptions));
app.use(cors());
// start the server
// 啟動伺服器
app.listen(port, () => {
  console.log(`listening on port: ${port}, at ` + __dirname);
})

app.use(express.static(__dirname + "/../public"));

// include `body-parser`
// 載入 `body-parser`
const bodyParser = require('body-parser')

// setup `body-parser`
// 設定 `body-parser`
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var fs = require("fs");

// fs.copyFileSync("./assets/students copy.json", "./assets/students.json"); // temp

var student_list = require("./assets/students.json");



app.post('/add', (req, res) => {
  // console.log(typeof req.body, req.body);
  // console.log(req.body["id_to_add"]);
  let new_list_str;
  if(req.body.id_to_add && req.body.name_to_add) {
    student_list[req.body.id_to_add] = req.body.name_to_add;
    new_list_str = JSON.stringify(student_list);
    fs.writeFile(__dirname + "/assets/students.json", new_list_str, (err) => {
      if(err) console.log(err);
    });
    res.send(new_list_str);
  }

  else res.send(JSON.stringify(student_list));
  
  
})

app.post('/del', (req, res) => {
  // console.log(typeof req.body, req.body);
  // console.log(req.body["id_to_add"]);
  let new_list_str;
  if(req.body.id_to_del && req.body.id_to_del in student_list) {
    delete student_list[req.body.id_to_del];
    new_list_str = JSON.stringify(student_list);
    fs.writeFile(__dirname + "/assets/students.json", new_list_str, (err) => {
      if(err) console.log(err);
    });
    res.send(new_list_str);
  }
  
  else res.send(JSON.stringify(student_list));
});

app.get('/list', (req, res) => {
  res.send(JSON.stringify(student_list));
});

app.get('/test', (req, res) => {
  res.send("hello");
})
