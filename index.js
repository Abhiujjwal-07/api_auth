const express = require("express");

const auth = require("./routes/auth");
const post = require("./routes/post");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/post", post);
app.get("/", (req, res) => {
  res.send("its working");
});

//app.post('/sign' )
app.listen(3300, () => {
  console.log("listening on 3300");
});
