const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))

app.get('/', (req, res) => {
  res.status(301).redirect("https://switchit.com.ar")
 })

app.listen(port)