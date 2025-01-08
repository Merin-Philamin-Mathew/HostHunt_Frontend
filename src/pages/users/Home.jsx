import React, { useEffect, useState } from 'react';
import CategoryCard from '../../components/user/CategoryCard';
import ReviewCard from '../../components/user/ReviewCard';
import Footer from '../../components/user/partials/Footer';
import Container from '../../components/utils/Containers/Container';
import Banner from '../../components/user/HomePage/Banner';
import Header from '@/components/user/partials/Header';
import { getAllReviewsForHomeCarosal } from '@/features/Booking/BookingActions';
import ReviewCarousel from '@/components/user/HomePage/ReviewCarousel';

const Home = () => {
  const categories = [
    { title: 'Rentals', description: 'Find affordable rentals', image: '/property_details/categories/Rental_homes.jpg' },
    { title: 'PG', description: 'Best Paying Guest accommodations', image: '/property_details/categories/PG.jpg' },
    { title: 'Hostels', description: 'Explore top hostels in Kerala', image: '/property_details/categories/hostel.jpg' },
    { title: 'Appartments', description: 'Find affordable appartments', image: '/property_details/categories/appartments.jpg' },
  ];

  // const reviews = [
  //   { name: 'John Doe', role: 'Accountant', review: 'Great experience!', image: '/user1.jpg' },
  //   { name: 'Jane Smith', role: 'Doctor', review: 'Loved the stay!', image: '/user2.jpg' },
  //   { name: 'Tom Bell', role: 'Designer', review: 'Highly recommend!', image: '/user3.jpg' },
  // ];

  const [reviews, setReviews] = useState('')
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('reveiws')
        // setLoading(true);
        const data = await getAllReviewsForHomeCarosal();
        console.log(data,'reveiws')
        setReviews(data.results); // Assuming the API returns reviews in a `results` key
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error(err);
      } finally {
        // setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        {/* <br></br> */}
      <Banner />
        <section className="py-12   pt-28 w-full">
          <h2 className="text-3xl font-semibold py-1">Uncovering the Best Stays: Explore Our Top categories</h2>
          <div className='h-0.5  bg-themeColor w-52'></div>
          <div className="mt-6 grid sm:grid-cols-2 grid-cols-1  lg:grid-cols-4 gap-4 ">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </section>

        <section className="py-8 ">
        <h2 className="text-3xl font-semibold py-1">Hosteller’s Experiences git added</h2>
        <div className='h-0.5  bg-themeColor w-52'></div>        
            <ReviewCarousel reviews={reviews}/>
        </section>
          </Container>
      <Footer />
    </div>
  );
}

export default Home;
