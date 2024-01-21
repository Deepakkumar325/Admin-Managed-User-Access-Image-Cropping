const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const adminlog = require("./schema/adminlog");

app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb" }));


// Enable CORS
 
// not work
// app.use(
//   cors({
//     origin: "http://localhost:5500",
//     credentials: true,
//   })
// );


// Enable CORS
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500'];  // i am using npx http-server --cors 

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});




async function checkConnection() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Admin_Managed");
    console.log("Connected");
  } catch (error) {
    "Not Connected :", error.message;
  }
}
checkConnection();

app.post("/check", async (req, res) => {
  const { data } = req.body;
  data;
  try {
    const val = await adminlog.findOne({ name: data.name, pass: data.pass });
    if (val) {
      return res.status(200).send({ msg: "exist" });
    } else {
      return res.status(200).send({ msg: "not" });
    }
  } catch (e) {
    e;
  }

  res.send({ msg: "Deepak" });
});

app.use("/createId", require("./router/adminlogin"));

app.listen(3030, () => {
   console.log("Server running at port 3030")
});
