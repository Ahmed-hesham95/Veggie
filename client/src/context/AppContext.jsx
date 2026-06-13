import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import  toast  from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user,setuser] = useState(null);
    const [isSeller,setisSeller] = useState(false);
    const [showUserLogin,setshowUserLogin] = useState(false);
    const [Products,setProducts] = useState([]);

    const [cartItems,setcartItems] = useState({});
    const [searchQuery,setsearchQuery] = useState({});


    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setcartItems(cartData);
        toast.success("Item added to cart");
    }

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setcartItems(cartData);
        toast.success("Cart updated");
    }

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
        cartData[itemId] -= 1;
        if(cartData[itemId] === 0){
            delete cartData[itemId];
        }
    }
    toast.success("Item removed from cart");
    setcartItems(cartData);
    }

    // Get Cart items count
    const getCartCount = () => {
        let totalcount = 0;
        for(const item in cartItems){
            totalcount += cartItems[item];
        }
        return totalcount;
    }

    // Get Cart total price
    const getCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
        let itemInfo = Products.find((product) => product._id === item);
        if(cartItems[item] > 0){
            totalAmount += itemInfo.offerPrice * cartItems[item];
        }
    } 
    return Math.floor(totalAmount * 100) / 100;
}       
    useEffect(()=>{
        fetchProducts();
    },[])

    const value = {
        navigate,
        user,
        setuser,
        setisSeller,
        isSeller,
        showUserLogin,
        setshowUserLogin,
        Products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setsearchQuery,
        getCartAmount,
        getCartCount
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}