import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBuilding, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdNotifications, MdClose } from "react-icons/md";
import { handleDropdownAction, handleDropdownActionOwner } from '../../utils/logic';
import { navigatetoUserHome } from '../../../config/constant';
import { toast } from 'sonner';

import { format } from 'date-fns';

const NotificationBar = ({ messages, onClose }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return format(date, 'MMMM dd, yyyy, hh:mm a'); // Example: December 13, 2024, 07:33 AM
  };

  return (
    <div className="absolute right-0 w-80 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
      {/* Sticky Header */}
      <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
        <h3 className="text-lg font-semibold text-themeColor2li8">Notifications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <MdClose size={20} />
        </button>
      </div>

      {/* Notification Messages */}
      {messages && messages.length === 0 ? (
        <p className="p-4 text-gray-500">No new notifications</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="p-4 border-b hover:bg-gray-50">
            <p className="text-sm text-gray-800">{msg.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {formatDate(msg.timestamp)} {/* Formatted timestamp */}
            </p>
          </div>
        ))
      )}
    </div>
  );
};



const POHeader = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
  const [notificationBarOpen, setNotificationBarOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [pushNotification, setPushNotification] = useState([]);
  const user_id = user?.data.id

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/notifications/${user_id}/`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('notifications from the backend', data);
      if (data.message) {
        setPushNotification(data.message)
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: data.message,
            timestamp: data.timestamp,
            notification_type: data.notification_type,
          },
        ]);
        toast(data.message);
      } else {
        setMessages(data);
      }
    };

    socket.onclose = () => {
      console.error('WebSocket closed unexpectedly');
    };
    
    return () => socket.close();
  }, [user_id]);

  const dropdownItems = [
    { title: 'Manage account', icon: <FaUser/> },
    { title: 'Manage Listings', icon: <FaBuilding/> },
    { title: 'Sign out', icon: <FaSignOutAlt/>}
  ];

  const toggleDropdown = (event) => {
    const iconPosition = event.target.getBoundingClientRect();
    setDropdownPosition({
      left: iconPosition.right - 176,
      top: iconPosition.bottom + window.scrollY + 20,
    });
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNotificationBar = () => {
    setNotificationBarOpen(!notificationBarOpen);
  };

  return (
    <header className="w-full py-3 bg-themeColor2 shadow-xl shadow-white relative">
      <div className="flex justify-between items-center mx-auto lessThan404 px-6">
        <button className="flex items-center space-x-1" onClick={() => navigate(navigatetoUserHome)}>
          <img src="/logo/white_invert.png" className="w-10 bg-themeColor py-1 px-0 rounded-md" alt="Logo"/>
          <div className="text-2xl font-extrabold text-themeColor">HOSTHUNT</div>
        </button>
        <div className="flex items-center space-x-6 px-2">
          <div className='text-white text-2xl relative'>
            <button onClick={toggleNotificationBar}>
              <MdNotifications />
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 p-2  flex items-center justify-center">
                  {messages.length}
                </span>
              )}
            </button>
            {notificationBarOpen && (
              <NotificationBar messages={messages} onClose={() => setNotificationBarOpen(false)} />
            )}
          </div>
          {user ? (
            <div className="relative">
              <div onClick={toggleDropdown} className="flex items-center space-x-4 cursor-pointer">
                {user?.profilePic ? (
                  <img src={user.profilePic} alt="Profile" className="w-9 h-9 rounded-full" />
                ) : (
                  <button className="w-9 h-9 bg-gray-300 text-slate-900 rounded-full flex items-center outline outline-offset-1 outline-1 outline-gray-200 justify-center">
                    <span className="text-base font-semibold">
                      {user?.data?.name?.charAt(0).toUpperCase() || user?.data?.email?.charAt(0).toUpperCase() || ''}
                    </span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <Link to="/host/login">
              <FaUser />
            </Link>
          )}
        </div>
      </div>

      {dropdownOpen && (
        <Dropdown
          user_type={'user'}
          items={dropdownItems}
          onClick={(itemName) => {
            console.log(`${itemName} clicked`);
            handleDropdownAction(itemName, dispatch, navigate);
            setDropdownOpen(false); 
          }}
          position={dropdownPosition}
        />
      )}
    </header>
  );
};

export default POHeader;