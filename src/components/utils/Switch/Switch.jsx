import React, { useState } from 'react'

const Switch = React.forwardRef(({ className, onToggle, ...props }, ref) => {
  const [isChecked, setIsChecked] = useState(false)

  const toggleSwitch = () => {
    const newCheckedState = !isChecked
    setIsChecked(newCheckedState)
    if (onToggle) onToggle(newCheckedState) // Call parent callback with the new state
  }

  return (
    <div
      className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
        isChecked ? 'bg-red-800' : 'bg-slate-600'
      } ${className}`}
      onClick={toggleSwitch}
      data-state={isChecked ? 'checked' : 'unchecked'}
      {...props}
      ref={ref}
    >
      <div
        className={`pointer-events-none block h-5 w-5 rounded-full  shadow-xl ring-0 transition-transform ${
          isChecked ? 'translate-x-5 bg-red-400' : 'translate-x-0 bg-slate-400'
        }`}
      />
    </div>
  )
})

export default Switch
