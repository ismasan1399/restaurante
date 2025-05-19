const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 👉 Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, "public")));

let pedidos = []; // Base de datos simulada en memoria

// Obtener todos los pedidos
app.get("/api/pedidos", (req, res) => {
  res.json(pedidos);
});

// Crear nuevo pedido
app.post("/api/pedidos", (req, res) => {
  const nuevoPedido = req.body;
  nuevoPedido._id = Date.now().toString(); // ID simulado
  pedidos.push(nuevoPedido);
  res.status(201).json(nuevoPedido);
});

// Actualizar estado del pedido
app.patch("/api/pedidos/:id", (req, res) => {
  const id = req.params.id;
  const index = pedidos.findIndex(p => p._id === id);
  if (index !== -1) {
    pedidos[index] = { ...pedidos[index], ...req.body };
    res.sendStatus(200);
  } else {
    res.status(404).send("Pedido no encontrado");
  }
});

// Eliminar pedido
app.delete("/api/pedidos/:id", (req, res) => {
  const id = req.params.id;
  pedidos = pedidos.filter(p => p._id !== id);
  res.sendStatus(200);
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
