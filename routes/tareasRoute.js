// routes/tareasRoutes.js
import express from 'express';
import tareasController from '../controllers/tareasController.js';

const router = express.Router();

// Ruta para crear una nueva tarea
router.post("/", tareasController.crearTarea);

// Ruta para obtener todas las tareas
router.get("/", tareasController.obtenerTareas);

// Ruta para actualizar una tarea (marcar como completada)
router.put("/:id", tareasController.actualizarTarea);

// Ruta para eliminar una tarea
router.delete("/:id", tareasController.eliminarTarea);

// Exportar el router como default
export default router;
