# HostHunt Frontend

A modern React-based frontend for the HostHunt long-term stay booking platform, deployed on Vercel.

## 🌟 Live Demo
[HostHunt Platform](#https://merinphilamin.site/)  

## 🚀 Features

### User Features
- Intuitive booking interface for long-term stays
- Real-time notifications for booking updates
- Interactive property search with Google Maps integration
- Property rating and review system
- Secure payment processing with Stripe
- User profile management
- Booking history and tracking

### Owner Dashboard
- Property management interface
- Booking request handling
- Payment tracking and history
- Review response system
- Analytics dashboard with Chart.js
- Downloadable transaction reports

### Admin Panel
- User management interface
- Property approval system
- Transaction monitoring
- Performance metrics visualization
- System settings management

## 💻 Technical Stack

- React.js
- Tailwind CSS
- Chart.js
- WebSocket for real-time features
- Stripe payment integration
- Google Maps API integration

## 🛠 Development Setup

1. Clone the repository:
```bash
git clone <frontend-repository-url>
cd hosthunt-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=your_backend_url
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start development server:
```bash
npm run dev
```

## 🚀 Deployment

The frontend is deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy using Vercel's automatic deployment

## 📱 Responsive Design

Fully responsive for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)

## 🧪 Testing

```bash
npm run test
```

## 📦 Build

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

MIT License
