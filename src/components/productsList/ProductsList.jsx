import { useContext, useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { IoLogoEuro } from "react-icons/io5";
import "./ProductsList.css";
import { OrderContext } from "../../context/OrderProvider";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  const { categoryID } = useParams();
  const navigate = useNavigate();
  const { user,isLoading,setIsLoading } = useContext(OrderContext);
  useEffect(() => {
    axiosClient
      .get(`/products/category/${categoryID}`)
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [categoryID,setIsLoading]);

  if (!isLoading ) {

  const fileredProducts = products.filter(
    (product) => product.category._id === categoryID
  );
  const productCategory = products.length > 0 ? products[0].category.name : "";

  return (
    <div className="px-6">
      <h1 className=" text-3xl text-amber-900 font-bold font-serif my-5">{productCategory}</h1>
      <div className="productsList w-full min-h-80 flex flex-row flex-wrap justify-around align-middle">
        {fileredProducts.map((product) => (
          <div
            className="productDiv mb-10  bg-yellow-200 shadow-2xl shadow-yellow-950  rounded-2xl"
            key={product._id}
            onClick={() => navigate(`/orderProducts/${product._id}`)}
          >
            <div className="productImgContainer">
              <img
                className="productImg w-full h-6/7 object-cover rounded-t-2xl"
                src={product.image}
                alt={product.name}
              />
            </div>
            <h3 className="productName w-full text-red-600 text-2xl font-bold pt-4">
              {product.name}
            </h3>
            <h3 className="productPrice w-full text-yellow-900 text-2xl font-bold pb-4 flex items-center justify-center align-middle text-center justify-items-center">
              <span className="mr-2 pt-[3px] text-lg">
                <IoLogoEuro />
              </span>
              {product.price}
            </h3>
          </div>
        ))}
        {user && <NavLink to={"/addProduct/${categoryID}"} className={`w-full ${products.length >0?"":"mt-14"}  h-96 flex items-center justify-center  bg-yellow-200  shadow-2xl shadow-neutral-950  rounded-2xl`}>
          <MdAddCircle className="addButton size-12 text-red-900" />
        </NavLink>}
      </div>
    </div>
  );
        }
}
