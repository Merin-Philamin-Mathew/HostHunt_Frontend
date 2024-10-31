import React from "react"

const Label = (({ className, ...props }, ref) => (
    <label ref={ref} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props} />
  ))

const Form = ({ className, ...props }) => (
    <form className={className} {...props} />
  )
  
  const FormField = ({ name, ...props }) => (
    <div {...props} />
  )
  
  const FormItem = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={`space-y-2 ${className}`} {...props} />
  ))
  
  const FormLabel = (({ className, ...props }, ref) => (
    <Label ref={ref} className={className} {...props} />
  ))
  
  const FormControl = React.forwardRef(({ ...props }, ref) => (
    <div ref={ref} className="mt-2" {...props} />
  ))

  export {Form, FormControl, FormField, FormLabel, Label,FormItem}
