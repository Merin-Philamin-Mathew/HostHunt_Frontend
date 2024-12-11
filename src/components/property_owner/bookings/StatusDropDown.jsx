import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'; // Update the import path as needed

const StatusDropdown = ({ newStatus, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState(newStatus);

  const items = [
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'checked_in', label: 'Checked In' },
    { key: 'checked_out', label: 'Checked Out' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  const handleStatusChange = (key) => {
    setSelectedStatus(key);
    onStatusChange(key);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          {items.find((item) => item.key === selectedStatus)?.label || 'Select Status'}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select Booking Status"
        items={items}
        onAction={(key) => handleStatusChange(key)}
      >
        {(item) => (
          <DropdownItem
            key={item.key}
            className={item.key === 'cancelled' ? 'text-danger' : ''}
            color={item.key === 'cancelled' ? 'danger' : 'default'}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default StatusDropdown;
