
import './App.css'
import Conteiner from './Conteiner/Conteiner'


function App() {
  const categorias = [
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
  ];

  return (
    <div className="contenedor">
      <Conteiner categorias={categorias}/>
    </div>
  )
}

export default App
