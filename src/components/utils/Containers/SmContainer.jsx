import React from 'react'

function SmContainer({ children }) {
  return (
    <div className='mx-auto lessThan404 min-h-screen px-1 md:px-20'>
      {children}
    </div>
  )
}

export default SmContainer
