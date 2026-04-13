import { Router } from 'express';
import { 
    createCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from '../controllers/category.controller.js';
import { validateDTO } from '../middleware/validate.js';
import { CreateCategorySchema, UpdateCategorySchema } from '../dtos/category.dto.js';

const router = Router();

router.post('/', validateDTO(CreateCategorySchema), createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', validateDTO(UpdateCategorySchema), updateCategory);
router.delete('/:id', deleteCategory);

export default router;