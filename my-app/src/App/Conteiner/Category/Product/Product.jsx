import "./Product.css"

export default function Product ({name, price}){
    return(
        <>
            <li className="name">{name}</li>
            <li className="price">{price.toFixed(2)}</li>
        </>
    );
}
