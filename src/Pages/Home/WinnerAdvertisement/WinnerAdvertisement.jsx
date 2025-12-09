import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const WinnerAdvertisement = () => {
  const [winners, setWinners] = useState([]);

  // Example: fetching winners from API (replace URL with your backend endpoint)
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        // Simulate fetching from backend
        const response = await fetch("/api/winners"); // replace with real API
        const data = await response.json();
        setWinners(data);
      } catch (error) {
        console.error("Error fetching winners:", error);
        // fallback to default data if API fails
        setWinners([
          { name: "Alice", prize: 5000, image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
          { name: "Bob", prize: 3000, image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
          { name: "Carol", prize: 2000, image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
          { name: "David", prize: 1500, image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
          { name: "Eva", prize: 1000, image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
        ]);
      }
    };

    fetchWinners();
  }, []);

  if (winners.length === 0) return null; // optional: loading state

  const totalWinners = winners.length;
  const totalPrize = winners.reduce((sum, w) => sum + w.prize, 0);

  return (
    <section className="p-8 bg-teal-900 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2 text-white">Recent Winners</h2>
        <p className="text-white text-lg">
          {totalWinners} Winners | Total Prize Money: ${totalPrize}
        </p>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {winners.map((winner, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300">
              <img
                src={winner.image}
                alt={winner.name}
                className="mx-auto mb-4 w-24 h-24 rounded-full object-cover border-4 border-teal-500"
              />
              <h3 className="text-xl font-semibold text-teal-900">{winner.name}</h3>
              <p className="text-gray-600 mt-2">${winner.prize}</p>
              <p className="mt-2 text-sm text-teal-700 font-medium">
                Congratulations!
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default WinnerAdvertisement;
