import { useState } from "react";
import { useLanguage } from "../../context/language/language.js";
import { twMerge } from "tailwind-merge";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Phone from "../../assets/phone.svg";
import MapPin from "../../assets/location.svg";
import Envelope from "../../assets/mail.svg";

import Image1HQ from "../../assets/images/aboutHQ.webp";
import Image1LQ from "../../assets/images/aboutLQ.webp";
import Image2HQ from "../../assets/images/image2HQ.webp";
import Image2LQ from "../../assets/images/image2LQ.webp";

const AboutCard = ({ icon, title, text }) => {
  const [iconLoaded, setIconLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 items-center py-8 sm:py-[59px] px-4 sm:px-[34px] bg-[#F7F7F8] rounded-lg">
      <div className="bg-dark-black p-3 sm:p-4 rounded-xl flex items-center justify-center">
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
            className="absolute inset-0 object-cover w-full h-full"
            effect="blur"
            onLoad={() => setIconLoaded(true)}
          />
        </div>
      </div>
      <h3 className="font-semibold text-xl sm:text-[24px] leading-[100%] tracking-[0px] text-center align-middle text-dark-black mb-2">
        {title}
      </h3>
      <div className="text-center">
        <p className="font-normal text-[16px] tracking-[0px] text-center align-middle text-deep-black">
          {text}
        </p>
      </div>
    </div>
  );
};

const KidsplanClientAboutUs = () => {
  const [image1Loaded, setImage1Loaded] = useState(false);
  const [image2Loaded, setImage2Loaded] = useState(false);
  const {language} = useLanguage();

  return (
    <>
      <title>About Us</title>
      <div className="relative w-full -translate-y-[27px] md:-translate-y-[70px] overflow-hidden">
        {/* Orange hero section */}
        <div className="bg-black w-full pt-12 sm:pt-16 md:pt-24 lg:pt-32 xl:pt-36 2xl:pt-40 pb-16 sm:pb-24 md:pb-32 lg:pb-40 xl:pb-44 2xl:pb-48 relative z-10">
          <div className="container font-roboto mx-auto px-4 text-center space-y-3 md:space-y-5 mb-6 sm:mb-8 md:mb-12 max-w-[1920px] 2xl:max-w-[2560px]">
            <h1 className="font-light text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight text-center text-[#EAEAEA]">
                  {languageTranslatorUtil(language,"ms_values","builtWithPurpose")}{" "}
                  <span className="block text-white font-bold">
                    {languageTranslatorUtil(language,"ms_values","grownWithVision")}
                  </span>
            </h1>
            <p className="max-w-3xl mx-auto font-normal text-sm md:text-base lg:text-lg leading-relaxed text-center text-white px-4 pb-2">
                          {/* //   Todo: Polish tarnslation missing */}

              {languageTranslatorUtil(language,"ms_values","deliverPaper")}
            </p>
          </div>

          {/* Diagonal edge */}
          <div className="absolute inset-x-0 bottom-0 h-[4.3rem] sm:h-[5rem] md:h-[7rem] lg:h-[15rem] xl:h-[17rem] 2xl:h-[19rem] bg-black transform -skew-y-6 origin-top-right z-0" />
        </div>

        {/* About Us Content - IMPROVED FOR TABLET */}
        <div className="container mx-auto px-4 -mt-8 sm:-mt-12 md:-mt-24 lg:-mt-32 relative z-20">
          <div className="w-full mx-auto rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 bg-white shadow-[0.9px_4.5px_45px_0px_#54637A1A] mb-16 sm:mb-20 md:mb-24 lg:mb-[120px]">
            <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 md:gap-10 items-center">
              {/* Image container */}
              <div className="w-full md:w-1/2 lg:w-2/5 flex justify-center items-center mb-6 md:mb-0">
                <div className="overflow-hidden w-full max-w-[350px] sm:max-w-[400px]">
                  <div
                    className={twMerge(
                      "relative w-full aspect-[4/4] rounded-2xl shadow-[0.9px_4.5px_45px_0px_#54637A1A]",
                      image1Loaded
                        ? "bg-transparent"
                        : "bg-gray-300 animate-pulse"
                    )}
                  >
                    <LazyLoadImage
                      src={Image1HQ}
                      placeholderSrc={Image1LQ}
                      alt="About kidsplan"
                      className="w-full h-auto rounded-2xl object-contain"
                      effect="blur"
                      onLoad={() => setImage1Loaded(true)}
                    />
                  </div>
                </div>
              </div>

              {/* Content container - IMPROVED FOR TABLET */}
              <div className="w-full">
                <div className="text-sm sm:text-[16px] font-roboto text-center xl:text-left leading-[100%] tracking-[0%] uppercase font-medium text-subheadings/60 mb-2 sm:mb-3">
                  {languageTranslatorUtil(
                    language,
                    "about_us_page",
                    "sectionSubtitle"
                  )}
                </div>

                <h2 className="font-roboto text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-center xl:text-left leading-tight tracking-[0%] font-medium text-black mb-4 sm:mb-5 md:mb-6 lg:mb-[44px]">
                 
                      { languageTranslatorUtil(
                      language,
                      "about_us_page",
                      "whyWeStartedTitle"
                    ).split("k")[0]}{" "}
                      <span className="text-user-orange">kidsplan</span>
                  
                </h2>
                <p className="text-base font-roboto font-normal sm:text-lg md:text-xl lg:text-[20px] text-center xl:text-left leading-relaxed sm:leading-[28px] tracking-[0%] text-black text-opacity-70">
                  {languageTranslatorUtil(
                    language,
                    "about_us_page",
                    "whyWeStartedDescription"
                  )}

                  {/* At
                  kidsplan, our mission is to empower parents, educators, and
                  children by providing a safe and inspiring platform filled with
                  curated activities, learning tools, and personalized plans that
                  support every child's unique journey of growth and discovery. */}
                </p>
              </div>
            </div>
          </div>

          {/* Vision and Mission Section - IMPROVED FOR TABLET */}
          <div className="flex flex-col-reverse xl:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center px-4 sm:px-6 md:px-8 lg:px-[88px]">
            {/* Vision and Mission content container */}
            <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {/* Vision Section */}
              <div className="bg-[#F7F7F8] font-roboto p-5 sm:p-6 md:p-7 lg:p-8 rounded-lg">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-tight tracking-[0%] capitalize font-medium text-black mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                  {languageTranslatorUtil(
                    language,
                    "about_us_page",
                    "ourVisionTitle"
                  )}
                </h2>
                <p className="text-base font-roboto font-normal sm:text-lg md:text-xl lg:text-[20px] text-center xl:text-left leading-relaxed sm:leading-[28px] tracking-[0%] text-black text-opacity-70">
                  {languageTranslatorUtil(
                    language,
                    "about_us_page",
                    "ourVisionDescription"
                  )}
                </p>
              </div>

              {/* Mission Section */}
              <div className="bg-[#F7F7F8] font-roboto p-5 sm:p-6 md:p-7 lg:p-8 rounded-lg">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-tight tracking-[0%] capitalize font-medium text-black mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                  {languageTranslatorUtil(
                    language,
                    "about_us_page",
                    "ourMissionTitle"
                  )}
                </h2>
                <p className="text-base font-roboto font-normal sm:text-lg md:text-xl lg:text-[20px] text-center xl:text-left leading-relaxed sm:leading-[28px] tracking-[0%] text-black text-opacity-70">
                  {languageTranslatorUtil(
                    language,
                    "about_us_page",
                    "ourMissionDescription"
                  )}
                </p>
              </div>
            </div>

            {/* Image container - IMPROVED FOR TABLET */}
            <div className="w-full md:w-1/2 xl:w-full flex justify-center items-center mt-6 sm:mt-8 md:mt-0">
              <div className="overflow-hidden rounded-xl w-full max-w-[512px] mx-auto">
                <div
                  className={twMerge(
                    "relative w-full xl:w-[512px] aspect-[4/3] h-auto xl:h-[395px]",
                    image2Loaded ? "bg-transparent" : "bg-gray-300 animate-pulse"
                  )}
                >
                  <LazyLoadImage
                    src={Image2HQ}
                    placeholderSrc={Image2LQ}
                    alt="Our Mission"
                    className="w-full xl:w-[512px] h-auto xl:h-[395px] object-contain mx-auto"
                    effect="blur"
                    onLoad={() => setImage2Loaded(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Get In Touch Section - IMPROVED FOR TABLET */}
        <div className="py-2 sm:py-4 md:py-6 lg:py-8">
          <div className="container font-roboto mx-auto px-4 sm:px-6 md:px-8 lg:px-[88px] py-8 sm:py-10 md:py-[60px] lg:py-[80px] text-center bg-white rounded-xl shadow-[4px_4px_32px_0px_#FFF7ED33]">
            <h2 className="font-medium text-sm sm:text-[16px] leading-[100%] tracking-[0%] text-center uppercase text-subheadings/60">
              {languageTranslatorUtil(
                language,
                "about_us_page",
                "getInTouchHeading"
              )}
            </h2>
            <p className="font-medium text-xl sm:text-2xl md:text-3xl lg:text-[40px] leading-tight tracking-[0%] text-black mt-2 sm:mt-3">
              {languageTranslatorUtil(language,"common_stringTemplates","howKidsPlanWorksTitle").split(",")[0]} <span className="text-user-orange">{languageTranslatorUtil(language,"common_stringTemplates","howKidsPlanWorksTitle").split(",")[1]}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-[40px]">
              <AboutCard
                icon={Phone}
                title={languageTranslatorUtil(
                  language,
                  "common_stringTemplates",
                  "step1Title"
                )}
              //   Todo: Polish tarnslation missing
                text={languageTranslatorUtil(language,"ms_values","browseCuratedEvents")}
              />
              <AboutCard
                icon={MapPin}
                            //   Todo: Polish tarnslation missing
                title={languageTranslatorUtil(language,"ms_values","bookSecurely")}
                text={languageTranslatorUtil(language,"ms_values","reserveSpot")}
              />
              <AboutCard
                icon={Envelope}
                            //   Todo: Polish tarnslation missing

                title={languageTranslatorUtil(language,"ms_values","attendConnect")}
                text={languageTranslatorUtil(language,"ms_values","enjoyEvent")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KidsplanClientAboutUs;
