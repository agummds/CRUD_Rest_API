const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Selamat Datang di API Gwehh!");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.post("/products", async (req, res) => {
  const newProductData = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      price: newProductData.price,
    },
  });
  res.send({
    data: product,
    message: "sukses membuat product",
  });
});

app.delete("/products/:id", async (req, res) => {
  const ProductId = req.params.id; //string

  await prisma.product.delete({
    where: {
      id: parseInt(ProductId),
    },
  });
  res.send("product dihapus");
});

app.listen(PORT, () => {
  console.log("Express API sedang berjalan di port : " + PORT);
});
