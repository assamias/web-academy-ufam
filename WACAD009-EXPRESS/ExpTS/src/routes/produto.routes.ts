import { Router } from 'express';
import { index, create, read, update, remove } from '../controller/produto.controller.js';

const router = Router();

router.get('/', index);
router.all('/create', create);
router.all('/update/:id', update);
router.get('/:id', read);
router.post('/:id', remove);

export default router;
