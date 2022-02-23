const { response } = require("express");
const usuariosget = (req, res) => {
  const { q, nombre = "No Name", apikey, page, limit } = req.query;
  res.status(200).json({
    ok: true,
    msg: "get API-controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};
const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;
  res.status(201).json({
    nombre,
    edad,
    msg: "post API-controlador",
  });
};
const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.status(200).json({
    ok: true,
    msg: "put API-controlador",
    id,
  });
};
const usuariosDelete = (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "delte API-controller",
  });
};
const usuariosPatch = (req, res) => {
  res.status(200).json({
    ok: true,
    msg: "patch API-controller",
  });
};
module.exports = {
  usuariosget,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
