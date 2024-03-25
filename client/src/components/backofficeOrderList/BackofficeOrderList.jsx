import { useContext } from "react";
import { OrderContext } from "../../context/OrderProvider";
import { IoLogoEuro } from "react-icons/io5";

export default function BackofficeOrderList() {
  const { backofficeOrderList } = useContext(OrderContext);
  

  const calculateNetto = (order) => {
    const productTotal = order.orders.reduce(
      (acc, product) => acc + product.product.price * product.product.quantity,
      0
    );
    const optionsTotal = order.orders.reduce(
      (acc, product) =>
        acc +
        product.options.reduce(
          (optionAcc, option) =>
            optionAcc + option.price * product.product.quantity,
          0
        ),
      0
    );
    return productTotal + optionsTotal;
  };


  return (
    <div className=" bg-amber-900 text-black w-screen  py-20">
      <div className="text-white font-extrabold text-3xl pb-3">Orders List</div>
      {backofficeOrderList &&
        backofficeOrderList.map((order, index) => (
          <details
            key={index}
            className="w-9/12 my-5 p-3 font-semibold bg-white mx-auto rounded-3xl  "
          >
            <summary className="font-bold">order {index + 1}</summary>

            {/* Order details */}
            {order &&
              order.orders &&
              order.orders.length > 0 &&
              order.orders.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full justify-between py-3"
                >
                  <div className="flex w-full gap-3 justify-between">
                    <span className="inline-flex items-center w-9/12">
                      {product.product.quantity}x {product.product.name}
                    </span>
                    <span className="inline-flex items-center w-3/12">
                      <IoLogoEuro className="text-xs min-w-[1rem] " />
                      {(
                        product.product.price * product.product.quantity
                      ).toFixed(2)}
                    </span>
                  </div>

                  {/* Options */}
                  <div className=" inline-flex  justify-between text-left ml-2 text-sm font-normal gap-3 ">
                    <div className=" w-9/12">
                      {product.options.map((option, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center text-zinc-900 "
                        >
                          +{option.name}
                          {option.price > 0 && (
                            <>
                              :
                              <IoLogoEuro className="text-xs" />
                              {option.price}
                            </>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Options total */}
                    <span className="inline-flex items-center text-base font-semibold  w-3/12 gap-1  ">
                      {product.options &&
                        product.options.reduce(
                          (acc, option) => acc + option.price,
                          0
                        ) > 0 && (
                          <>
                            <IoLogoEuro className=" text-xs " />
                            {(
                              product.options.reduce(
                                (acc, option) => acc + option.price,
                                0
                              ) * product.product.quantity
                            ).toFixed(2)}
                          </>
                        )}
                    </span>
                  </div>
                </div>
              ))}

            {/* Netto, Tax, and Brutto */}
            <div className="flex flex-col items-end mt-10">
              <h1 className="flex items-center justify-between gap-6">
                <span className="font-bold">Netto:</span>{" "}
                <span className="flex items-center w-[4rem]">
                  <IoLogoEuro className="text-xs" />{" "}
                  {calculateNetto(order).toFixed(2)}
                </span>
              </h1>
              <h1 className="flex items-center justify-between gap-6">
                <span className="font-bold">19%:</span>{" "}
                <span className="flex items-center w-[4rem]">
                  <IoLogoEuro className="text-xs" />{" "}
                  {(calculateNetto(order) * 0.19).toFixed(2)}
                </span>{" "}
              </h1>
              <h1 className="flex items-center justify-between gap-6">
                <span className="font-bold">Brutto:</span>{" "}
                <span className="flex items-center w-[4rem]">
                  <IoLogoEuro className="text-xs" />{" "}
                  {(calculateNetto(order) * 1.19).toFixed(2)}
                </span>{" "}
              </h1>
            </div>

            {order &&
              order.orders &&
              order.orders.length > 0 &&
              order.orders[0] &&
              order.orders[0].orderRemark &&
              Object.keys(order.orders[0].orderRemark).length !== 0 && (
                <p className="text-red-600 py-12 w-full text-left" ><span className="text-red-600">Remark: </span>{order.orders[0].orderRemark}</p>
              )}
              {order &&order.orders.length > 0 &&
              order.orders[0] && order.orders[0].currentLocation && Object.keys(order.orders[0].currentLocation).length !== 0 && (
                <a href={`https://www.google.com/maps?q=${order.orders[0].currentLocation.lat},${order.orders[0].currentLocation.lon}`} target="-blank" rel="noopener noreferre">Location</a>
              )
              }
          </details>
        ))}
    </div>
  );
}
