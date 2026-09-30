import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom';
import Header from './components/Header';
import AppErrorBoundary from './components/AppErrorBoundary';
import Home from './pages/Home';
import Products from './pages/Products';
import NewProduct from './pages/NewProduct';
import ProductDetail from './pages/ProductDetail';
import './styles.css';

function App(){
  const [search,setSearch]=useState('');
  const location=useLocation();
  return <>
    <Header search={search} setSearch={setSearch}/>
    <AppErrorBoundary resetKey={location.pathname}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/productos" element={<Products search={search}/>}/>
        <Route path="/productos/nuevo" element={<NewProduct/>}/>
        <Route path="/productos/:id" element={<ProductDetail/>}/>
        <Route path="*" element={<Home/>}/>
      </Routes>
    </AppErrorBoundary>
    <footer>© 2026 XERO — PRISMO</footer>
  </>;
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
