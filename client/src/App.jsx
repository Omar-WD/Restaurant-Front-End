import "./App.css";
import Categories from "./components/categories/Categories";
import ProductsList from "./components/productsList/ProductsList";
import ProductForm from "./components/productForm/ProductForm";
import CategoryForm from "./components/categoryForm/CategoryForm";
import OrderProduct from "./components/productOrdering/OrderProduct";
import CheckoutList from "./components/checkoutList/CheckoutList";
import BackofficeOrderList from "./components/backofficeOrderList/backofficeOrderList";
import BottomBar from "./components/bottomBar/BottomBar";
import CategoriesBar from "./components/categoriesBar/CategoriesBar";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import { useContext } from "react";
import { OrderContext } from "./context/OrderProvider";


function App() {
  const { isLoading } = useContext(OrderContext);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App    ">
      <CategoriesBar />
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/products/:categoryID" element={<ProductsList />} />
        <Route path="/addProduct/:categoryID" element={<ProductForm />} />
        <Route path="/addCategory" element={<CategoryForm />} />
        <Route path="/orderProducts/:productId" element={<OrderProduct />} />
        <Route path="/checkout" element={<CheckoutList />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoutes/>} >
        <Route path="/ordersList" element={<BackofficeOrderList />} />
        </Route>
        <Route path="*" element={<Categories />} />
      </Routes>
      <BottomBar />
    </div>
  );
}

export default App;
