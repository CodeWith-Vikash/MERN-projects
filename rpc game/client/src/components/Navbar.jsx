import React, { useContext, useEffect, useState } from 'react';
import { TbLogout2 } from "react-icons/tb";
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify'

const Navbar = () => {
    const { pathname } = useLocation();
    const [showicon, setShowIcon] = useState(false);
    const [showanimation, setShowAnimation] = useState(false);
    const arr = ['/signup', '/login'];
    const { token, userdata, getToken, getUserdata } = useContext(MainContext);

    // Logout function
    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('userdata');
        getToken();
        getUserdata();
        setShowAnimation(false)
        setTimeout(() => {
            toast.warning('user logged out')
        }, 500);
    };

    useEffect(() => {
        const shouldShowLogoutIcon = token && !arr.includes(pathname);
        setShowIcon(shouldShowLogoutIcon);
    }, [pathname, token]);

    return (
        <div className='absolute text-white top-0 w-full'>
            <nav className='flex justify-end p-4 relative'>
                {showicon && (
                    <TbLogout2 
                        size={'2.3rem'} 
                        className='cursor-pointer' 
                        onClick={() => setShowAnimation(!showanimation)} 
                    />
                )}
                
                <motion.section
                    initial={{ x: '-200px', y: '-120px', opacity: 0 }}
                    animate={showanimation 
                        ? { x: '-4px', y: '40px', opacity: 1 }
                        : { x: '-200px', y: '-120px', opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: 'easeInOut'
                    }}
                    className='bg-white text-black w-[170px] rounded-lg flex flex-col gap-2 p-2 items-center absolute z-[999]'
                >
                    <div className='flex items-center gap-2'>
                        <img src={userdata?.avatar} alt="avatar" className='h-10 w-10 object-cover rounded-full' />
                        <p className='font-semibold'>{userdata?.username}</p>
                    </div>
                    <button className='text-sm py-1 px-2 rounded-lg lbtn border-2 text-white' onClick={logout}>
                        Logout
                    </button>
                </motion.section>
            </nav>
        </div>
    );
};

export default Navbar;
