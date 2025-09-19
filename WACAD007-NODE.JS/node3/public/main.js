async function gerar() {
  const qtd = document.getElementById('qtd').value || 3;
  const res = await fetch(`/gerar?qtd=${encodeURIComponent(qtd)}`);
  const data = await res.json();
  const container = document.getElementById('resultado');
  container.innerHTML = '';
  data.paragraphs.forEach(p => {
    const el = document.createElement('p');
    el.textContent = p;
    container.appendChild(el);
  });
}

document.getElementById('gerar').addEventListener('click', gerar);

window.addEventListener('DOMContentLoaded', gerar);
