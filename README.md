# PRISMO — XERO Sprint 1

Primera versión funcional de la tienda web XERO, desarrollada para el Sprint 1.

## Stack
- React + Vite
- Node.js + Express
- PostgreSQL + Prisma
- Docker Compose

## Requisitos
Node.js 20+, npm y Docker Desktop.

## Instalación

### 1. Base de datos
Desde la raíz:
```bash
docker compose up -d
```

### 2. Backend
```bash
cd backend
copy .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```
API: http://localhost:4000

### 3. Frontend
En otra terminal:
```bash
cd frontend
npm install
npm run dev
```
Web: http://localhost:5173

## Sprint 1 implementado
- HU-01 Inicio responsive
- HU-02 Navegación Inicio / Productos
- HU-03 Catálogo conectado a PostgreSQL
- HU-04 Detalle de producto
- HU-05 Búsqueda por nombre o marca
- HU-06 Modelo Product con ID, nombre, marca, descripción, precio, imagen y disponibilidad
- HU-07 Registro de productos desde la interfaz web y mediante la API
- HU-08 Estructura de repositorio + README
- HU-09 Base funcional preparada para pruebas

## API
`GET /api/products`
`GET /api/products?search=casio`
`GET /api/products/:id`
`POST /api/products`
`GET /api/health`

### Agregar un producto externamente (HU-07)

Desde la aplicación, abre **Productos** y selecciona **Nuevo producto**. También puedes registrarlo externamente mediante la API:

Envía una petición `POST` a `http://localhost:4000/api/products` con un cuerpo JSON como este:

```json
{
  "name": "PRX Powermatic 80",
  "brand": "Tissot",
  "description": "Reloj automático con brazalete integrado.",
  "price": 3299900,
  "image": "https://ejemplo.com/reloj.jpg",
  "available": true
}
```

Los campos `name`, `brand`, `description`, `price` e `image` son obligatorios. `available` es opcional y su valor predeterminado es `true`. Una creación exitosa devuelve HTTP `201` y el producto guardado.

## Nota
Las imágenes del seed son URLs externas de Unsplash. Para producción deben reemplazarse por imágenes oficiales entregadas por XERO.
