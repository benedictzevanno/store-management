import { Router } from 'express';
import { 
    createItem, 
    getItems, 
    getItemById, 
    updateItem, 
    deleteItem 
} from '../controllers/item.controller.js';
import { validateDTO } from '../middleware/validate.js';
import { CreateItemSchema, UpdateItemSchema } from '../dtos/item.dto.js';

const router = Router();

router.post('/', validateDTO(CreateItemSchema), createItem);
router.get('/', getItems);
router.get('/:id', getItemById);
router.put('/:id', validateDTO(UpdateItemSchema), updateItem);
router.delete('/:id', deleteItem);

export default router;