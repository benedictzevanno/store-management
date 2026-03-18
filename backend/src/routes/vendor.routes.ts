import { Router } from 'express';
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} from '../controllers/vendor.controller.js';
import { validateDTO } from '../middleware/validate.js';
import { CreateVendorSchema, UpdateVendorSchema } from '../dtos/vendor.dto.js';

const router = Router();

router.post('/', validateDTO(CreateVendorSchema), createVendor);
router.get('/', getVendors);
router.get('/:id', getVendorById);
router.put('/:id', validateDTO(UpdateVendorSchema), updateVendor);
router.delete('/:id', deleteVendor);

export default router;