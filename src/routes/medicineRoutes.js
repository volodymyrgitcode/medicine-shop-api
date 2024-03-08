import { Router } from 'express';
import { getMedicines, getMedicine, createMedicine, deleteMedicine, updateMedicne } from '../controllers/medicineController.js';

const router = Router();

router.get('/', getMedicines);
router.get('/:id', getMedicine);
router.post('/', createMedicine);
router.delete('/:id', deleteMedicine);
router.put('/:id', updateMedicne);

export default router;