import mongoose from 'mongoose';

// Definir el esquema de la tarea
const tareaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: String,
    completada: { type: Boolean, default: false },
    fechaCreacion: { type: Date, default: Date.now }
});

// Crear el modelo "Tarea" basado en el esquema
const Tarea = mongoose.model("Tarea", tareaSchema);

export default Tarea;
