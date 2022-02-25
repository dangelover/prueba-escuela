const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosget,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const {
  esRolValido,
  emailExiste,
  usuarioExistePorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.get("/", usuariosget);
//el check tambien puede darse cuenta si es un parametro del body o de la url
//en este caso el id
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(usuarioExistePorId),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mas de 6 letras").isLength({
      min: 6,
    }),
    check("DNI", "El DNI debe de tener maximo 8 numeros y ser numerico")
      .isNumeric()
      .isLength({
        max: 8,
      }),
    //el check es un middleware que nos permite revisar los campos del body
    check("correo", "El Correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    // check("rol", "No es un rol permitido").isIn([
    //   "ADMIN_ROLE",
    //   "DOCENTE_ROL",
    //   "ALUMNO_ROL",
    // ]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);
router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(usuarioExistePorId),
    validarCampos,
  ],
  usuariosDelete
);
router.patch("/", usuariosPatch);
module.exports = router;
