import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Service from "./pages/service/Service";
import Categorycards from "./pages/category/Categorycards";
import Account from "./pages/account/Account";
import AddService from "./pages/addService/AddService";
import Admin from "./pages/admin/Admin";
import AddCategory from "./pages/admin/pages/addCategory";
import AdminCategories from "./pages/admin/pages/categories";
import AdminServices from "./pages/admin/pages/services";
import AdminUsers from "./pages/admin/pages/user";
import AdminTopServices from "./pages/admin/pages/topService";
import AdminServicesRequests from "./pages/admin/pages/serviceRequest";
import EditCategory from "./pages/admin/pages/EditCategory";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<Categorycards />} />
            <Route path="/service/:id" element={<Service />} />
            <Route path="/accounts/:id" element={<Account />} />
            <Route path="/addService" element={<AddService />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<Admin />} />
            <Route path="/admin/addCategory" element={<AddCategory />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/topServices" element={<AdminTopServices />} />
            <Route path="/admin/editCategory/:id" element={<EditCategory />} />
            <Route
                path="/admin/servicesRequests"
                element={<AdminServicesRequests />}
            />
        </Routes>
    );
}

export default App;
