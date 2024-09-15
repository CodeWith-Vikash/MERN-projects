import React, { useState, useEffect, useContext } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { MainContext } from '../context/MainContext';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaFortAwesome } from "react-icons/fa";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [success, setsuccess] = useState(false)
  const { baseurl,total,userdata,setcart,settotal,cart } = useContext(MainContext);
  const navigate = useNavigate()


  // function to update stock
  const updateStock=(id,action,quantity)=>{
    axios.patch(`${baseurl}/api/product/stock/${id}`,{action:action,quantity}).then((result)=>{
      console.log(result)
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response?err.response.data.message:'something went wrong')
    })
  }

  const handlestock=()=>{
    cart.forEach(async (item)=>{
       await updateStock(item.product._id,'order',item.quantity)
    })
  }
  // fuction to clear cart
  const  clearCart=()=>{
    axios.delete(`${baseurl}/api/cart/clear/${userdata._id}`).then((result)=>{
      console.log(result)
       setcart(result.data.cart.items)
       settotal(0)
       setsuccess(true)
       setTimeout(() => {
         navigate('/cart')
       },2000);
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response?err.response.data.message:'something went wrong')
    })
  }

  // function to place order
  const palaceOrder=()=>{
    axios.post(`${baseurl}/api/order/${userdata._id}`,{items:cart,totalprice:total}).then(async(result)=>{
      console.log(result)
      toast.success(result.data.message)
      await handlestock()
      clearCart()
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response?err.response.data.message:'something went wrong')
    })
  }

  // Fetch clientSecret when component mounts
  useEffect(() => {
    fetch(`${baseurl}/api/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: total, currency: 'usd' }) // Example: 50 USD
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret); // Store the clientSecret from backend
      })
      .catch((error) => {
        console.error('Error fetching clientSecret:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(userdata){
      if (!stripe || !elements || !clientSecret) {
        return;
      }
  
      setIsLoading(true);
  
      const cardElement = elements.getElement(CardNumberElement);
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: userdata.username, // Replace this with the name from your form input
          },
        },
      });
  
      if (error) {
        setError(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        palaceOrder()
      }
  
      setIsLoading(false);
    }else{
       toast.warning('no userdata avilable try again')
    }
  };

  // Custom styles for Stripe elements
  const ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <div className='bg-blue-500 flex justify-center items-center h-screen'>
      {success?
        <div className='w-[300px] h-[200px] bg-white rounded-lg flex flex-col justify-center items-center gap-1'>
          <FaCheckCircle size={'2rem'} className='text-green-500'/>
          <p className='text-green-500 text-xl font-semibold'>Payment successful</p>
        </div>
      :
      <form onSubmit={handleSubmit} className='w-[300px] bg-white p-2 rounded-lg flex flex-col gap-2'>
      <label className='flex flex-col gap-1'>
        Card Number
        <div className='border-2 border-gray-600 p-2 rounded-lg'>
          <CardNumberElement options={ELEMENT_OPTIONS} />
        </div>
      </label>

      <label className='flex flex-col gap-1'>
        Expiration Date
        <div className='border-2 border-gray-600 p-2 rounded-lg'>
          <CardExpiryElement options={ELEMENT_OPTIONS} />
        </div>
      </label>

      <label className='flex flex-col gap-1'>
        CVC
        <div className='border-2 border-gray-600 p-2 rounded-lg'>
          <CardCvcElement options={ELEMENT_OPTIONS} />
        </div>
      </label>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <button type="submit" disabled={isLoading || !stripe || !clientSecret} className='bg-green-500 text-white py-1 px-2 rounded w-fit'>
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
      }
    </div>
  );
};

export default CheckoutForm;
