import './Category.css'
import Product from './Product/Product'

export default function Category({ category, imagen, product }) {
  return (
    <main className='main-category'>

      <h2 className='h2-category'>{category.toUpperCase()}</h2>

      <img src={imagen} alt={category} width="50"/>
      <ul>
        {product.map((p) => (
          <Product
            name={p.name}
            price={p.price}
          />
       ))}
      </ul>
    </main>
  )
}