import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orderList, setOrderList] = useState([]);
  const [orderListTotal, setOrderListTotal] = useState(0);
  const [backofficeOrderList, setBackofficeOrderList] = useState([]);
  const [navbarDisplay, setNavbarDisplay] = useState("none");
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axiosClient
        .get("/users/profile")
        .then((res) => {
          setUser(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setUser(null);
          setIsLoading(false);
          console.log(err);
        });
    }

    if (!user) {
      setIsLoading(false);
    }

  }, [user]);

  const signin = (data) => {
    axiosClient
      .post("/users/signin", data)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
          setIsLoading(false);
        console.log(err);
      });
  };
  const signup = (data) => {
    axiosClient
      .post("/users/signup", data)
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);        
        navigate("/");
      })
      .catch((err) => {
          setIsLoading(false);
        console.log('err',err);
      });
  };

  const signout=()=>{
    axiosClient
    .post('/users/signout')
    .then(()=>{
      setUser(null)
      setIsLoading(false);
      navigate('/signin')
    })
    .catch((err)=>{
      setIsLoading(false);
      console.log(err);
    })
  }

  useEffect(() => {
    const orderListFromSessionStorage =
      JSON.parse(sessionStorage.getItem("orderList")) || [];
    setOrderList(orderListFromSessionStorage);
  }, []);

  useEffect(() => {
    const totalProductPrice= orderList.reduce((acc, product) => acc + product.product.price + (product.options ? product.options.reduce((acc, option) => acc + option.price, 0) : 0), 0);
    setOrderListTotal(totalProductPrice);
  }, [orderList]);


  

  useEffect(() => {
    sessionStorage.setItem("orderList", JSON.stringify(orderList));
  }, [orderList]);
  
 

  
  useEffect(() => {
    axiosClient
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);


  

  useEffect(() => {
    if (orderList.length > 0) {
      setNavbarDisplay("flex");
    } else {
      setNavbarDisplay("none");
    }
  }, [orderList]);



  
  useEffect(() => {
    if(user){
      axiosClient
      .get("/orderlist")
      .then((response) => {
        setBackofficeOrderList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setBackofficeOrderList([]);
        setIsLoading(false);
        console.log(error);
      });
    }
    if(!user){
      setIsLoading(false);
    }
  }, [user]);


  
 

  return (
    <OrderContext.Provider
      value={{ orderList, setOrderList, backofficeOrderList, navbarDisplay,orderListTotal,categories, setCategories,user,setUser,signin,signup,signout,isLoading, setIsLoading,showPopup, setShowPopup,setCurrentLocation,currentLocation }}
    >
      {children}
    </OrderContext.Provider>
  );
}

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
