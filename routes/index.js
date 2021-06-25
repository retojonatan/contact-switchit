const { Router } = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = Router();

router.get("/", (req, res) => {
  res.status(301).redirect("https://switchit.com.ar");
});

router.post("/test", (req, res) => {
  res.send(process.env.CCJ_SMTP_USER);
});

router.post("/quintino/contact", async (req, res) => {
  const { nombre, email, url, asunto } = req.body;

  if (!url && nombre && email && asunto) {
    contentHtml = `
    <h4>Este es un mensaje autogenerado por el formulario de la web, a continuacion se detallan los datos del mismo:</h4>
    <p>Nombre: ${nombre}</p>
    <p>Correo: ${email}</p>
    <p>Asunto: ${asunto}</p>
    `;

    const transporter = nodemailer.createTransport({
      host: "mail.quintino.com.ar",
      port: 465,
      secure: true,
      auth: {
        user: process.env.QUINTINO_SMTP_USER,
        pass: process.env.QUINTINO_SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "landing-form@quintino.com.ar",
      to: "retojonatan@colegiociudadjardin.edu.ar", //landing-form
      subject: "Formulario Web",
      html: contentHtml,
    });

    console.log("Mensaje enviado", info);
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

router.post("/ccj/admisiones", async (req, res) => {
  const {
    nombreApellido,
    nivelEducativo,
    edad,
    institucionProveniente,
    nombrePadre,
    apellidoPadre,
    nombreMadre,
    apellidoMadre,
    direccion,
    telefono,
    mail,
    mensaje,
  } = req.body;
  if (nombreApellido && mail && edad) {
    contentHtml = `
    <h4>Este es un mensaje autogenerado por el formulario de admisiones, a continuacion se detallan los datos del mismo:</h4>
    <p>Nombre del alumno entrante: ${nombreApellido}</p>
    <p>Edad: ${edad}</p>
    <p>Nivel educativo: ${nivelEducativo}</p>
    <p>Institución proveniente: ${institucionProveniente}</p>
    <p>Nombre del Padre: ${nombrePadre + " " + apellidoPadre}</p>
    <p>Nombre de la Madre: ${nombreMadre + " " + apellidoMadre}</p>
    <p>Dirección: ${direccion}</p>
    <p>telefono: ${telefono}</p>
    <p>Correo: ${mail}</p>
    <p>Porque eligieron la institución: ${mensaje}</p>
    `;
    asunto = "Formulario Admisión - " + nombreApellido;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.CCJ_SMTP_USER,
        pass: process.env.CCJ_SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "web-form@colegiociudadjardin.edu.ar",
      to: "retojonatan@colegiociudadjardin.edu.ar", //admision
      subject: asunto,
      html: contentHtml,
    });

    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

router.post("/ccj/contact", async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  if (nombre && email && mensaje) {
    contentHtml = `
    <h4>Este es un mensaje autogenerado por el formulario de consultas, a continuacion se detallan los datos del mismo:</h4>
    <p>Nombre: ${nombre}</p>
  	<p>Correo: ${email}</p>
    <p>Mensaje: ${mensaje}</p>
    `;
    asunto = "Consulta - " + nombre;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.CCJ_SMTP_USER,
        pass: process.env.CCJ_SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "web-form@colegiociudadjardin.edu.ar",
      to: "retojonatan@colegiociudadjardin.edu.ar", //administracion
      subject: asunto,
      html: contentHtml,
    });
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

module.exports = router;
