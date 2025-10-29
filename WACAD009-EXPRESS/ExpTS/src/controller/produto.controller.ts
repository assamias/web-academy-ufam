import { Request, Response } from 'express';
import axios from 'axios';

const API_URL = 'http://localhost:3355/products';

// Lista todos os produtos
export async function index(req: Request, res: Response) {
  const { data } = await axios.get(API_URL);
  res.render('produto/listar', { title: 'Listagem de Produtos', products: data });
}

// Exibe e cria um novo produto
export async function create(req: Request, res: Response) {
  if (req.method === 'GET') {
    return res.render('produto/novo', { title: 'Novo Produto' });
  }

  const { name, price, stock } = req.body;
  await axios.post(API_URL, { name, price: Number(price), stock: Number(stock) });
  res.redirect('/produto');
}

// Exibe e atualiza um produto existente
export async function update(req: Request, res: Response) {
  const { id } = req.params;

  if (req.method === 'GET') {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return res.render('produto/editar', { title: 'Editar Produto', product: data });
  }

  const { name, price, stock } = req.body;
  await axios.put(`${API_URL}/${id}`, { name, price: Number(price), stock: Number(stock) });
  res.redirect('/produto');
}

// Detalhes de um produto
export async function read(req: Request, res: Response) {
  const { id } = req.params;
  const { data } = await axios.get(`${API_URL}/${id}`);
  res.render('produto/detalhe', { title: 'Detalhes do Produto', product: data });
}

// Remove um produto
export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  await axios.delete(`${API_URL}/${id}`);
  res.redirect('/produto');
}
