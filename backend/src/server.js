import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/products', async (req, res) => {
  try {
    const q = (req.query.search || '').trim();
    const products = await prisma.product.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { brand: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {},
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'No fue posible consultar productos' });
  }
});

app.post('/api/products', async (req, res) => {
  const { name, brand, description, price, image, available = true } = req.body ?? {};
  const requiredTextFields = { name, brand, description, image };
  const missingFields = Object.entries(requiredTextFields)
    .filter(([, value]) => typeof value !== 'string' || value.trim() === '')
    .map(([field]) => field);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios',
      fields: missingFields,
    });
  }

  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return res.status(400).json({
      error: 'El precio debe ser un número mayor que cero',
      fields: ['price'],
    });
  }

  if (typeof available !== 'boolean') {
    return res.status(400).json({
      error: 'La disponibilidad debe ser un valor booleano',
      fields: ['available'],
    });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        brand: brand.trim(),
        description: description.trim(),
        price: numericPrice,
        image: image.trim(),
        available,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'No fue posible crear el producto' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(400).json({ error: 'ID inválido' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`PRISMO API http://localhost:${port}`));
