import { getShops, getShop, createShop, deleteShop, updateShop } from "../controllers/shopController.js";
import { Router } from 'express';

const router = Router();

router.get('/', getShops);
router.get('/:id', getShop);
router.post('/', createShop);
router.delete('/:id', deleteShop);
router.put('/:id', updateShop);

export default router;