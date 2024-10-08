import React, { useContext, useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCartShopping, FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate=useNavigate()
  const [isFocus, setIsFocus] = useState(false);
  const [filteredArr, setfilteredArr] = useState(null)
  const [isnav, setisnav] = useState(false);
  const { token, userdata, getlocalUser, getAuthToken,cart,allproducts} =
    useContext(MainContext);
  const navref = useRef(null);

  // functionallity to close nav on route change
  const {pathname} = useLocation()
  useEffect(()=>{
    if(isnav){
      togglenav()
    }
  },[pathname])


  // function to serach product
  const searchProduct=(search)=>{
    if(!search=="" && !search==" "){
      const filteredprod = allproducts?.filter((prod)=> prod.name.includes(search) || prod.category.includes(search))
    setfilteredArr(filteredprod)
    }else{
      setfilteredArr(null)
    }
  }

  const togglenav = () => {
    if (isnav) {
      navref.current.style.transform = "translateX(100%)";
    } else {
      navref.current.style.transform = "translateX(0%)";
    }
    setisnav(!isnav);
  };

  // function to logout user
  const logout = () => {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    document.cookie = "userdata=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    getlocalUser()
    getAuthToken()
    toast.warning("user loggged out");
  };
  return (
    <>
      <nav className="bg-blue-500 px-2 md:px-4 h-[60px] text-white flex justify-between items-center">
        <Link to="/">
          <img
            src="/logo.png"
            className={`h-10 ${isFocus ? "hidden md:block" : ""}`}
          />
        </Link>

        <section className="flex items-center gap-2 md:gap-4">
          <div className="relative text-gray-900">
            <input
              type="text"
              placeholder="Search.."
              className={`outline-none border-none px-4 rounded-full w-[30vw] md:w-[250px] h-8 ${
                isFocus && "w-[95vw] md:w-[250px]"
              }`}
              onChange={(e) =>searchProduct(e.target.value)}
              //   onKeyDown={(e) => e.key === "Enter" && searchProduct()}
              onFocus={() => setIsFocus(true)}
              onBlur={() => {
                setTimeout(() => {
                  setIsFocus(false);
                }, 100);
              }}
            />
            <FaSearch
              size="1rem"
              className="absolute right-2 top-[50%] translate-y-[-50%]"
              //   onClick={searchProduct}
            />
          </div>
          <div
            className={`option flex items-center gap-4 ${
              isFocus ? "hidden md:flex" : ""
            }`}
          >
            <Link to='/products' className="md:block hidden">
             <button  className="py-1 px-2 border-2 hover:border-violet-800 hover:bg-violet-800 rounded-lg">Products</button>
            </Link>
            <Link to="/cart">
              <div className="relative">
                <FaCartShopping size="1.7rem" />
                {cart.length > 0 && <div className="h-4 min-w-4 w-fit rounded-full bg-violet-800 absolute top-[-4px] right-[-5px] flex justify-center items-center text-sm font-semibold p-1">
                  {cart.length}
                </div>}
              </div>
            </Link>
            {isnav ? (
              <FaXmark
                size="1.7rem"
                className="md:hidden cursor-pointer"
                onClick={togglenav}
              />
            ) : (
              <GiHamburgerMenu
                size="1.7rem"
                className="md:hidden cursor-pointer"
                onClick={togglenav}
              />
            )}
          </div>
          {token ? (
            <div className="hidden md:flex gap-4 items-center">
              {userdata?.email == "admin@techstuff.com" && <Link to='/admin'>
              <button className="py-1 px-2 bg-violet-800 rounded-lg">Dashboard</button>
            </Link>}
              <button
                className="border-2 py-1 px-4 rounded-full font-semibold hover:bg-red-700 hover:border-red-700"
                onClick={logout}
              >
                Logout
              </button>
              <Link to='/profile'>
              <img
                src={userdata?.avatar}
                className="h-10 w-10 rounded-full object-cover"
              />
              </Link>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className=" hidden md:block border-2 py-1 px-4 rounded-full font-semibold hover:bg-violet-700 hover:border-violet-700">
                Login
              </button>
            </Link>
          )}
        </section>
      </nav>
      {/* search val */}
      {<section className="absolute top-[60px] bg-white text-black w-full flex flex-col gap-1 z-[10]">
         {filteredArr?.map((prod)=>{
           return <div className="flex gap-2 items-center hover:bg-gray-300 p-2 cursor-pointer" onClick={()=>{
            setfilteredArr(null)
            navigate(`/product/${prod._id}`)
           }}>
            <img src={prod.image} className="h-10 w-10 object-contain"/>
            <p className="">{prod.name}</p>
           </div>
         })}
        </section>}
     
     {/* sidenav */}
      <section
        className="glass flex justify-center text-white h-[90vh] w-full absolute pt-10 z-[999]"
        ref={navref}
      >
         <div className="flex flex-col gap-2 items-center">
         <Link to='/products'>
             <button  className="py-1 px-2 border-2 hover:border-violet-800 hover:bg-violet-800 rounded-lg">Products</button>
            </Link>
        {token ? (
          <div className="flex flex-col gap-4 items-center">
            <Link to={'/profile'}>
            <div className="flex items-center gap-1">
              <img
                src={userdata?.avatar}
                className="h-10 w-10 rounded-full object-cover"
              />
              <p className="font-semibold">{userdata?.username}</p>
            </div>
            </Link>
            
            {userdata?.email == "admin@techstuff.com" && <Link to='/admin'>
              <button className="py-1 px-2 bg-violet-800 rounded-lg">Dashboard</button>
            </Link>}
            <button
              className="border-2 py-1 px-4 rounded-full font-semibold hover:bg-red-700 hover:border-red-700"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="border-2 py-1 px-4 rounded-full font-semibold hover:bg-violet-700 hover:border-violet-700">
              Login
            </button>
          </Link>
        )}
         </div>
      </section>
    </>
  );
};

export default Navbar;
