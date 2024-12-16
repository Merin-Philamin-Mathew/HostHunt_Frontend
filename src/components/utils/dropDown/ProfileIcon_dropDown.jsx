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


  export default function ProfileIcon_dropDown() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch()
const navigate = useNavigate()

const handleDropdownAction = (key) => {
  switch (key) {
    case "dashboard":
      navigate("/dashboard");
      break;
    case "settings":
      navigate("/settings");
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
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
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
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
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
  