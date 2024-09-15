import React, { useContext, useEffect, useRef, useState } from "react";
import CartTable from "./CartTable";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { baseurl, userdata, setcart, cart,total,settotal } = useContext(MainContext);
  const [grandtotal, setgrandtotal] = useState(0);
  const [shippingfee, setshippingfee] = useState(100);
  const [showshipForm, setshowshipForm] = useState(false);
  const navigate= useNavigate()
  
  // function to handel click outside of form
  const formref= useRef(null)
  const handelClickOutside=(e)=>{
     if(!formref.current.contains(e.target)){
        setshowshipForm(false)
     }
  }

  // function to calculte totalprice
  const calculateTotal = () => {
    const gtotal = cart.reduce((acc, curval) => {
      const actualprice = (
        curval.product?.price -
        (curval.product?.price * curval.product?.discount) / 100
      ).toFixed(0);
      const tPrice = curval.quantity * actualprice;
      return tPrice + acc;
    }, 0);
    setgrandtotal(gtotal);
    settotal(gtotal + shippingfee);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);
  // function to get cart
  const getCart = () => {
    axios
      .get(`${baseurl}/api/cart/${userdata._id}`)
      .then((result) => {
        console.log(result);
        setcart(result.data.cart.items);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response ? err.response.data.message : "something went wrong"
        );
      });
  };

  useEffect(() => {
    if (userdata) {
      getCart();
    }
  }, [userdata]);
  return (
    <>
      <div
        className={` bg-blue-500 text-white py-10 px-2 flex flex-col gap-2 items-center ${
          showshipForm ? "h-[79vh]" : "min-h-screen"
        }`}
      >
        {cart.length < 1 ? (
          <div className="flex flex-col items-center w-full pt-10 gap-2">
            <b className="text-xl">No items in cart</b>
            <Link to="/products">
              <button className="bg-violet-800 py-1 px-2 rounded text-white">
                Shop now
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-end">
            <CartTable cart={cart} setcart={setcart} />
            <div className="w-[250px] bg-white text-black rounded-lg flex flex-col gap-2 p-2">
              <p>
                Grand Total: <b>${grandtotal}</b>
              </p>
              <p>
                Shipping fee: <b>${shippingfee}</b>
              </p>
              <div className="w-full bg-gray-600 h-[2px]"></div>
              <p>
                Total Price: <b>${total}</b>
              </p>
              <button className="bg-violet-800 py-1 px-2 rounded text-white" onClick={()=> setshowshipForm(true)}>
                Pay now
              </button>
            </div>
          </div>
        )}
      </div>

      {showshipForm && (
        <section className="glass2 h-screen absolute top-0 w-full text-black flex justify-center items-center" onClick={handelClickOutside}>
          <div className="flex flex-col gap-2 bg-white w-[300px] p-2 rounded-lg" ref={formref}>
            <label htmlFor="city">City</label>
            <input
              className="text-black border-2 border-gray-500 rounded-lg px-2 py-1 outline-none"
              readOnly
              placeholder="City"
              type="text"
              value={userdata?.address.city}
            />
            <label htmlFor="nearby">Nearby</label>
            <input
              className="text-black border-2 border-gray-500 rounded-lg px-2 py-1 outline-none"
              readOnly
              placeholder="Nearby"
              type="text"
              value={userdata?.address.nearby}
            />
            <label htmlFor="state">State</label>
            <input
              className="text-black border-2 border-gray-500 rounded-lg px-2 py-1 outline-none"
              readOnly
              placeholder="State"
              type="text"
              value={userdata?.address.state}
            />
            <button className="py-1 px-2 bg-violet-800 text-white rounded w-fit" onClick={()=> navigate('/checkout')}>
              Confirm Address
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
