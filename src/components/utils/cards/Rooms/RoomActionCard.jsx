import { Edit, Trash2 } from "lucide-react";
import NextPrevArrows from "../../ImageSlidder/NextPrevArrows";
import { deleteRooms } from "../../../../features/Property/PropertyActions";
import { useDispatch } from "react-redux";

// Custom Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

// Custom Button Component
const Button = ({ variant = "default", size = "default", className, children, ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };
  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-xl px-3",
    lg: "h-11 rounded-xl px-8",
    icon: "h-10 w-10",
  };
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default function RoomActionCard({
  id,
  room_name,
  no_of_rooms,
  room_images,
  monthly_rent,
  onDelete,
  onEdit
}) {

  const dispatch = useDispatch()

  return (
    <Card className="w-full">
      <div className="flex">
        {/* Image Section with Flowbite-style Carousel */}
        <NextPrevArrows room_images={room_images}/>
        {/* Content Section */}
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1">
            <h3 className="font-semibold" title={room_name}>
              {room_name}
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">Number of Rooms: {no_of_rooms}</p>
              <p className="text-sm text-gray-600">Monthly Rent: Rs.{monthly_rent}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="icon"
              aria-label="Edit"
              className="hover:bg-gray-100"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Delete"
              onClick={()=>deleteRooms(id, dispatch)}
              className="hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

RoomActionCard.defaultProps = {
  id: "1",
  room_name: "Deluxe Suite",
  no_of_rooms: 1,
  room_images: [],
  monthly_rent: "1000.00",
  onDelete: () => {},
  onEdit: () => {}
};