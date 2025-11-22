import { Router } from "express";
import * as express from "express";
import { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  } from '../controllers/cotizaciones';

const router = Router();

router.use(express.json());
router.get('/',(req, res) => { getItems(req, res);});
router.get('/:id', (req, res) => { getItemById(req, res);});
router.post('/', (req, res) => {createItem(req, res ) });
router.put('/:id', (req, res) => { updateItem(req, res )});
router.delete('/:id', (req, res) => { deleteItem(req, res )});
router.get('/search',(req, res) => {searchItem(req, res);
  });
 
export { router }


