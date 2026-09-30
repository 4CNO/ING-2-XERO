const API='http://localhost:4000/api';

export async function getProducts(search='',{signal}={}){
  const r=await fetch(`${API}/products${search?`?search=${encodeURIComponent(search)}`:''}`,{signal});
  if(!r.ok)throw new Error('Error consultando productos');
  return r.json();
}

export async function getProduct(id,{signal}={}){
  const r=await fetch(`${API}/products/${id}`,{signal});
  if(!r.ok)throw new Error('Producto no encontrado');
  return r.json();
}
export async function createProduct(product){
  const r=await fetch(`${API}/products`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(product)
  });
  const data=await r.json();
  if(!r.ok)throw new Error(data.error||'No fue posible crear el producto');
  return data;
}
