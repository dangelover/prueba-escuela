// {
//     nombre:'Kevin',
//     correo:'kevincastrocampos@gmail.com',
//     DNI:72289669 //logarse con DNI
//     password:'abc123abc'//encriptado
//     img:'121212131',
//     rol:'DOCENTE|ALUMNO|ADMINISTRADOR',
//     estado:false,
//     google:false,
// }
const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  correo: {
    type: String,
    unique: true,
  },
  DNI: {
    type: Number,
    required: [true, "El DNI es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "El password es requerido"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "ALUMNO_ROLE", "DOCENTE_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};
module.exports = model("Usuario", UsuarioSchema);
