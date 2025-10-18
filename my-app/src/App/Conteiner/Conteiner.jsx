import './Conteiner.css'
import Header from './Header/Header'
import Spacer from './Spacer/Spacer'
import Category from './Category/Category'
import Footer from './Footer/Footer'

export default function Conteiner( {categorias} ){
    return(
        <>
            <Header/>
            <Spacer/>
            {categorias.map((cat) => (
                <Category
                    category={cat.category}
                    imagen={cat.imagen}
                    product={cat.product}
                />
            ))}
            <Spacer/>
            <Footer/>
        </>
    );
}

