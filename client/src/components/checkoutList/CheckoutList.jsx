import { useContext, useEffect, useState } from "react";
import { IoLogoEuro } from "react-icons/io5";
import { OrderContext } from "../../context/OrderProvider";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";

export default function CheckoutList() {
  const {
    orderList,
    setOrderList,
    setShowPopup,
    showPopup,
    currentLocation,
    setCurrentLocation,
  } = useContext(OrderContext);

  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  };
  useEffect(() => {
    if (currentLocation){
      setOrderList((prevOrderList) => {
        return prevOrderList.map((order) => {
          return { ...order, currentLocation: currentLocation };
        });
      });
    }
  }, [currentLocation,  setOrderList]);

  useEffect(() => {
    const lineAmount = orderList.map((product) => {
      return (
        (product.product.price +
          (product.options
            ? product.options.reduce((acc, option) => acc + option.price, 0)
            : 0)) *
        product.quantity
      );
    });

    const t = lineAmount.reduce((acc, amount) => {
      return acc + amount;
    }, 0);
    setTotalAmount(t);
  }, [orderList]);

  const handleupdateQuantity = (e, index) => {
    const newOrderList = [...orderList];
    if(e.target.value === '0' && newOrderList.length === 1){
      //check if the user is sure from his decision
      if(window.confirm('Are you sure you want to remove this product from the order list?')){
        newOrderList.splice(index, 1);
      setOrderList(newOrderList);
      navigate("/");
      return;
      }else{
      e.target.value = 1;
      }
    } else if(e.target.value === '0' && newOrderList.length >= 1){
      if(window.confirm('Are you sure you want to remove this product from the order list?')){

      newOrderList.splice(index, 1);
      setOrderList(newOrderList);
      return;
      }
    }
    newOrderList[index].quantity = e.target.value;

    setOrderList(newOrderList);
  };

  const handleChangeRemarks = (e) => {
    setOrderList((prevOrderList) => {
      return prevOrderList.map((order) => {
        return { ...order, orderRemark: e.target.value };
      });
    });
  };

  const handleSubmitOrderList = () => {
    axiosClient
      .post("/orderList", { order: orderList })
      .then(() => {
        sessionStorage.setItem("orderList", JSON.stringify([]));
        setOrderList([]);
        setCurrentLocation({});
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-red-600 bg-white bg-opacity-85 font-semibold p-4 py-20 ">
      <h1 className="font-extrabold text-2xl mb-5">checkoutList</h1>
      {orderList.length > 0 &&
        orderList.map((product, index) => (
          <div key={index} className="py-3">
            <div className="flex justify-between">
              <div className="flex items-center  text-left text-lg ">
                *
                <select
                  className=" overflow-scroll"
                  value={product.quantity}
                  onChange={() => handleupdateQuantity(event, index)}
                >
                  {[...Array(10)].map((_, index) => (
                    <option key={index } value={index }>
                      {index }
                    </option>
                  ))}
                </select>
                {product.product.name}{" "}
                {product.options.length > 0 ? (
                  <span className="flex items-center ">
                    :{""}
                    <IoLogoEuro className="text-sm" />{" "}
                    <span>{product.product.price}</span>
                  </span>
                ) : (
                  ""
                )}
              </div>
              <h1 className="flex items-center w-[4rem] justify-between text-left text-lg">
                <IoLogoEuro className="text-sm" />
                {(
                  (product.product.price +
                    (product.options
                      ? product.options.reduce(
                          (acc, option) => acc + option.price,
                          0
                        )
                      : 0)) *
                  product.quantity
                ).toFixed(2)}
              </h1>
            </div>
            <h6 className="flex text-left text-sm text-zinc-800 pl-5 mt-[-5px]">
              {product.options &&
                product.options.map((option, index) => (
                  <div key={option._id} className="flex ">
                    <p className="flex">
                      {index !== 0 && <span> + </span>}
                      <span>{option.name}</span>
                      {option.price > 0 && (
                        <span className="flex items-center">
                          : <IoLogoEuro className="text-xs" />
                          <span>{option.price}</span>
                        </span>
                      )}
                    </p>
                  </div>
                ))}
            </h6>
          </div>
        ))}
      <div className="flex flex-col items-end mt-10">
        <h1 className="flex items-center justify-between gap-6">
          <span className="font-bold">Netto:</span>{" "}
          <span className="flex items-center justify-between w-[4rem]">
            <IoLogoEuro className="text-sm" /> {(totalAmount / 1.19).toFixed(2)}
          </span>{" "}
        </h1>
        <h1 className="flex items-center justify-between gap-6">
          <span className="font-bold">19%:</span>{" "}
          <span className="flex items-center justify-between w-[4rem]">
            <IoLogoEuro className="text-sm" />{" "}
            {((totalAmount / 1.19) * 0.19).toFixed(2)}
          </span>{" "}
        </h1>
        <h1 className="flex items-center justify-between gap-6">
          <span className="font-bold">Brutto:</span>{" "}
          <span className="flex items-center justify-between w-[4rem]">
            <IoLogoEuro className="text-sm" /> {totalAmount.toFixed(2)}
          </span>{" "}
        </h1>
      </div>
      <div className="my-10">
        <textarea
          name="orderRemark"
          placeholder="Remarks"
          id="orderRemark"
          cols="35"
          rows="2"
          value={orderList.length > 0 ? orderList[0].orderRemark : ''}
          onChange={handleChangeRemarks}
          className=" shadow-2xl border-2 p-2"
        ></textarea>
        <button
          className="w-[160px] inline-flex justify-center items-center  py-1 px-5 rounded-3xl text-white bg-red-600"
          onClick={getLocation}
        >
          Share Location
        </button>
      </div>
      <div className="flex flex-row items-center justify-between">
        <button
          className="w-[160px] h-[50px] inline-flex justify-center items-center  rounded-3xl text-white bg-red-600"
          onClick={() => navigate("/")}
        >
          Order More <MdAddCircle className="ml-2 size-6" />{" "}
        </button>
        <button
  disabled={
    orderList.length === 0 ||
    (currentLocation !== null &&
      Object.keys(orderList[0].currentLocation).length === 0)
  }
  className="disabled:opacity-50 w-[160px] inline-flex justify-center items-center py-3 px-2 rounded-3xl text-white bg-red-600"
  onClick={handleSubmitOrderList}
>
  Submit <FaArrowRightToBracket className="ml-2 size-6" />
</button>

      </div>
      {showPopup && (
        <div className="h-[100vh] w-[100vw] fixed top-0 left-0  bg-white text-lime-600 flex flex-col gap-14 items-center justify-center px-6 z-50">
          <h1>
            Thank you for your order! Your purchase has been successfully
            placed.
          </h1>
          <GiCheckMark className=" size-16" />
        </div>
      )}
    </div>
  );
}
