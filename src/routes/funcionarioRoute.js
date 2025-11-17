import { Router } from "express";
import * as funcionarioController from "./../controllers/funcionarioController.js";

const router = Router();

//rota Get all
router.get("/", funcionarioController.listarTodos);
router.get("/:id", funcionarioController.listarUm);
router.post("/", funcionarioController.criarfuncionario);
router.delete("/:id", funcionarioController.apagarfuncionario);
router.put("/:id", funcionarioController.atualizarfuncionario);

export default router;