import { Router } from 'express';
import medicineRoutes from './medicineRoutes.js';
import shopRoutes from './shopRoutes.js';
import orderRoutes from './orderRoutes.js';

const router = Router();

router.use('/medicines', medicineRoutes);
router.use('/shops', shopRoutes);
router.use('/orders', orderRoutes)

export default router;