import { Prof } from './helpersTypes';
import { Tech } from './helpersTypes';

function listProf(profs: Prof[]) {
  const list = profs.map((p) => `<li>${p.name}-${p.sala}</li>`);
  return `<ul>${list.join('')}</ul>`;
}

function listTech(technologies: Tech[]) {
  const list = technologies.map(({ name, type }) => {
    return `<li>${name} - ${type}</li>`;
  });
  return `<ul>${list.join('')}</ul>`;
}

export default { listProf, listTech };
