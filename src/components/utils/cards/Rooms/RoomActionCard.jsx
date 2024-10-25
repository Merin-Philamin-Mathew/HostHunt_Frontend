import { Edit, Trash2 } from "lucide-react"

// We'll create basic versions of the components to replace the shadcn/ui components
const Card = ({ className, children }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children }) => <div className="flex flex-col space-y-1.5 px-6 py-4">{children}</div>
const CardTitle = ({ children }) => <h3 className="text-lg font-semibold leading-none tracking-tight">{children}</h3>
const CardContent = ({ children }) => <div className="px-6 pb-2 pt-0">{children}</div>
const CardFooter = ({ className, children }) => <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>

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

export default function RoomActionCard({ id, room_name, booking_amount_choice }) {
  return (
    <Card className="w-full max-w-sm bg-white">
      <CardHeader>
        <CardTitle>{room_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">{booking_amount_choice}</p>
            <div>
            <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
            </Button>
            <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
            </Button>
            </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button variant="outline" size="icon">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardFooter> */}
    </Card>
  )
}

// Default props
RoomActionCard.defaultProps = {
  id: "1",
  room_name: "Deluxe Suite",
  booking_amount_choice: "$200"
}