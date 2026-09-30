import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {Plus} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import {getProducts} from '../services/api';

export default function Products({search}){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');

  useEffect(()=>{
    const controller=new AbortController();

    async function loadProducts(){
      setLoading(true);
      setError('');
      try{
        const products=await getProducts(search,{signal:controller.signal});
        if(!controller.signal.aborted)setItems(products);
      }catch(error){
        if(error.name!=='AbortError')setError(error.message);
      }finally{
        if(!controller.signal.aborted)setLoading(false);
      }
    }

    loadProducts();
    return ()=>controller.abort();
  },[search]);

  return <main className="catalog">
    <div className="cataloghead">
      <div>
        <p className="eyebrow">COLECCIÓN XERO</p>
        <h1>Relojes</h1>
      </div>
      <div className="catalogactions">
        <p>{items.length} productos</p>
        <Link className="btn addproduct" to="/productos/nuevo"><Plus size={16}/> Nuevo producto</Link>
      </div>
    </div>
    {loading
      ? <div className="state">Cargando colección...</div>
      : error
        ? <div className="state">{error}. Verifica que el servidor esté activo.</div>
        : items.length===0
          ? <div className="state">No encontramos relojes para “{search}”.</div>
          : <div className="grid">{items.map(p=><ProductCard key={p.id} p={p}/>)}</div>}
  </main>;
}
