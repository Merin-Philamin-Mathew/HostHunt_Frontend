import React from 'react'

function Container({ children }) {
  return (
    <div className='mx-auto lessThan404 max-w-[1440px] px-10 '>
      {children}
    </div>
  )
}

export default Container