const express = require("express");
const mongoose = require("mongoose");
const Tarea = require("./models/tarea"); // Asegúrate de que el nombre del archivo es "tarea.js" en minúsculas

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/gestor_tareas", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Ruta inicial de prueba
app.get("/", (req, res) => {
    res.send("¡Bienvenido a la API de Gestión de Tareas!");
});

// Crear una nueva tarea
app.post("/tareas", async (req, res) => {
    try {
        const nuevaTarea = new Tarea(req.body);
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear la tarea", error });
    }
});

// Obtener todas las tareas
app.get("/tareas", async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las tareas", error });
    }
});

// Marcar tarea como completada
app.put("/tareas/:id", async (req, res) => {
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
});

// Eliminar una tarea
app.delete("/tareas/:id", async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);
        if (!tarea) {
            return res.status(404).json({ mensaje: "Tarea no encontrada" });
        }
        res.status(200).json({ mensaje: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la tarea", error });
    }
});

// Servidor corriendo en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
