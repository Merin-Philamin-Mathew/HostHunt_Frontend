import React from 'react'

const Tabs = ({ children, className }) => (
    <div className={`w-full ${className}`}>{children}</div>
)

const TabsList = ({ children, variant, className }) => (
    <button className={`${variant === 'adminSlider' ? 'bg-slate-700 p-1 mb-1 rounded-lg' : 'bg-slate-500 p-1 mb-1 rounded-lg'} ${className}`}>
        {children}
    </button>
)

const TabsTrigger = ({ children, isActive, variant = 'default', size, className, onClick }) => (
    <button 
        className={`px-4 py-2 ${
            variant === 'default' ? `${isActive ? 'bg-slate-700 text-white' : 'bg-slate-500 text-slate-100'} rounded-lg transition-colors hover:bg-slate-600` :
            variant === 'adminSlider' ? `${isActive ? 'bg-slate-500 text-white' : 'bg-slate-700 text-slate-100'} rounded-lg transition-colors hover:bg-slate-600` :
            variant === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' :
            variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' :
            variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' :
            variant === 'link' ? 'text-primary underline-offset-4 hover:underline' : ''
        } ${
            size === 'default' ? 'h-10 px-4 py-2' :
            size === 'sm' ? 'h-9 rounded-md px-3' :
            size === 'lg' ? 'h-11 rounded-md px-8' :
            size === 'icon' ? 'h-10 w-10' : ''
        } ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
)

const TabsContent = ({ children, variant, className }) => (
    <div className={`${variant === 'adminSlider' ? 'px-4 py-3 bg-slate-700 rounded-lg text-slate-300' : ''} ${className}`}>
        {children}
    </div>
)

export { Tabs, TabsList, TabsTrigger, TabsContent }
