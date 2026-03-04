import { useState } from "react";
import { useLanguage } from "../../context/language/language";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaFacebookF, FaWhatsapp, FaTwitter, FaYoutube } from "react-icons/fa";
import ContactForm from "../../components/Base/ContactForm";

import Phone from "../../assets/phone.svg";
import MapPin from "../../assets/location.svg";
import Envelope from "../../assets/mail.svg";


const ContactCard = ({ icon, title, lines }) => {
  const [iconLoaded, setIconLoaded] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#F7F7F8] rounded-lg p-4 sm:p-6 text-center overflow-hidden">
      <div className="bg-dark-black p-3 sm:p-4 rounded-xl flex items-center justify-center mb-[24px]">
        <div
          className={twMerge(
            "relative w-4 sm:w-5 h-4 sm:h-5",
            iconLoaded ? "bg-transparent" : "bg-gray-300 animate-pulse"
          )}
        >
          <LazyLoadImage
            src={icon}
            placeholderSrc={icon}
            alt={title}
            className="w-4 sm:w-5 h-4 sm:h-5"
            effect="blur"
            onLoad={() => setIconLoaded(true)}
          />
        </div>
      </div>
      <h3 className="font-semibold text-xl sm:text-[24px] text-dark-black mb-[24px]">
        {title}
      </h3>
      <div className="flex flex-col">
        {lines.map((line, index) => (
          <p
            key={index}
            className="font-normal h-[19px] mb-[12px] text-[14px] sm:text-[16px] text-deep-black break-words"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

const KidsplanClientContactUs = () => {
  const { language } = useLanguage();
  return (
    <>
      <title>Contact Us</title>
      <div className="relative w-full -translate-y-[27px] md:-translate-y-[70px] overflow-hidden">
        {/* Orange hero section */}
        <div className="bg-user-orange w-full pt-12 sm:pt-16 md:pt-24 lg:pt-32 xl:pt-36 2xl:pt-40 pb-16 sm:pb-24 md:pb-32 lg:pb-40 xl:pb-44 2xl:pb-48 relative z-10">
          <div className="container mx-auto px-4 font-roboto text-center space-y-3 md:space-y-5 mb-6 sm:mb-8 md:mb-12 max-w-[1920px] 2xl:max-w-[2560px]">
            <h1 className="font-light text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight text-center text-[#EAEAEA]">
              {languageTranslatorUtil(language, "contact_us_page", "heroTitle")}{" "}
              <span className="block text-white font-bold">
                {languageTranslatorUtil(
                  language,
                  "contact_us_page",
                  "heroSubtitle"
                )}
              </span>
            </h1>
            <p className="max-w-3xl mx-auto font-normal text-sm md:text-base lg:text-lg leading-relaxed text-center text-white px-4 pb-2">
              {languageTranslatorUtil(language, "contact_us_page", "description")}
            </p>
          </div>

          {/* Diagonal edge */}
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 md:h-32 lg:h-64 xl:h-72 2xl:h-80 bg-user-orange transform -skew-y-6 origin-top-right z-0" />
        </div>

        {/* Contact Form and Join Us Section */}
        <div className="container mx-auto -mt-8 sm:-mt-12 md:-mt-24 lg:-mt-32 relative z-20">
          <div className="container w-[90%] flex flex-col lg:flex-row gap-8 lg:gap-12 mx-auto">
            {/* Contact Form Section */}
            {/* <div className="w-full lg:w-3/4">
              <ContactForm />
            </div> */}

            {/* Join Us Section */}
            <div className="w-full  flex flex-col justify-center items-center text-center mt-8 lg:mt-0">
              <h2 className="font-light text-3xl sm:text-4xl font-roboto md:text-[45px] lg:text-[50px] leading-[110%] sm:leading-[100%] tracking-[0%] text-center uppercase text-black ">
                    {languageTranslatorUtil(language,"ms_values","joinUsCreating")} <br />
                    <span className="text-black font-[400]">
                      {languageTranslatorUtil(language,"contact_us_page","Messages","joinUsMessage").split(",")[1]} <br /> {languageTranslatorUtil(language,"contact_us_page","Messages","joinUsMessage").split(",")[2]}
                    </span>
              </h2>

              <div className="flex gap-3 sm:gap-4 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                <button className="bg-white p-2 sm:p-3 border border-dark-gray/50 hover:border-user-orange rounded-full text-user-orange hover:text-white hover:bg-user-orange transition-colors">
                  <Link to={"#"}>
                    <FaFacebookF size={16} className="sm:w-5 sm:h-5" />
                  </Link>
                </button>
                <button className="bg-white p-2 sm:p-3 border border-dark-gray/50 hover:border-user-orange rounded-full text-user-orange hover:text-white hover:bg-user-orange transition-colors">
                  <Link to={"#"}>
                    <FaWhatsapp size={16} className="sm:w-5 sm:h-5" />
                  </Link>
                </button>
                <button className="bg-white p-2 sm:p-3 border border-dark-gray/50 hover:border-user-orange rounded-full text-user-orange hover:text-white hover:bg-user-orange transition-colors">
                  <Link to={"#"}>
                    <FaTwitter size={16} className="sm:w-5 sm:h-5" />
                  </Link>
                </button>
                <button className="bg-white p-2 sm:p-3 border border-dark-gray/50 hover:border-user-orange rounded-full text-user-orange hover:text-white hover:bg-user-orange transition-colors">
                  <Link to={"#"}>
                    <FaYoutube size={16} className="sm:w-5 sm:h-5" />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] pt-12 sm:pt-16 md:pt-20 mx-auto">
          <div className="w-full max-w-[1360px] font-roboto px-4 sm:px-6 md:px-8 lg:px-[88px] py-10 sm:py-[60px] md:py-[80px]
        text-center bg-white rounded-xl shadow-[4px_4px_32px_0px_#FFF7ED33] mx-auto">
            <h2 className="font-medium text-sm sm:text-[16px] leading-[100%] tracking-[0%] text-center uppercase text-subheadings/60">
              {languageTranslatorUtil(language,"contact_us_page","getInTouchHeading")}
            </h2>
            <p className="font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-normal capitalize text-black mt-2 sm:mt-3 md:mt-4"> 
                    {languageTranslatorUtil(language,"ms_values","contact")} <span className="text-user-orange"> {languageTranslatorUtil(language,"ms_values","us")}</span> 
            </p>

            {/* df */}
                  {/* <div className="flex flex-wrap fo gap-6 items-center justify-center mt-[40px]">
        {workSteps.map((step, index) => (
          <WorkStepCard
            key={index}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
          />
        ))}
      </div> */}
            {/* df */}
            <div className="flex flex-wrap fo gap-6 items-center justify-center mt-[40px]">
              <div className="w-full max-w-[352px] min-h-[248px] xl:aspect-[352/248]">
                <ContactCard
                    icon={Phone}
                    title={languageTranslatorUtil(language,"contact_us_page","contactNumbersLabel")}
                    lines={["077 3717193"]}
                />
              </div>

              <div className="w-full max-w-[352px] min-h-[248px] xl:aspect-[352/248]">
                <ContactCard
                    icon={MapPin}
                    title={languageTranslatorUtil(language,"common_stringTemplates","locationLabel")}
                    lines={["Russia, Germany, Poland"]}
                />
              </div>

              <div className="w-full max-w-[352px] min-h-[248px] xl:aspect-[352/248]">
                <ContactCard
                    icon={Envelope}
                    title={languageTranslatorUtil(language,"contact_us_page","formLabels","email")}
                    lines={["contact@kidsplan.com"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KidsplanClientContactUs;
