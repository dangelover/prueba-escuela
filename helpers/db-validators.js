const Role = require("../models/role");
const Usuario = require("../models/usuario");
const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};
const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El CORREO ${email} esta registrado en la base de datos`);
  }
};
const usuarioExistePorId = async (id) => {
  const usuarioExiste = await Usuario.findById(id);
  if (!usuarioExiste) {
    throw new Error(`El usuario con ${id} no existe`);
  }
};
module.exports = { esRolValido, emailExiste, usuarioExistePorId };
