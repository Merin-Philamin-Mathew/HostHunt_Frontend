import { Edit, Trash2 } from "lucide-react"

// We'll create basic versions of the components to replace the shadcn/ui components


import { Card,CardContent,CardHeader, CardTitle } from "../Card"
const Button = ({ variant = "default", size = "default", className, children, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  }
  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-xl px-3",
    lg: "h-11 rounded-xl px-8",
    icon: "h-10 w-10"
  }
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function RoomActionCard({ id, room_name, booking_amount_choice,no_of_rooms }) {
  return (
    <Card className="w-full max-w-sm bg-white">
      <CardHeader>
        <CardTitle>{room_name}</CardTitle>
      </CardHeader>
      <CardContent>
  <div className="flex justify-between">
    <div>
        <p className="text-sm text-muted-foreground"> {booking_amount_choice}</p>
        <p className="text-sm text-muted-foreground"> {no_of_rooms}</p>
    </div>
    
    <div className="flex items-end gap-2">
      <Button variant="outline" size="icon" aria-label="Edit">
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Delete">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  </div>
</CardContent>

    </Card>
  )
}


RoomActionCard.defaultProps = {
  id: "1",
  room_name: "Deluxe Suite",
  booking_amount_choice: "$200"
}