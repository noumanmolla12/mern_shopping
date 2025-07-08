import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Product Components
import AddProducts from './components/products/AddProducts';
import ViewProducts from './components/products/ViewProducts';
import EditProduct from './components/products/EditProduct';

// Category Components
import AddCategories from './components/categories/AddCategories';
import ViewCategories from './components/categories/ViewCategories';
import EditCategories from './components/categories/EditCategories';

// Blog Components
import AddBlogs from './components/blogs/AddBlogs';
import ViewBlogs from './components/blogs/ViewBlogs';
import EditBlog from './components/blogs/EditBlog';

// Admin Management
import AddAdmin from './components/admin/AddAdmin';
import ViewAdmin from './components/admin/ViewAdmin';
import EditAdmin from './components/admin/EditAdmin';

// Admin Auth
import AdminLogin from './components/authadmin/AdminLogin';
import AdminDashboard from './components/authadmin/AdminDashboard';

// User Management (Optional/Future)
import AddUser from './components/users/AddUser';
import ViewUser from './components/users/ViewUser';
import EditUser from './components/users/EditUser';

// Auth Protection
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ===== Public Routes ===== */}
          <Route path="/" element={<AdminLogin />} />
          <Route path="/addadmin" element={<AddAdmin />} />
          <Route path="/adminlogin" element={<adminLogin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />

          {/* ===== Protected Admin Routes ===== */}
          <Route
            path="/admindashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          >
            {/* Default nested route when only /admindashboard is visited */}
            <Route index element={<div>Please select an option from sidebar.</div>} />

            {/* Admin Management */}
            <Route path="viewadmin" element={<ViewAdmin />} />
            <Route path="editadmin/:id" element={<EditAdmin />} />

            {/* Category Routes */}
            <Route path="addcategories" element={<AddCategories />} />
            <Route path="viewcategories" element={<ViewCategories />} />
            <Route path="edit-category/:categoryId" element={<EditCategories />} />

            {/* Product Routes */}
            <Route path="addproducts" element={<AddProducts />} />
            <Route path="viewproducts" element={<ViewProducts />} />
            <Route path="edit-product/:productId" element={<EditProduct />} />

            {/* Blog Routes */}
            <Route path="addblogs" element={<AddBlogs />} />
            <Route path="viewblogs" element={<ViewBlogs />} />
            <Route path="edit-blog/:blogId" element={<EditBlog />} />
            <Route path="single-blog/:blogId" element={<EditBlog />} />
            {/* Product Routes */}
            <Route path="adduser" element={<AddUser />} />
            <Route path="viewuser" element={<ViewUser />} />
            <Route path="edituser/:id" element={<EditUser />} />
          </Route>

          {/* ===== Optional: Future User Routes (Uncomment to activate) ===== */}
          
          {/* <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/userdashboard" element={<UserDashboard />} /> */}

        

          {/* ===== Catch-All or 404 Page ===== */}
          {/* <Route path="*" element={<AdminLogin />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
