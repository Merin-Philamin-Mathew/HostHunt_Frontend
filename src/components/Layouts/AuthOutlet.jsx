import React from 'react'

function AuthOutlet({children}) {
  return (
    <div
    className="relative min-h-screen bg-cover bg-center"
    style={{
      backgroundImage: "url('/pro_own/auth_bg.jpg')"
    }}
  >
    <div className="absolute inset-0 bg-[#717171] bg-opacity-35  z-0"></div>
    <div className="relative z-10 flex justify-center items-center min-h-screen">
      {children}
    </div>
  </div>
  )
}

export default AuthOutlet
