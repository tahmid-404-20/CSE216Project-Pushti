const express = require("express");
const path = require("path");
var cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require("connect-flash");
var timeout = require("connect-timeout");
//cors to allow cross origin resource sharing

// internal imports
const homePageRouter = require("./routes/homePageRoute");
const loginRouter = require("./routes/loginRoute");
const registerRouter = require("./routes/registerRoute");
const agentRouter = require("./routes/agentRoute");
const farmerRouter = require("./routes/farmerRoute");
const adminRouter = require("./routes/adminRoute");
const logoutRouter = require("./routes/logoutRoute");

const app = express();
dotenv.config();

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(timeout("50s")); //set 10s timeout for all requests
app.use(
  session({
    secret: makeid(25),
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use("/", homePageRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/agent", agentRouter);
app.use("/farmer", farmerRouter);
app.use("/admin", adminRouter);
app.use("/logout", logoutRouter);

app.listen(3000, () => console.log("App is listening on port 3000"));
