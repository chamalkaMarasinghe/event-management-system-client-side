import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

// Improt Icons
import { ReactComponent as QuoteIcon } from "../../assets/landing/quote.svg";
import { ReactComponent as FacebookIcon } from "../../assets/landing/facebook.svg";
import twitter from "../../assets/landing/twitter.svg";
import instagram from "../../assets/landing/instgram.svg";

const TestimonialSection = ({
  testimonials,
  heading = "Client Success Stories",
  color = "#00796B",
}) => {
  return (
    <div className="w-full  bg-white px-[20px] md:px-[40px] lg:px-[100px] py-[88px]">
      <div className=" w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <h4 className="font-inter font-medium text-sm tracking-[0.84px] uppercase text-dark text-center">
            Testimonial
          </h4>
          <h2 className="font-nonito_sans font-bold text-3xl sm:text-4xl lg:text-[42px] leading-[56px] text-primary-text text-center">
            {heading}
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          className="rounded-[20px] overflow-hidden"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-light rounded-[20px] border-b border-[#dde1e6] p-8 md:p-12 flex flex-col md:flex-row gap-8">
                {/* User Profile Section */}
                <div className="flex flex-col items-center gap-4 md:w-[160px]">
                  <div className="w-[160px] h-[160px] rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-inter font-bold text-lg text-dark">
                      {testimonial.name}
                    </h3>
                    <p className="font-inter text-base text-content">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col gap-8">
                  <QuoteIcon className="w-[70px] h-[70px]" fill={color} />
                  <div className="flex flex-col gap-4">
                    <h3 className="font-inter font-semibold text-2xl text-dark">
                      {testimonial.title}
                    </h3>
                    <p className="font-inter text-base text-content leading-6">
                      {testimonial.quote}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link to={testimonial?.socials?.twitter || "/"}>
                      <img src={twitter} alt="Social Icons" />
                    </Link>
                    <Link to={testimonial?.socials?.facebook || "/"}>
                      <FacebookIcon fill={color} />
                    </Link>
                    <Link to={testimonial?.socials?.instagram || "/"}>
                      <img src={instagram} alt="Social Icons" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Dots */}
        <div className="custom-pagination mt-8"></div>
      </div>
    </div>
  );
};

export default TestimonialSection;
