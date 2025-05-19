import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export default function SchoolCarousel() {
  const images = [
    {
      src: "https://sss.mgu.ac.in/wp-content/uploads/2017/09/slider-01.jpg",
      title: "School 1",
      description: "A wonderful school with a great atmosphere.",
    },
   
    
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={images.length > 1}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div style={{ position: "relative" }}>
            <img
              src={image.src}
              alt={image.title}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Available";
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                width: "80%",
              }}
            >
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
