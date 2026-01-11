import { Router } from "express";
import * as express from "express";
import { getItems, getItemById, createItem, updateItem, deleteItem, searchItem, getPrestaciones, updatePrestacionesPlan, getJerarquia, createPrestacion  } from '../controllers/planes.supabase';
import { supabase } from '../config/database'; // Asegúrate de importar tu cliente

const router = Router();
router.use(express.json());

// --- 1. RUTAS ESTÁTICAS (Van arriba de todo) ---
router.get('/prestaciones-maestras', (req, res) => { getPrestaciones(req, res) });
router.get('/jerarquia-planes', (req, res) => { getJerarquia(req, res) });
router.get('/search', (req, res) => { searchItem(req, res) }); // <-- SUBIDA AQUÍ

// --- 2. RUTAS BASE ---
router.get('/', (req, res) => { getItems(req, res) });
router.post('/', (req, res) => { createItem(req, res) });
// En tu router de Express
router.post('/prestaciones-maestras', createPrestacion);
// --- 3. RUTAS CON PARÁMETROS (Van al final) ---
router.get('/:id', (req, res) => { getItemById(req, res) });
router.put('/:id', (req, res) => { updateItem(req, res) });
router.delete('/:id', (req, res) => { deleteItem(req, res) });

// RUTA PARA LOS FOLLETOS
router.put('/:id/prestaciones', (req, res) => { updatePrestacionesPlan(req, res) });

export { router }


