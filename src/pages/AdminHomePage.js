 
// import AdminProductDetail from "../features/admin/component/AdminProductDetail";
import AdminProductList from "../features/admin/component/AdminProductList";
import NavBar from "../features/navbar/Navbar";

function AdminHome() {
    return ( 
        <div>
            <NavBar>
                <AdminProductList></AdminProductList>
            </NavBar>
        </div>
     );
}

export default AdminHome;