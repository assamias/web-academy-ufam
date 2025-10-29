import { Request, Response } from 'express';

export function getHb1(_req: Request, res: Response) {
  res.render('hb1', { title: 'Express + HBS!' });
}

export function getHb2(_req: Request, res: Response) {
  // Usa layout alternativo main2.hbs
  res.render('hb2', {
    title: 'Framework Express',
    type: 'Framework',
    name: 'Express',
    layout: 'main2',
  });
}

export function getHb3(_req: Request, res: Response) {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Eldeno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];
  res.render('hb3', { title: 'Professores do IComp/UFAM', profes });
}

export function getHb4(_req: Request, res: Response) {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM Tool', poweredByNodejs: true },
  ];

  res.render('hb4', { title: 'Tecnologias baseadas no NodeJS', technologies });
}
