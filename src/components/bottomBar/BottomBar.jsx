import { useContext } from "react";
import { OrderContext } from "../../context/OrderProvider";
import { IoLogoEuro } from "react-icons/io5";
import {FaArrowRightToBracket, FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function BottomBar() {
  const { orderList, navbarDisplay, orderListTotal } = useContext(OrderContext);
  const navigate = useNavigate();

  return (
    <div
      style={{ display: navbarDisplay }}
      className="fixed bottom-0 left-0 w-screen h-14 bg-amber-500 text-white flex flex-row flex-nowrap justify-between items-center  p-2 z-[5] "
    >
      <span className="flex items-center w-1/6">
        <span className="bg-amber-800 rounded-full flex size-5 justify-center  items-center   text-[0.65rem] ">
          {orderList.length}
        </span>{" "}
        <FaCartShopping className=" size-8" />
      </span>
      <span className="flex w-5/6 justify-around items-center" onClick={()=>navigate("/checkout")}>
      <span className="flex flex-col h-full justify-around w-4/6">
        <span >To the basket</span>
        <span className="flex flex-row justify-center items-center">
          <IoLogoEuro />
          {orderListTotal.toFixed(2)}
        </span>
      </span>
      
        <FaArrowRightToBracket className=" size-8 w-1/6" />
      </span>
      
    </div>
  );
}
