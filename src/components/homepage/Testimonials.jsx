import React from "react";
import { motion as Motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import { StarIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    text: "I found my dream job through Role Rocket! The matching algorithm is incredible and the application process was seamless. I went from application to offer in just 2 weeks.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    outcome: "Landed dream job in 2 weeks"
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "StartupXYZ",
    text: "The application tracking feature saved me so much time. I could see exactly where I stood with each application and never missed a follow-up opportunity.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    outcome: "Found perfect role with great work-life balance"
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "DesignStudio",
    text: "Finally, a platform that gets it! The interface is gorgeous and actually makes sense for creative minds, plus the personalized recommendations are spot-on.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    outcome: "Joined a creative team that values design"
  },
  {
    name: "David Kim",
    role: "Software Engineer",
    company: "InnovateTech",
    text: "Role Rocket's smart filters helped me find exactly what I was looking for. The salary transparency and company insights were game-changers.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    outcome: "Increased salary by 40%"
  },
  {
    name: "Lisa Wang",
    role: "Marketing Manager",
    company: "GrowthCo",
    text: "As an employer, Role Rocket helped us find incredible talent quickly. The candidate quality is outstanding and the hiring process is streamlined.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    outcome: "Hired 5 top performers in 3 months"
  },
  {
    name: "Alex Thompson",
    role: "Data Scientist",
    company: "DataCorp",
    text: "The remote job filtering and company culture insights helped me find a role that perfectly matches my values and career goals.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    outcome: "Found remote role with amazing culture"
  }
];

export default function Testimonials() {
  return (
    <section className="my-16">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Success Stories</h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Join thousands of professionals who found their dream jobs through Role Rocket
        </p>
      </Motion.div>
      
      <div className="relative">
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: '.swiper-custom-pagination',
            type: 'bullets',
            renderBullet: (index, className) => `<span class='${className} !w-3 !h-3 !mx-1 rounded-full bg-slate-600'></span>`
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 }
          }}
          className="pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 h-full flex flex-col transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Content */}
                  <blockquote className="text-slate-300 mb-6 flex-grow italic">
                    "{testimonial.text}"
                  </blockquote>
                  
                  {/* Outcome */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-emerald-400 font-medium text-sm">{testimonial.outcome}</span>
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover" 
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-slate-400 text-sm">{testimonial.role}</div>
                      <div className="text-emerald-400 text-sm font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </Motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-custom-pagination flex justify-center mt-4 absolute left-0 right-0 bottom-0 z-10" />
      </div>
      
      <style>{`
        .swiper-pagination-bullet {
          width: 0.75rem !important;
          height: 0.75rem !important;
          margin: 0 0.25rem !important;
          background: #475569 !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background: #10b981 !important;
          transform: scale(1.2) !important;
        }
      `}</style>
    </section>
  );
}
