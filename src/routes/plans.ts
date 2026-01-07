import { Router } from "express";
import * as express from "express";
import { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  } from '../controllers/planes.supabase';
import {   getJerarquia } from '../controllers/clinicasConPlanes.supabase';

const router = Router();

router.use(express.json());
router.get('/jerarquia-planes', (req, res) => { getJerarquia(req, res) }); // Para alimentar el formulario
router.get('/',(req, res) => { getItems(req, res);});
router.get('/:id', (req, res) => { getItemById(req, res);});
router.post('/', (req, res) => {createItem(req, res) });
router.put('/:id', (req, res) => { updateItem(req, res)});
router.delete('/:id', (req, res) => { deleteItem(req, res)});
router.get('/search',(req, res) => {searchItem(req, res);});

 
export { router }


