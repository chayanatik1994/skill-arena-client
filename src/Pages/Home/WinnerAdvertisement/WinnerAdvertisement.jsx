import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const WinnerAdvertisement = () => {
  const { data: winners = [], isLoading } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const res = await axios.get("https://skill-arena-seven.vercel.app/winners");
      return res.data || [];
    },

    refetchInterval: 30000, 

  });

  if (isLoading) {
    return (
      <section className="py-12 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </section>
    );
  }

  if (!winners.length) {
    return null;
  }

  const totalPrize = winners.reduce((sum, w) => sum + (w.prize || 0), 0);

  return (
    <section className="py-12 px-4 md:px-8 bg-teal-900 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
            Recent Winners
        </h2>
        <p className="mt-2 text-sm md:text-base text-teal-100">
          {winners.length} Winners • Total Prize: ${totalPrize}
        </p>
      </div>

      {/* Slider */}
      <Swiper
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {winners.map((winner, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white h-full p-6 rounded-xl shadow-md text-center transition-transform duration-300 hover:-translate-y-1">
              <img
                  src={winner.winnerPhoto || winner.contestImage}
                alt={winner.winnerName}
                className="mx-auto mb-4 w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-teal-500"
              />

              <h3 className="text-lg md:text-xl font-semibold text-teal-900">
                {winner.winnerName}
              </h3>

              <p className="mt-1 text-gray-600 font-medium">
                ${winner.prize}
              </p>

              <span className="inline-block mt-3 text-sm text-teal-700 font-semibold">
                Congratulations 🎉
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default WinnerAdvertisement;
