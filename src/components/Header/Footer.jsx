import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import FooterLogo from "../../assets/logoFooter.svg";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import { useLanguage } from "../../context/language/language";

// Import Social Icons
import facebookIcon from "../../assets/icons/facebook.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import twitterIcon from "../../assets/landing/twitter.svg";
import { useSelector } from "react-redux";
import { roles } from "../../constants/commonConstants";
import phoneIcon from "../../assets/icons/phone.svg";
import emailIcon from "../../assets/icons/email.svg";
import { CONFIGURATIONS } from "../../config/envConfig";

const Footer = () => {
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Image loading states
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [socialIconsLoaded, setSocialIconsLoaded] = useState({});
  const [reachUsIconsLoaded, setReachUsIconsLoaded] = useState({});
  const {language} = useLanguage();

  const currentYear = new Date().getFullYear();

  const handleNavigation = (link) => {
    // Check if the link is external
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.open(link, "_blank");
    } else {
      navigate(link);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const menuItems1 = [
    { text: languageTranslatorUtil(language,"footer_section","quickLinks","aboutUs"), link: "/about-us" },
    { text: languageTranslatorUtil(language,"footer_section","quickLinks","contactUs"), link: "/contact-us" },
    { text: languageTranslatorUtil(language,"footer_section","legalLinks","termsAndConditions"), link: "/terms-and-condition" },
    { text: languageTranslatorUtil(language,"footer_section","legalLinks","privacyPolicy"), link: "/privacy-policies" },
    // { text: "FAQ", link: role === roles.USER ? "/client" : "/service-pro" },
  ];

  const menuItems2 = [
    {
      text: languageTranslatorUtil(language,"footer_section","quickLinks","HostEvent"),
      link: `http://localhost:3005/create-event`,
      external: true,
    },
    { text: languageTranslatorUtil(language,"footer_section","quickLinks","BrowseEvents"), link: "/events" },
  ];

  const menuItems3 = [
    { text: "07737177193", icon: phoneIcon },
    { text: "contact@kidsplan.com", icon: emailIcon },
  ];

  const socialIcons = [
    {
      icon: facebookIcon,
      alt: "facebook",
      link: "https://www.facebook.com",
    },
    {
      icon: twitterIcon,
      alt: "twitter",
      link: "https://x.com",
    },
    {
      icon: instagramIcon,
      alt: "instagram",
      link: "https://www.instagram.com",
    },
  ];

  return (
      <footer
          style={{ backgroundColor: "var(--footer-theme)", width: "100%" }}
          className="px-[40px] md:px-[60px] lg:px-[120px] pt-3 min-h-[300px]"
      >
        <div className="flex flex-col pt-3 pb-1">
          {/* Top Section */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center">
            {/* Navigation Menu */}
            <div className="flex flex-col p-2.5 space-y-6 pl-0 xl:pl-0">
              {/* Logo */}
              <div
                  className="w-[148px] h-[79.96px] cursor-pointer -translate-y-6"
                  onClick={() => handleNavigation("/")}
              >
                <div
                    className={twMerge(
                        "relative w-[148px] h-[79.96px] mt-[25px]",
                        logoLoaded ? "bg-transparent" : "bg-gray-300 animate-pulse"
                    )}
                >
                  <LazyLoadImage
                      src={FooterLogo}
                      placeholderSrc={FooterLogo}
                      alt="kidsplan Logo"
                      className="w-full h-auto"
                      effect="blur"
                      onLoad={() => setLogoLoaded(true)}
                  />
                </div>
              </div>
              <div>
                <h1 className="font-inter text-[14px] text-white max-w-[300px] text-justify -translate-y-2">
                  {languageTranslatorUtil(language,"footer_section","description")}
                </h1>
              </div>
              {/* Social Icons */}
              <div className="flex gap-4 -translate-x-2 -translate-y-4">
                {socialIcons.map((social, index) => (
                    <a key={index}>
                      <div
                          className={twMerge(
                              "relative w-6 h-6",
                              socialIconsLoaded[index]
                                  ? "bg-transparent"
                                  : "bg-gray-300 animate-pulse rounded-full"
                          )}
                      >
                        <LazyLoadImage
                            src={social.icon}
                            placeholderSrc={social.icon}
                            alt={social.alt}
                            className="w-6 h-6 cursor-pointer hover:opacity-80"
                            effect="blur"
                            onLoad={() => {
                              setSocialIconsLoaded((prev) => ({
                                ...prev,
                                [index]: true,
                              }));
                            }}
                        />
                      </div>
                    </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between w-full mt-5 xl:w-2/3 pr-0">
              <div className="flex flex-col justify-between xs:flex-row xs:space-x-10 w-[80%] xs:w-[75%] sm:w-[50%]">
                {/* Navigation Menu */}
                <div className="flex flex-col flex-wrap justify-start gap-4 items-start">
                  <h1 className="font-inter text-white text-level-5 font-semibold mb-4 ">
                    {/* //ToDo : need to be translated */}
                    {languageTranslatorUtil(language,"ms_values","company")}
                  </h1>
                  {menuItems1.map((item, index) => (
                      <button
                          key={index}
                          className="py-0 text-white hover:opacity-80 font-inter font-medium text-sm text-nowrap"
                          onClick={() => handleNavigation(item.link)}
                      >
                        {item.text}
                      </button>
                  ))}
                </div>

                {/* Navigation Menu */}
                <div className="flex flex-col mt-10 xs:mt-0 flex-wrap justify-start gap-4 items-start">
                  <h1 className="font-inter text-white text-level-5 font-semibold mb-4">
                    {/* //ToDo : need to be translated */}
                    {languageTranslatorUtil(language,"ms_values","services")}
                  </h1>
                  {menuItems2.map((item, index) => (
                      <button
                          key={index}
                          className="py-0 text-white hover:opacity-80 font-inter font-medium text-sm text-nowrap"
                          onClick={() => {
                            if (item.external) {
                              window.open(item.link, "_blank");
                            } else {
                              handleNavigation(item.link);
                            }
                          }}
                      >
                        {item.text}
                      </button>
                  ))}
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="flex flex-col mt-10 sm:mt-0 flex-wrap justify-start gap-4 items-start pr-0">
                <h1 className="font-inter text-white text-level-5 font-semibold mb-4">
                  {languageTranslatorUtil(language,"footer_section","contactUsTitle")}
                </h1>
                {menuItems3.map((item, index) => {
                  const isEmail = item.text.includes("@");
                  const isPhone = /^\+?[0-9\s-]+$/.test(item.text);

                  return (
                      <div
                          key={index}
                          className="py-0 text-white hover:opacity-80 font-inter font-medium text-sm text-start"
                      >
                        <div className="flex flex-row items-center">
                          <div
                              className={twMerge(
                                  "relative w-6 h-6 mr-4",
                                  reachUsIconsLoaded[index]
                                      ? "bg-transparent"
                                      : "bg-gray-300 animate-pulse rounded"
                              )}
                          >
                            <LazyLoadImage
                                src={item.icon}
                                placeholderSrc={item.icon}
                                alt={item.alt || "contact icon"}
                                className="w-6 h-6 cursor-pointer hover:opacity-80"
                                effect="blur"
                                onLoad={() => {
                                  setReachUsIconsLoaded((prev) => ({
                                    ...prev,
                                    [index]: true,
                                  }));
                                }}
                            />
                          </div>
                          {isEmail ? (
                              <a
                                  href={`mailto:${item.text}`}
                                  className="hover:underline"
                              >
                                {item.text}
                              </a>
                          ) : isPhone ? (
                              <a
                                  href={`tel:${item.text.replace(/\s+/g, "")}`}
                                  className="hover:underline"
                              >
                                {item.text}
                              </a>
                          ) : (
                              <span>{item.text}</span>
                          )}
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] mt-5 bg-[#CBD5E0] my-1" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-0 px-0"
               style={{
                 minHeight: "25px",
                 alignItems: "center",
                 marginBottom: "0px",
                 paddingBottom: "0px"
               }}
          >
            <p className="text-white opacity-70 font-inter font-medium text-sm text-center md:text-left mb-0">
              {languageTranslatorUtil(language,"footer_section","copyrightNotice")}
            </p>

            {/* <div className="flex flex-row space-x-4 items-center">
              <button
                  className="text-white opacity-70 font-inter font-medium text-sm hover:opacity-80"
                  onClick={() => handleNavigation("/terms-and-condition")}
              >
                {languageTranslatorUtil(language,"footer_section","legalLinks","termsAndConditions")}{" "}
              </button>

              <button
                  className="text-white opacity-70 font-inter font-medium text-sm hover:opacity-80"
                  onClick={() => handleNavigation("/privacy-policies")}
              >
                {languageTranslatorUtil(language,"footer_section","legalLinks","privacyPolicy")}{" "}
              </button>
            </div> */}
          </div>
        </div>
      </footer>
  );
};

export default Footer;