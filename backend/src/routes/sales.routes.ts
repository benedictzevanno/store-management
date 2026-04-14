import { Router } from 'express';
import { 
    createSales, 
    getSales, 
    getSalesById, 
    updateSales, 
    deleteSales 
} from '../controllers/sales.controller.js';
import { validateDTO } from '../middleware/validate.js';
import { CreateSalesSchema, UpdateSalesSchema } from '../dtos/sales.dto.js';

const router = Router();

router.post('/', validateDTO(CreateSalesSchema), createSales);
router.get('/', getSales);
router.get('/:id', getSalesById);
router.put('/:id', validateDTO(UpdateSalesSchema), updateSales);
router.delete('/:id', deleteSales);

export default router;