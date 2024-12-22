import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    User,
    DropdownSection,
  } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../../redux/userSlice";


  export default function ProfileIcon_dropDown({classname}) {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch()
const navigate = useNavigate()

const handleDropdownAction = (key) => {
  switch (key) {
    case "account":
      navigate("/account");
      break;
    case "listings":
      navigate("/host/listings");
      break;
    case "logout":
      dispatch(logoutUser());
      navigate("/");
      break;
    default:
      console.log("Unknown action");
  }
};
  

    return (
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-end">
        <DropdownTrigger>
        {user?.profileIcon ? (
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={user.profileIcon}
            alt="User Profile"
          />
        ) : (
          <div className={`w-10 h-10 ${classname} rounded-full flex items-center justify-center cursor-pointer`}>
            <span className="">
              {user?.data?.name?.charAt(0).toUpperCase() || user?.data?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </DropdownTrigger>
          <DropdownMenu
            onAction={(key) => handleDropdownAction(key)} // Action handler

        aria-label="Custom item styles"
        className="p-3"
        disabledKeys={["profile"]}
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection showDivider aria-label="Profile & Actions">
          <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100">
            <User
              avatarProps={{
                size: "sm",
                // src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              description={user.data.email}
              name={user.data.name}
            />
          </DropdownItem>
          <DropdownItem key="account">Account</DropdownItem>
          <DropdownItem key="listings">Manage Listings</DropdownItem>
        </DropdownSection>


        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout">Log Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
  