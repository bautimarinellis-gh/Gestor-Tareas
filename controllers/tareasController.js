// controllers/tareasController.js
import Tarea from "../models/tarea.js";

// Crear una nueva tarea
const crearTarea = async (req, res) => {
    try {
        const nuevaTarea = new Tarea(req.body);
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear la tarea", error });
    }
};

// Obtener todas las tareas
const obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las tareas", error });
    }
};

// Marcar tarea como completada
const actualizarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndUpdate(
            req.params.id,
            { completada: true },
            { new: true }
        );
        if (!tarea) {
            return res.status(404).json({ mensaje: "Tarea no encontrada" });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la tarea", error });
    }
};

// Eliminar una tarea
const eliminarTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);
        if (!tarea) {
            return res.status(404).json({ mensaje: "Tarea no encontrada" });
        }
        res.status(200).json({ mensaje: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la tarea", error });
    }
};

// Exportar las funciones de la controladora
export default {
    crearTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea,
};
