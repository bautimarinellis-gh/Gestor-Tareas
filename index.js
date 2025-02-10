import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import tareasRoutes from './routes/tareasRoute.js' // Importa las rutas de tareas
import usersRoutes from './routes/usersRoute.js' // Importa las rutas de usuarios

import { PORT } from './config.js'  // Importar SECRET_JWT_KEY desde config.js

const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:5500',  // Asegúrate de que esto coincida con el frontend
    credentials: true,  // Permite el envío de cookies
};

// Aplicamos el middleware CORS con las opciones definidas
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Usar las rutas de tareas
app.use("/tareas", tareasRoutes);
app.use('/usuarios', usersRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/gestor_tareas")
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

app.get("/", (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
