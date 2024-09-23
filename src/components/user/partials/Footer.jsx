import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-themeColor2 text-white py-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h2 className="font-bold">HostHunt</h2>
            <p>Best accommodation across Kerala</p>
          </div>
          <div>
            <h2 className="font-bold">Categories</h2>
            <ul>
              <li>Hostels</li>
              <li>PG</li>
              <li>Rentals</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold">Help</h2>
            <ul>
              <li>Support</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
