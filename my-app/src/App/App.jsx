
import { useState } from 'react';
import './App.css'
import Conteiner from './Conteiner/Conteiner'


function App() {
  
  const [categorias, setCategorias] = useState([
    {
      category: "coffee",
      imagen: "https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg",
      product: [
        { name: "French Vanilla", price: 3.00 },
        { name: "Caramel Macchiato", price: 3.75 },
        { name: "Pumpkin Spice", price: 3.50 },
        { name: "Hazelnut", price: 4.00 },
        { name: "Mocha", price: 4.50 }
      ]
    },
    {
      category: "desserts",
      imagen: "https://cdn.freecodecamp.org/curriculum/css-cafe/pie.jpg",
      product: [
        { name: "Donut", price: 1.50 },
        { name: "Cherry Pie", price: 2.75 },
        { name: "Cheesecake", price: 3.00 },
        { name: "Cinnamon Roll", price: 2.50 }
      ]
    }
  ]);
    //Generador de id
    const genId = () => Date.now() + Math.floor(Math.random() * 1000);

  function addCategoria({category, imagen}){
    const newCat = {
      id: genId(),
      category,
      imagen,
      product:[],
    };
    setCategorias((prev) => [...prev, newCat]);
  }

  function editCategoria(id, newName){
    setCategorias ((prev) => 
      prev.map((cat) => 
        (cat.id === id ? {...cat, category: newName} : cat)));
  }

  function deleteCategoria (id, options = { force: false}){
    const cat = categorias.find((c) => c.id === id);
    if(!cat) return;
    if(cat.product.length > 0 && !options.force){
      return { blocked: true, count: cat.product.length };
    }
    setCategorias((prev) => prev.filter((c) => c.id !== id));
    return{delete: true};
  }

  function addProducto(catId, { name, price }) {
    setCategorias((prev) =>
      prev.map((c) =>
        c.id === catId
          ? {
              ...c,
              product: [...c.product, { id: genId(), name, price: Number(price) }],
            }
          : c
      )
    );
  }

  function editProducto(catId, prodId, newData) {
    setCategorias((prev) =>
      prev.map((c) =>
        c.id === catId
          ? {
              ...c,
              product: c.product.map((p) =>
                p.id === prodId ? { ...p, ...newData } : p
              ),
            }
          : c
      )
    );
  }

  function deleteProducto(catId, prodId) {
    setCategorias((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, product: c.product.filter((p) => p.id !== prodId) }
          : c
      )
    );
  }

  return (
    <div className="contenedor">
      <Conteiner 
        categorias={categorias}
        onAddCategoria={addCategoria}
        onEditCategoria={editCategoria}
        onDeleteCategoria={deleteCategoria}
        onAddProducto={addProducto}
        onEditProducto={editProducto}
        onDeleteProducto={deleteProducto}
      />
    </div>
  )
}

export default App
