import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button } from '@mui/material';
import { savePaymentMethod } from '../slice/cartSlice'

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { shippingAddress } = useSelector(state => state.cart)
    
    
    useEffect(() => { 

        if (shippingAddress === null) {
            navigate('/shipping')
        }

    },[shippingAddress,navigate])
    
    const submitHandler = (e) =>
    {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    
    console.log(paymentMethod);
	return (
		<div className='h-[100vh]'>
			<CheckoutSteps
				step1
				step2
				step3
			/>
			<h1 className="text-3xl text-gray-500 text-center mb-3 mt-10  ">Payment Method</h1>
			<form
				className="flex flex-col items-center"
				onSubmit={submitHandler}
			>
				<div className='flex flex-col gap-2'>
					<label className="">Select Method</label>
					<div className="">
						<input
							className="my-2"
							type="radio"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						/>
						<label>PayPal or Credit Card</label>
					</div>
					<div>
						<button className="bg-blue-500 text-white p-2 rounded-lg">
							Continue
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PaymentPage;
