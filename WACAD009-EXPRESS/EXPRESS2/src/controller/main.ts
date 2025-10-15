import { Request, Response } from 'express';

const index = (req: Request, res: Response) => {
  res.send('Hello world! Esta é a página Inicial');
};

const about = (req: Request, res: Response) => {
  res.send('About page');
};

const hb1 = (req: Request, res: Response) => {
  res.render('hb1', {});
};

const hb2 = (req: Request, res: Response) => {
  res.render('hb2', {});
};
const hb3 = (req: Request, res: Response) => {
  const profs = [
    { name: 'David Fernandes', sala: 1238 },
    { name: 'Horácio Fernandes', sala: 1233 },
    { name: 'Edleno Moura', sala: 1236 },
    { name: 'Elaine Harada', sala: 1231 },
  ];
  res.render('hb3', {
    profs,
  });
};

const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];
  res.render('hb4', {
    technologies,
  });
};

export default { index, about, hb1, hb2, hb3, hb4 };
