import express from 'express';  
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';


import { SECRET_JWT_KEY } from '../config.js';  // Importar SECRET_JWT_KEY desde config.js
import User from '../models/user.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',  // Ajusta al dominio de tu frontend
    credentials: true  // Permite el envío de cookies
}));

// Registro de usuario
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validaciones
        if (typeof username !== 'string' || username.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }
        if (typeof password !== 'string' || password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) throw new Error('Username already exists');

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear y guardar el usuario
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login de usuario
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ username });
        if (!user) throw new Error('User not found');

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid password');

        // Generar token JWT
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, { expiresIn: '1h' })

        // Configurar cookie con el token
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,  // Cambia esto a true si usas HTTPS
            sameSite: 'Strict',  // Prueba con 'Lax' en lugar de 'None'
            maxAge: 1000 * 60 * 60  // 1 hora
        });

        res.json({ message: "Login successful", user: { id: user._id, username: user.username }, token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: false, // Asegúrate de establecerlo en true si usas HTTPS
        sameSite: 'Strict',
        maxAge: 0 // Asegúrate de que la cookie tenga una duración de 0 para eliminarla
    }).json({ message: 'Logout successful' });
};

export default { register, login, logout};



