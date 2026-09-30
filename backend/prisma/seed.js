import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const products = [
 {name:'Pro Diver Automatic',brand:'Invicta',description:'Reloj automático de estilo deportivo con caja de acero y esfera negra.',price:689900,image:'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'},
 {name:'Classic Chronograph',brand:'Casio',description:'Cronógrafo clásico, resistente y versátil para uso diario.',price:429900,image:'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85'},
 {name:'Garrison',brand:'Timex',description:'Diseño elegante con correa de cuero y una estética atemporal.',price:559900,image:'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85'},
 {name:'Grant',brand:'Fossil',description:'Reloj de vestir con acabado sofisticado y cronógrafo integrado.',price:799900,image:'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=85'},
 {name:'Le Locle',brand:'Tissot',description:'Pieza suiza de inspiración clásica, pensada para ocasiones especiales.',price:2199900,image:'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=85'},
 {name:'Presage Cocktail',brand:'Seiko',description:'Esfera de gran profundidad visual y movimiento automático japonés.',price:1899900,image:'https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=900&q=85'}
];
await prisma.product.deleteMany(); await prisma.product.createMany({data:products}); console.log('Productos cargados:', products.length); await prisma.$disconnect();
