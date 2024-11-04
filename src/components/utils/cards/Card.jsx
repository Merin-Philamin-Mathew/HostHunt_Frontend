import React from 'react';

const Card = ({ className, children }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, variant, className }) => (
  <div className={`flex flex-col space-y-1.5 ${
      variant === 'p-6' ? 'p-6' :
      variant === 'adding_form_admin_slate' ? 'text-slate-400 font-bold text-lg' :
      'px-6 py-4'
    } ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className ? className : 'text-lg'}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className }) => (
  <div className={`px-6 pb-2 pt-0 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ className, children }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
