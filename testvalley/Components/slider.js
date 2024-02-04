import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/core";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


SwiperCore.use([Navigation, Pagination, Autoplay, EffectCoverflow]);

const ImageSlider = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch("https://api.testvalley.kr/main-banner/all");
      const data = await response.json();
      setImages(data.map((banner) => banner.pcImageUrl));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation={false} // Disable default navigation
        pagination={{ clickable: true }} // Add pagination dots
        autoplay={{ delay: 3000 }}
        loop={true}
        className="mySwiper" // Add custom class for styling
        effect={'coverflow'} // Apply coverflow effect
        coverflowEffect={{
          rotate: 50, // Rotate value
          stretch: 0, // Stretch value
          depth: 100, // Depth value
          modifier: 1, // Modifier value
          slideShadows: true, // Enable slide shadows
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-slide-overlay">
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
