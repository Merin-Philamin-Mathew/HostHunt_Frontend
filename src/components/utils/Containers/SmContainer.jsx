import React from 'react'

function SmContainer({ children }) {
  return (
    <div className='mx-auto lessThan404 px-1 md:px-10'>
      {children}
    </div>
  )
}

export default SmContainer
