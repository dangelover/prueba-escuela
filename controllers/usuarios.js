const bcryptjs = require("bcryptjs");
const { response } = require("express");
const Usuario = require("../models/usuario");

const usuariosget = async (req, res) => {
  // const { q, nombre = "No Name", apikey, page, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // const docente_role = "ALUMNO_ROLE";
  // const usuarios = await Usuario.find({ estado: true, grado_id:grado_id,seccion_id:seccion_id })
  // const usuarios = await Usuario.find({ estado: true })
  // const usuarios = await Usuario.find(query)
  //   .limit(Number(limite))
  //   .skip(Number(desde));
  // const total = await Usuario.countDocuments(query);
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
  ]);
  res.status(200).json({
    total,
    usuarios,
  });
};
const usuariosPost = async (req, res) => {
  const { nombre, correo, DNI, password, rol } = req.body;
  // const { google, ...rest } = req.body;

  const usuario = new Usuario({
    nombre,
    correo,
    DNI,
    password,
    rol,
  });
  //verificar si el email existe

  //verificar si el DNI existe
  const dniExiste = await Usuario.findOne({ DNI });
  if (dniExiste) {
    return res.status(400).json({
      msg: "El DNI ya esta registrado",
    });
  }

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);
  await usuario.save();
  res.status(201).json({
    msg: "usuario creado",
    usuario,
  });
};
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { password, google, correo, ...resto } = req.body;
  const usuario_data = await Usuario.findById(id);
  // console.log(correo, usuario_data.correo);
  if (correo !== usuario_data.correo) {
    resto.correo = correo;
  }
  //TODO VALIDAR CONTRA BASE DE DATOS
  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.status(200).json({
    ok: true,
    msg: "put API-controlador",
    usuario,
  });
};
const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  //fisicamente borrado
  // const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.status(200).json({
    msg: "usuario borrado",
    usuario,
    id,
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
