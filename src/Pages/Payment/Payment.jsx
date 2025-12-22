import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaCreditCard, FaLock, FaArrowLeft } from 'react-icons/fa';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here');

// Payment Form 
const PaymentForm = ({ contest, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
    const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
  const queryClient = useQueryClient();
  const [processing, setProcessing] = useState(false);

  const paymentMutation = useMutation({
    mutationFn: async (paymentIntentId) => {
      return await axiosSecure.post('/confirm-payment', {
          contestId: contest._id,
        paymentIntentId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contest', contest._id]);
        queryClient.invalidateQueries(['contests']);
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
<<<<<<< HEAD
        text: 'You are now registered for thi contest',
=======
        text: 'You are now registered for this contest',
>>>>>>> 5b1652f (Update project files with Stripe integration and fixes)
        confirmButtonColor: '#14b8a6',
      });
      navigate(`/contests/${contest._id}`);
    },
    onError: (err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
          title: 'Payment Failed',
        text: err.response?.data?.message || 'Something went wrong',
        confirmButtonColor: '#14b8a6',
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: user?.name || user?.displayName || 'User',
          email: user?.email,
        },
      },
    });

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.message,
        confirmButtonColor: '#14b8a6',
      });
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      paymentMutation.mutate(paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card bg-base-100 shadow-lg p-6">
        <div className="mb-4">
             <h3 className="text-lg font-semibold mb-2">Card Details</h3>
          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <CardElement
              options={{
                style: {
                  base: {
                      fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
             <div className="flex justify-between items-center">
            <span className="text-gray-700">Contest Entry Fee:</span>
            <span className="text-2xl font-bold text-teal-600">${contest.price}</span>
             </div>
        </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <FaLock />
          <span>Your payment is secure and encrypted</span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(`/contests/${contest._id}`)}
            className="btn btn-outline flex-1"
          >
            <FaArrowLeft /> Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || processing || paymentMutation.isPending}
            className="btn btn-primary flex-1"
          >
            {processing || paymentMutation.isPending ? (
              'Processing...'
            ) : (
              <>
                <FaCreditCard /> Pay ${contest.price}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

// Main Payment Component
const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch contest details
  const { data: contest, isLoading } = useQuery({
    queryKey: ['contest', id],
    queryFn: async () => {
      const res = await axiosSecure.get('/contests');
      return res.data.find(c => c._id === id);
    },
    enabled: !!id,
  });

  // Create payment intent
  const { data: paymentData, isLoading: loadingPayment, error: paymentError } = useQuery({
    queryKey: ['payment-intent', id],
    queryFn: async () => {
      const res = await axiosSecure.post('/create-payment-intent', {
        price: contest.price,
        contestId: id,
      });
      return res.data;
    },
    enabled: !!contest && !!user,
    retry: false, // Don't retry on error, show message immediately
  });

  if (isLoading || loadingPayment) {
    return (
      <div className="p-4 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4">Loading payment...</p>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="p-4 text-center">
        <p>Contest not found</p>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/contests')}>
          Go Back
        </button>
      </div>
    );
  }

  if (paymentError) {
    return (
      <div className="p-4 text-center max-w-md mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-red-600 justify-center">Payment Error</h2>
            <p className="text-gray-700">
              {paymentError.response?.data?.message || paymentError.message || 'Unable to initialize payment'}
            </p>
            {paymentError.response?.data?.code === 'amount_too_large' && (
              <div className="alert alert-warning mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>For large transactions, please contact our support team.</span>
              </div>
            )}
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={() => navigate(`/contests/${id}`)}>
                <FaArrowLeft /> Back to Contest
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentData?.clientSecret) {
    return (
      <div className="p-4 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4">Initializing payment...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(`/contests/${id}`)}
          className="btn btn-ghost btn-sm mb-4"
        >
          <FaArrowLeft /> Back to Contest
        </button>
           <h1 className="text-3xl font-bold text-teal-600 mb-2">Complete Payment</h1>
        <p className="text-gray-600">Register for: <span className="font-semibold">{contest.name}</span></p>
      </div>

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex items-center gap-4 mb-4">
            <img src={contest.image} alt={contest.name} className="w-24 h-24 object-cover rounded-lg" />
              <div>
              <h3 className="text-xl font-bold">{contest.name}</h3>
                <p className="text-gray-600">Entry Fee: <span className="font-bold text-teal-600">${contest.price}</span></p>
              <p className="text-gray-600">Prize: <span className="font-bold text-green-600">${contest.prizeMoney}</span></p>
            </div>
          </div>
        </div>
      </div>

      <Elements stripe={stripePromise}>
        <PaymentForm contest={contest} clientSecret={paymentData.clientSecret} />
      </Elements>

      {/* Test Card Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-2">Test Card (Stripe Test Mode):</p>
          <p className="text-xs text-blue-800">Card: 4242 4242 4242 4242</p>
        <p className="text-xs text-blue-800">Expiry: Any future date | CVC: Any 3 digits</p>
      </div>
    </div>
  );
};

export default Payment;

