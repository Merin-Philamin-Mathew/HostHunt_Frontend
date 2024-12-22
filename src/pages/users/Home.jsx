import React from 'react';
import CategoryCard from '../../components/user/CategoryCard';
import ReviewCard from '../../components/user/ReviewCard';
import Footer from '../../components/user/partials/Footer';
import Header from '../../components/user/partials/header';
import Container from '../../components/utils/Containers/Container';
import Banner from '../../components/user/HomePage/Banner';

const Home = () => {
  const categories = [
    { title: 'Rentals', description: 'Find affordable rentals', image: '/property_details/categories/Rental_homes.jpg' },
    { title: 'PG', description: 'Best Paying Guest accommodations', image: '/property_details/categories/PG.jpg' },
    { title: 'Hostels', description: 'Explore top hostels in Kerala', image: '/property_details/categories/hostel.jpg' },
    { title: 'Appartments', description: 'Find affordable appartments', image: '/property_details/categories/appartments.jpg' },
  ];

  const reviews = [
    { name: 'John Doe', role: 'Accountant', review: 'Great experience!', image: '/user1.jpg' },
    { name: 'Jane Smith', role: 'Doctor', review: 'Loved the stay!', image: '/user2.jpg' },
    { name: 'Tom Bell', role: 'Designer', review: 'Highly recommend!', image: '/user3.jpg' },
  ];

  return (
    <div>
      <Header />
      <Container>
        {/* <br></br> */}
      <Banner />
        <section className="py-12   pt-28 w-full">
          <h2 className="text-3xl font-semibold py-1">Uncover the Best Stays: Explore Our Top categories</h2>
          <div className='h-0.5  bg-themeColor w-52'></div>
          <div className="mt-6 grid sm:grid-cols-2 grid-cols-1  lg:grid-cols-4 gap-4 ">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </section>

        <section className="py-8 ">
        <h2 className="text-3xl font-semibold py-1">Hosteller’s Experiences</h2>
        <div className='h-0.5  bg-themeColor w-52'></div>        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 container mx-auto">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </section>
          </Container>
      <Footer />
    </div>
  );
}

export default Home;
