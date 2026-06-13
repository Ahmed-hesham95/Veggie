import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';

const SellerLogin = () => {
    const {isSeller , setisSeller , navigate} = useAppContext();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setisSeller(true);
    };
    useEffect(()=>{
        if(isSeller){
            navigate("/seller");
        }
    }, [isSeller]);
  return !isSeller && (
    <form 
    className='min-h-screen flex items-center text-sm text-gray-600'
    onSubmit={onSubmitHandler}>
        <div className='felx flex-col gap-5 m-auto items-start p-8 py-12
        min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
            <p className='text-2xl font-medium m-auto'>
                <span className='text-primary'>Seller</span> 
                Login
            </p>
            <div className='w-full'>
                <p>Email:</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email}
                type="email" placeholder='enter your email...'
                required
                className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'/>
            </div>
            <div className='w-full'>
                <p>Password :</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password}
                type="password" placeholder='enter your password...'
                required
                className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'/>
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer mt-5'>
                Login
            </button>
        </div>
    </form>
  )
}

export default SellerLogin