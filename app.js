const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(require("./routes/index"));

app.listen(port);
