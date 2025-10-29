import { Router } from 'express';
import { getHb1, getHb2, getHb3, getHb4 } from '../controller/main.controller.js';

const router = Router();

// ------------------- Página inicial -------------------
router.get('/', (_req, res) => {
  res.render('home', {
    title: 'Bem-vindo à Web Academy!',
    subtitle: 'Atividade Express + Handlebars + SASS',
  });
});

// ------------------- Rotas das páginas HB -------------------
router.get('/hb1', getHb1);
router.get('/hb2', getHb2);
router.get('/hb3', getHb3);
router.get('/hb4', getHb4);

export default router;
