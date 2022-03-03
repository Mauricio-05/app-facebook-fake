//Requires
const express = require("express");
const morgan = require("morgan");
const ejsLayout = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");

//inicializations
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Settings ejs-layput
app.use(ejsLayout);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

//Config sessions express
app.use(
  session({
    secret: "mysecretkey_mao",
    resave: false,
    saveUninitialized: false,
  })
);

//Routes
app.use(require("./routes/index.js"));

//Middleware error 404
app.use((req, res, next) => {
  res
    .status(404)
    .render("404", { title: "Error 404", layout: "./layouts/layoutIndex" });
});

//Listen
app.listen(app.get("port"), "192.168.1.65", () => {
  console.log("Servidor encendido en la ip 192.168.1.65:3000");
});
