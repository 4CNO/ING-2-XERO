import {useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {getProduct} from '../services/api';

export default function ProductDetail(){
  const {id}=useParams();
  const [product,setProduct]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');

  useEffect(()=>{
    const controller=new AbortController();

    async function loadProduct(){
      setLoading(true);
      setError('');
      setProduct(null);
      try{
        const foundProduct=await getProduct(id,{signal:controller.signal});
        if(!controller.signal.aborted)setProduct(foundProduct);
      }catch(error){
        if(error.name!=='AbortError')setError(error.message);
      }finally{
        if(!controller.signal.aborted)setLoading(false);
      }
    }

    loadProduct();
    return ()=>controller.abort();
  },[id]);

  if(loading)return <main className="state">Cargando producto...</main>;
  if(error)return <main className="state"><p>{error}</p><Link className="btn" to="/productos">Volver al catálogo</Link></main>;
  if(!product)return null;

  return <main className="detailpage">
    <Link to="/productos" className="back">← Volver al catálogo</Link>
    <div className="productdetail">
      <img src={product.image} alt={product.name}/>
      <div>
        <p className="eyebrow">{product.brand}</p>
        <h1>{product.name}</h1>
        <p className="bigprice">${Number(product.price).toLocaleString('es-CO')}</p>
        <p className="description">{product.description}</p>
        <p className={product.available?'available':'unavailable'}>{product.available?'● Disponible':'● Agotado'}</p>
      </div>
    </div>
  </main>;
}
