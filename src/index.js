// Tujuan dari index.js ini adalah memegang semua konfigurasi awal dari inisialisasi

const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();  //berguna untuk membaca file .env yang telah dibuat

const PORT = process.env.PORT;    //ini berguna untuk mengambil key port di dalam .env yang mana valuenya adalah 2000

app.use(express.json());    //menambahan app.use express.json supaya aplikasi express bisa membaca body yang dikirim

// Awal Method GET
app.get("/api", (req, res) => {       //dengan endpoint "/api" maka dia akan menjalankan funchtion res.send("Selamat Datang di API Gwehh!")
  res.send("Selamat Datang di API Gwehh!");
});

app.get("/products", async (req, res) => {               
  const products = await prisma.product.findMany();     //Mendapatkan banyak prodct dari database disimpan dalam variabel products dan sebagai respon dikirip products

  res.send(products);
});
// Akhir Method GET

// Awal GET product berdasarkan Id
app.get("/products/:id", async (req, res)=>{
  const productId = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!product){
    return res.status(400).send('Produk tidak ditemukan')
  }

  res.send(product);

});
// Akhir GET product berdasarkan Id

// Awal Method POST
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
// Akhir Method POST


// Awal Method DELETE
app.delete("/products/:id", async (req, res) => {
  const ProductId = req.params.id; //string

  await prisma.product.delete({

    where: {
      id: parseInt(ProductId),  //parseInt berguna mengubah id string menjadi Int pada productId
    },
  });
  res.send("product dihapus");
});
// Akhir Method DELET

// Awal Method PUT

app.put("/products/:id", async (req, res)=>{
  const ProductId = req.params.id;    //pada PUT kita menggunakan req.params dan req.body
  const ProductData = req.body;

  const product = await prisma.product.update({
    where:{
      id:parseInt(ProductId),
    },
    data:{
      description:ProductData.description,
      image:ProductData.image,
      name:ProductData.name,
      price:ProductData.price,
    },
  });
  res.send({
    data:product,
    message:"edit product sukses",
  });
});
// Akhir Metod PUT

// Awal Method PATCH
/* Method PATCH dan PUT hampir mirip, yang membekana adalah pada method PATCH bisa bisa mengubah satu field saja, 
misalkan mau mengubaha nama database saja. Tapi kalau dia PUT, itu harsu semau field yang diubah, tidak bisa satu field saja*/

app.patch("/products/:id", async (req,res)=>{
  const ProductId = req.params.id;    //pada PATCH kita menggunakan req.params dan req.body
  const ProductData = req.body;

  const product = await prisma.product.update({
    where:{
      id:parseInt(ProductId),
    },
    data:{
      description:ProductData.description,
      image:ProductData.image,
      name:ProductData.name,
      price:ProductData.price,
    },
  });
  res.send({
    data:product,
    message:"edit product sukses",
  });
});  

// Akhir Method PATCH

app.listen(PORT, () => {
  console.log("Express API sedang berjalan di port : " + PORT);
});
