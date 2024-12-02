import React from 'react';

// const Button = ({ variant = "default", size = "default", className, children, ...props }) => {
//   const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
//   const variantStyles = {
//     default: "bg-primary text-primary-foreground hover:bg-primary/90",
//     outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
//   }
//   const sizeStyles = {
//     default: "h-10 px-4 py-2",
//     sm: "h-9 rounded-xl px-3",
//     lg: "h-11 rounded-xl px-8",
//     icon: "h-10 w-10"
//   }
//   return (
//     <button
//       className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   )
// }

function Button({ icon = null, title, onClick, className }) {
  return (
    <div>
      <button 
        onClick={onClick}
        className={className ? className : "hover:bg-white border-2 border-gray-800 text-gray-800 font-bold py-2 px-8 rounded-xl inline-flex items-center whitespace-nowrap"}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {icon ? (
          <span className="hidden md:inline">{title}</span>
        ) : (
          <span>{title}</span>
        )}
      </button>
    </div>
  );
}

export default Button
