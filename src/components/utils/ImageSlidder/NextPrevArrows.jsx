import React, { useState } from 'react'

function NextPrevArrows({room_images}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevious = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? room_images.length - 1 : prevIndex - 1
      );
    };
  
    const handleNext = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === room_images.length - 1 ? 0 : prevIndex + 1
      );
    };
  return (
    <div className="relative min-w-40 object-cover md:w-40 h-40 md:h-40 flex-shrink-0 ">
    {room_images.length > 0 ? (
      <div className="relative h-full overflow-hidden rounded-lg">
        {/* Carousel Items */}
        {room_images.map((image, index) => (
          <div 
            key={index} 
            className={`
              absolute w-full h-full transition-opacity duration-700 ease-in-out
              ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <img
              src={image.room_image_url || image}
              alt={`Room Image ${index + 1}`}
              className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
            />
          </div>
        ))}

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-2 left-1/2 space-x-3">
          {room_images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`
                w-2 h-2 rounded-full 
                ${index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/50'}
              `}
              aria-current={index === currentImageIndex}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentImageIndex(index)}
            ></button>
          ))}
        </div>

        {/* Slider controls */}
        {room_images.length > 1 && (
          <>
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-1 cursor-pointer group focus:outline-none"
              onClick={handlePrevious}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              {/* <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-2 group-focus:ring-white"> */}
                <svg className="w-4 h-4 text-white rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-1 cursor-pointer group focus:outline-none"
              onClick={handleNext}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg className="w-4 h-4 text-white rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </>
        )}
      </div>
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
        No images available
      </div>
    )}
  </div>
  )
}

export default NextPrevArrows
