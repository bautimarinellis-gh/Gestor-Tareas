import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Rutas de registro y login
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);


export default router;