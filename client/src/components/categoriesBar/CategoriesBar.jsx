import { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderProvider";
import { useNavigate } from "react-router-dom";
import { MdArrowRight,MdArrowLeft } from "react-icons/md";

export default function CategoriesBar() {
  const { categories, user, isLoading, signout } = useContext(OrderContext);
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);
  const btnstyle = "bg-white text-amber-800 py-1 px-3 rounded-3xl";

  const handleMoveLeft = () => {
    setPosition((prevPosition) => Math.max(prevPosition - 1, 0));
  };

  const handleMoveRight = () => {
    setPosition((prevPosition) =>
      Math.min(prevPosition + 1, categories.length - 1)
    );
  };

  if (!isLoading && user) {
    return (
      <div className="flex h-[5rem] flex-col justify-between pt-1 pb-2  w-full font-extrabold text-white bg-amber-500 ">
        <h1 className="text-white ">Welcome {user.name} !</h1>
        <div className="flex justify-around">
          <button className={btnstyle} onClick={() => navigate("/categories")}>
            Home
          </button>{" "}
          <button
            className={btnstyle}
            onClick={() => navigate("/ordersList")}
          >
            OrdersList
          </button>{" "}
          <button className={btnstyle} onClick={signout}>
            SignOut
          </button>
        </div>
      </div>
    );
  }

  if (!isLoading && !user) {
    return (
      <div className="h-[5rem] flex flex-row justify-between items-center  pt-1 pb-2  w-screen font-extrabold text-white bg-amber-500 ">
        <span className="w-1/12 text-center contents " onClick={handleMoveLeft}>
          <MdArrowLeft className="size-12" />
        </span>
        <span className="w-9/12 flex  align-middle  overflow-hidden  ">
          {categories &&
            categories.slice(position, position + 3).map((category, index) => (
              <button
                key={index}
                className="w-full px-3 overflow-hidden text-nowrap "
                onClick={() => navigate(`/products/${category._id}`)}
              >
                {category.name}
              </button>
            ))}
        </span>
        <span className="w-1/12 text-center contents" onClick={handleMoveRight}>
          <MdArrowRight className="size-12 " />
        </span>
      </div>
    );
  }
}
