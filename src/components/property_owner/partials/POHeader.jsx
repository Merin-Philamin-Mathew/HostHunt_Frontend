import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaBuilding, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdNotifications, MdClose } from "react-icons/md";
import { handleDropdownAction, handleDropdownActionOwner } from '../../utils/logic';
import { navigatetoUserHome } from '../../../config/constant';
import { toast } from 'sonner';

import { format } from 'date-fns';
import ProfileIcon_dropDown from '@/components/utils/dropDown/ProfileIcon_dropDown';

const NotificationBar = ({ messages, onClose }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return format(date, 'MMMM dd, yyyy, hh:mm a'); // Example: December 13, 2024, 07:33 AM
  };

  const navigate = useNavigate()

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
          <div key={index} className="p-4 border-b hover:bg-gray-50"
            onClick={()=>{navigate('/host/bookings')}}
          >
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
  const BASE_URL_KEYWORD = import.meta.env.VITE_BASEURL_KEYWORD;

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${protocol}://${BASE_URL_KEYWORD}/ws/notificatffffions/${user_id}/`);


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


  const toggleNotificationBar = () => {
    setNotificationBarOpen(!notificationBarOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

    const navBarItems = [
      { title: 'Dashboard', link: '/host/dashboard'  },
      { title: 'Hostels Listed', link: '/host/listings' },
      { title: 'Reviews', link: '/host/reviews'  },
      { title: 'Bookings', link: '/host/bookings' }
    ];

  return (
    <header className="w-full py-3 bg-themeColor2 shadow-xl shadow-white relative">
      <div className="flex justify-between items-center mx-auto lessThan404 px-6">
        <button className="flex items-center space-x-1" onClick={() => navigate(navigatetoUserHome)}>
          <img src="/logo/white_invert.png" className="w-10 bg-themeColor py-1 px-0 rounded-md" alt="Logo"/>
          <div className="text-2xl font-extrabold text-themeColor">HOSTHUNT</div>
        </button>

     

        <div className="flex items-center space-x-6 px-2">
        <nav className="hidden md:flex space-x-8">
            {navBarItems.map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  isActiveRoute(item.link)
                    ? 'border-slate-500 text-slate-50'
                    : 'border-transparent text-slate-300 hover:border-gray-300 hover:animate-pulse'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

        </div>
        <div className="flex items-center space-x-6 px-2">
          {/* notification icon */}
          <div className="relative">
            <button
              onClick={toggleNotificationBar}
              className="bg-themeColor2li8 text-white p-2 rounded-full flex items-center justify-center shadow-md relative w-10 h-10 "
            >
              <MdNotifications className="text-2xl hover:animate-pulse" />
              {messages.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow">
                  {messages.length}
                </span>
              )}
            </button>
            {notificationBarOpen && (
              <NotificationBar
                messages={messages}
                onClose={() => setNotificationBarOpen(false)}
              />
            )}
          </div>


          {user ? (
            <ProfileIcon_dropDown classname={'text-themeColor2li8 bg-slate-400'}/>

          ) : (
            <Link to="/host/login">
              <FaUser />
            </Link>
          )}
        </div>
      </div>


    </header>
  );
};

export default POHeader;