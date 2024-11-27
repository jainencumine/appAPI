const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const combosDisponibles = [
  { id: 1, name: "Combo Americano", price: 7000 },
  { id: 2, name: "Combo Doble Cheedar", price: 6500 },
  { id: 3, name: "Combo Junior Simple", price: 3000 },
  { id: 4, name: "Combo Junior Big", price: 5000 },
  { id: 5, name: "Combo The Big", price: 8000 },
  { id: 6, name: "Combo MegaL", price: 7000 },
  { id: 7, name: "Combo MegaXL", price: 8500 },
  { id: 8, name: "Combo Tosti XL", price: 4500 },
  { id: 9, name: "Combo Chicken Simple", price: 3500 },
  { id: 10, name: "Combo Chicken XL", price: 5000 },
  { id: 11, name: "Combo Ceasar Salad", price: 4000 },
  { id: 13, name: "Combo Tuna Salad", price: 4000 },
  { id: 14, name: "Combo Crispy Salad", price: 4300 },
  { id: 15, name: "Ice Ball", price: 1500 },
  { id: 16, name: "Big Ice", price: 2000 },
  { id: 17, name: "Chocolate Ice", price: 2000 },
];

let pedidosConfirmados = [];

app.get('/api/combos', (req, res) => {
  res.json(combosDisponibles);
});

app.post('/api/pedidos', (req, res) => {
  const { mesa, combos, total } = req.body;
  const nuevoPedido = { mesa, combos, total };
  pedidosConfirmados.push(nuevoPedido);
  res.status(201).json(nuevoPedido);
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
