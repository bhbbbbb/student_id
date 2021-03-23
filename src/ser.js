const express = require('express')

// create an express, aka web server, instance
// 建立一個 express (也就是網頁伺服器)實體
const app = express()
var cors = require("cors");
const port = 2223;
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
  console.log(`listening on port: ${port}`);
})

app.use(express.static(__dirname + "/../dist"));