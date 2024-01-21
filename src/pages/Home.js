import { div } from "prelude-ls";
import Navbar from "../features/navbar/Navbar"
import Product from '../features/product/components/Product.js'
import { Link } from "react-router-dom";

function Home() {
    return ( 
        <div>
            <Navbar>
                <Product></Product>
            </Navbar>
            <Link to='/admin'>admin</Link>
        </div>
     );
}

export default Home;