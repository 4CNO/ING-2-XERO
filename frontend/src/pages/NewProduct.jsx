import {useEffect,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {createProduct} from '../services/api';

const defaultImage='https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85';

const initialForm={
  name:'',
  brand:'',
  description:'',
  price:'',
  image:'',
  available:true,
};

export default function NewProduct(){
  const [form,setForm]=useState(initialForm);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState('');
  const [fieldErrors,setFieldErrors]=useState({});
  const [imageState,setImageState]=useState('fallback');
  const navigate=useNavigate();

  const hasCustomImage=Boolean(form.image.trim());
  const previewImage=imageState==='error'?defaultImage:(form.image.trim()||defaultImage);

  useEffect(()=>{
    setImageState(form.image.trim()?'loading':'fallback');
  },[form.image]);

  function updateField(event){
    const {name,value,type,checked}=event.target;
    setForm(current=>({...current,[name]:type==='checkbox'?checked:value}));
    setFieldErrors(current=>({...current,[name]:''}));
  }

  function validate(){
    const errors={};
    if(!form.name.trim())errors.name='Escribe el nombre del producto.';
    if(!form.brand.trim())errors.brand='Escribe la marca.';
    if(!form.description.trim())errors.description='Agrega una descripción.';
    if(!form.price||Number(form.price)<=0)errors.price='Ingresa un precio mayor que cero.';
    if(form.image.trim()&&!/^https?:\/\//i.test(form.image.trim())){
      errors.image='Usa una dirección que comience por http:// o https://.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length===0;
  }

  async function handleSubmit(event){
    event.preventDefault();
    if(!validate()){
      setError('Revisa los campos marcados antes de continuar.');
      return;
    }
    setSaving(true);
    setError('');
    try{
      const product=await createProduct({
        ...form,
        image:form.image.trim()||defaultImage,
        price:Number(form.price),
      });
      navigate(`/productos/${product.id}`);
    }catch(err){
      setError(err.message);
    }finally{
      setSaving(false);
    }
  }

  return <main className="formpage">
    <Link to="/productos" className="back">← Volver al catálogo</Link>
    <div className="formintro">
      <p className="eyebrow">GESTIÓN DE CATÁLOGO</p>
      <h1>Nuevo producto</h1>
      <p>Agrega un reloj a la colección. Al guardarlo aparecerá inmediatamente en el catálogo.</p>
    </div>
    <form className="productform" onSubmit={handleSubmit} noValidate>
      <div className="formlayout">
        <div className="formfields">
          <div className="formgrid">
            <label>
              Nombre del producto
              <input name="name" value={form.name} onChange={updateField} aria-invalid={Boolean(fieldErrors.name)} placeholder="Ej. PRX Powermatic 80"/>
              {fieldErrors.name&&<span className="fielderror">{fieldErrors.name}</span>}
            </label>
            <label>
              Marca
              <input name="brand" value={form.brand} onChange={updateField} aria-invalid={Boolean(fieldErrors.brand)} placeholder="Ej. Tissot"/>
              {fieldErrors.brand&&<span className="fielderror">{fieldErrors.brand}</span>}
            </label>
            <label>
              Precio
              <input name="price" value={form.price} onChange={updateField} aria-invalid={Boolean(fieldErrors.price)} type="number" min="1" step="0.01" placeholder="3299900"/>
              {fieldErrors.price&&<span className="fielderror">{fieldErrors.price}</span>}
            </label>
            <label>
              URL de la imagen (opcional)
              <input name="image" value={form.image} onChange={updateField} aria-invalid={Boolean(fieldErrors.image)} type="text" placeholder="https://ejemplo.com/reloj.jpg"/>
              {fieldErrors.image
                ? <span className="fielderror">{fieldErrors.image}</span>
                : <span className="fieldhint">Pega un enlace para comprobarlo antes de guardar.</span>}
            </label>
            <label className="fullwidth">
              Descripción
              <textarea name="description" value={form.description} onChange={updateField} aria-invalid={Boolean(fieldErrors.description)} rows="5" placeholder="Describe las características principales del reloj..."/>
              {fieldErrors.description&&<span className="fielderror">{fieldErrors.description}</span>}
            </label>
          </div>
          <label className="availabilitycheck">
            <input name="available" type="checkbox" checked={form.available} onChange={updateField}/>
            Producto disponible para la venta
          </label>
        </div>
        <aside className="imagepreview" aria-live="polite">
          <div className="previewheading">
            <p className="eyebrow">VISTA PREVIA</p>
            <span className={`previewbadge ${imageState}`}>{imageState==='loaded'?'Enlace válido':imageState==='error'?'Enlace no disponible':imageState==='loading'?'Verificando...':'Imagen predeterminada'}</span>
          </div>
          <div className="previewimage">
            <img
              src={previewImage}
              alt={form.name.trim()||'Vista previa del producto'}
              onLoad={()=>{
                if(imageState!=='error')setImageState(hasCustomImage?'loaded':'fallback');
              }}
              onError={()=>setImageState('error')}
            />
          </div>
          <p className="previewmessage">
            {imageState==='loaded'&&'La imagen cargó correctamente y se usará al crear el producto.'}
            {imageState==='loading'&&'Estamos comprobando que el enlace permita cargar la imagen.'}
            {imageState==='error'&&'No se pudo cargar esta imagen. Se usará la predeterminada hasta que ingreses otro enlace.'}
            {imageState==='fallback'&&'Puedes dejar la URL vacía: se usará esta imagen predeterminada.'}
          </p>
        </aside>
      </div>
      {error&&<p className="formerror" role="alert">{error}</p>}
      <div className="formactions">
        <Link to="/productos" className="cancelbtn">Cancelar</Link>
        <button className="btn" type="submit" disabled={saving}>{saving?'Guardando...':'Crear producto'}</button>
      </div>
    </form>
  </main>;
}
