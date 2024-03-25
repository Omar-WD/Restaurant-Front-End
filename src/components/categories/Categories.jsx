import { NavLink } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import "./Categories.css";
import { OrderContext } from "../../context/OrderProvider";
import { useContext } from "react";

export default function Categories() {
  const { categories,user} = useContext(OrderContext);

  return (
    <div className="px-6 py-4">
      <h1 className=" text-3xl text-amber-900 font-bold font-serif my-5">
        Categories
      </h1>
      <div className="categoriesList w-full min-h-80 flex flex-row flex-wrap justify-around align-middle ">
        {categories && categories.map((category) => {
            return (
              <NavLink
                className="categoryDev mb-10  bg-yellow-200 shadow-2xl shadow-neutral-950  rounded-2xl"
                style={{ textDecoration: "none" }}
                to={`/products/${category._id}`}
                key={category._id}
              >
                <img
                  className="categoryImg w-full h-6/7 object-cover rounded-t-2xl"
                  src={category.image}
                  alt={category.name}
                />
                <h2 className="categoryName w-full text-red-900 text-2xl font-bold py-4">
                  {category.name}
                </h2>
              </NavLink>
            );
          })}
          {user && 
        <NavLink to={"/addCategory"} className="w-full h-96 flex items-center justify-center  bg-yellow-200  shadow-2xl shadow-neutral-950  rounded-2xl">
          <MdAddCircle className="addButton size-12 text-red-900" />
        </NavLink>}
      </div>
    </div>
  );
}
