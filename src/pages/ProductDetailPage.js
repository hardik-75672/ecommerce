import { div } from "prelude-ls";
import Navbar from "../features/navbar/Navbar"
import Product from '../features/product/components/Product.js'
import ProductDetail from "../features/product/components/ProductDetail.js";

function ProductDetailPage() {
    return ( 
        <div>
            <Navbar>
                <ProductDetail></ProductDetail>
            </Navbar>
        </div>
     );
}

export default ProductDetailPage;