import React, { useState } from 'react'
import { api } from '../apis/axios';

function StripeTrial({stripePromise}) {

    const [loading,setLoading] = useState('')
    const [error,setError] = useState('')
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
        console.log('lfsdjfosdjfosdf');
        
        const response = await api.post('property/create_payment/')

        const { clientSecret } = await response.data

        console.log(clientSecret, 'secretttt', response.data)
        
        const stripe = await stripePromise;
        console.log(clientSecret, 'secretttt', stripe)
        const { error, success } = await stripe.redirectToCheckout({sessionId:response.data.id});
        
    } catch (err) {
        setError("Something went wrong!");
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <div>
        <button className='bg-green-400 p-9'
        onClick={handleSubmit}>
            stripe</button>
    </div>
    </div>
  )
}

export default StripeTrial
