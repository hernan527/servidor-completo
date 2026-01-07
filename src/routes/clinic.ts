import { Router } from "express";
import * as express from "express";
import { getItems, getItemById, searchItem } from '../controllers/clinicas.supabase';
import { createItemFull, updateItemFull,  deleteItemFull} from '../controllers/clinicasConPlanes.supabase';

const router = Router();

router.use(express.json());
router.get('/',(req, res) => { getItems(req, res);});
router.get('/:id', (req, res) => { getItemById(req, res);});
router.put('/:id', (req, res) => { updateItemFull(req, res )});
router.delete('/:id', (req, res) => { deleteItemFull(req, res )});
router.get('/search',(req, res) => {searchItem(req, res);});
router.post('/', (req, res) => { createItemFull(req, res) });

export { router }


