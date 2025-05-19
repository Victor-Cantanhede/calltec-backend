import { Router } from 'express';

import { createDepartment } from '../controllers/departmentControllers/createDepartment';
import { getAllDepartments } from '../controllers/departmentControllers/getDepartment';
import { deleteDepartment } from '../controllers/departmentControllers/deleteDepartment';
import { verifyToken } from '../middlewares/verifyToken';
import { onlyAdmin } from '../middlewares/onlyAdmin';

const router = Router();

// CRUD
router.post('/', verifyToken, onlyAdmin, createDepartment);
router.get('/', verifyToken, getAllDepartments);
router.delete('/:id', verifyToken, onlyAdmin, deleteDepartment);

export default router;