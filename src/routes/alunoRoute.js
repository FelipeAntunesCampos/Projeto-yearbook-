import { Router } from "express";
import * as alunoController from './../controllers/alunoController.js'

const router = Router();

//rota Get all
router.get("/", alunoController.listarTodos);
router.get("/:id", alunoController.listarUm);
router.post("/", alunoController.criarAluno);
router.delete("/:id", alunoController.apagarAluno);
router.put("/:id", alunoController.atualizarAluno);
export default router;
