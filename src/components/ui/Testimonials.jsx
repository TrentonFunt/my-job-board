import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Jane Doe",
    role: "Frontend Developer",
    text: "I found my dream job through Role Rocket! The process was smooth and the opportunities were top-notch.",
    avatar: "/vite.svg"
  },
  {
    name: "Acme Corp",
    role: "Employer",
    text: "We hired amazing talent quickly and easily. Highly recommend this platform!",
    avatar: "/vite.svg"
  },
  {
    name: "John Smith",
    role: "Backend Engineer",
    text: "Role Rocket connected me with a fantastic company. The UI is so easy to use!",
    avatar: "/vite.svg"
  }
];

export default function Testimonials() {
  return (
    <section className="my-10">
      <h2 className="text-xl font-bold text-accent mb-4">Success Stories</h2>
      <div className="relative">
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: '.swiper-custom-pagination',
            type: testimonials.length > 6 ? 'fraction' : 'bullets',
            renderBullet: (index, className) => `<span class='${className} !w-4 !h-4 !mx-1 rounded-full bg-base-300'></span>`
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 }
          }}
          className="pb-24"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="card bg-base-100 shadow border border-base-300 p-4 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-xl">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full mb-2" />
                <div className="font-bold text-lg mb-1">{t.name}</div>
                <div className="text-base-content/70 mb-2">{t.role}</div>
                <div className="italic text-center">“{t.text}”</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
  <div className="swiper-custom-pagination flex justify-center mt-2 absolute left-0 right-0 bottom-[-55px] z-10" />
      </div>
      <style>{`
        .swiper-pagination-bullet {
          width: 1.25rem !important;
          height: 1.25rem !important;
          margin: 0 0.25rem !important;
          background: #d1d5db !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
        }
        .swiper-pagination-fraction {
          font-size: 1.1rem;
          color: #2563eb;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
}
