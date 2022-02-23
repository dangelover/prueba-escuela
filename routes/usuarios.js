const { Router } = require("express");
const {
  usuariosget,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const router = Router();
router.get("/", usuariosget);
router.put("/:id", usuariosPut);
router.post("/", usuariosPost);
router.delete("/", usuariosDelete);
router.patch("/", usuariosPatch);
module.exports = router;
