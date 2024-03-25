import axiosClient from "../../axiosClient";
import { useContext,useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderContext } from "../../context/OrderProvider";
import { IoLogoEuro } from "react-icons/io5";

export default function OrderProduct() {
  const [product, setProduct] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { productId } = useParams();
  const { orderList, setOrderList,isLoading,currentLocation } = useContext(OrderContext);

  

  useEffect(() => {
    if (!productId) return;
    axiosClient
    .get(`/products/${productId}`)
    .then((response) => {
      setProduct(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [productId]);

  
  
  const handleCheckboxChange = (option) => {
    const index = selectedOptions.indexOf(option);
    const optionPrice=option.price || 0;
    if (index === -1) {
      setSelectedOptions([...selectedOptions, option]);
      setTotalPrice(totalPrice + optionPrice);
    } else {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions.splice(index, 1);
      setSelectedOptions(newSelectedOptions);
      setTotalPrice(totalPrice - option.price);
    }
  };

  const handleAddToOrderList = () => {
    const orderRemark = document.querySelector(".orderRemarkTextArea").value;
    const newOrder = { product, quantity: 1, remark: orderRemark || "", options: selectedOptions, currentLocation:currentLocation };
    const existingOrderList = orderList || [];
    const updatedOrderList = [...existingOrderList, newOrder];
    setOrderList(updatedOrderList);
    document.querySelector(".orderRemarkTextArea").value = "";
  };


  if (!isLoading){
  return (
    <div className="flex flex-col w-full items-center px-6 my-5 pt-10">
      <div className="h-2/5 w-auto rounded-full overflow-hidden aspect-auto shadow-2xl shadow-yellow-950">
        <img className="h-full w-full" src={product.image} alt={product.name}/>
      </div>
      <div className="min-h-2/5 my-5 bg-yellow-200 rounded-lg shadow-2xl shadow-yellow-950">
        <h2 className="text-lg font-bold py-6 text-red-600">{product.name}</h2>
        <p className="text-xs px-4 text-justify text-amber-950">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ratione fugiat, ad non explicabo
          voluptates officia.
        </p>
        {product.options && (
          <div className="flex flex-col w-1/2 p-4">
            {product.options.map((option, index) => (
              <div key={index} className="flex flex-row justify-between align-middle">
                <input
                  type="checkbox"
                  className="w-1/12"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <h1 className="w-1/2 font-bold text-amber-950">{option.name}</h1>
                {option.price && (
                  <h1 className="w-1/4 text-amber-950">
                    <IoLogoEuro />
                    {option.price}
                  </h1>
                )}
              </div>
            ))}
          </div>
        )}

        <textarea className="orderRemarkTextArea hidden w-full h-20 p-4 " placeholder="Add a remark"></textarea>
        <div className="flex flex-row w-full py-6 px-4 justify-between align-middle">
          <h1 className="flex flex-row justify-center items-center w-1/2">
            <span className="font-bold text-lg text-red-600">Price :</span>
            <span className="pl-3 pr-1 text-sm text-red-600">
              <IoLogoEuro />
            </span>
            <span className="text-lg font-bold text-red-600">{(Number(product.price) || 0) + (Number(totalPrice) || 0)}</span>
          </h1>
          <button className="w-1/2 bg-red-600 rounded-2xl" onClick={handleAddToOrderList}>
            Add to Chart
          </button>
        </div>
      </div>
    </div>
  );
  }
}
