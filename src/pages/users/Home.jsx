import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const userDetails = useSelector((state)=>
    state.user.userDetails
  )
  return (
    <div>
       <h1>User Details:</h1>
      {userDetails ? (
        <div>{JSON.stringify(userDetails)}</div> // Display user details as a string
      ) : (
        <p>No user details available</p>
      )}
    </div>
  )
}

export default Home
