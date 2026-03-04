import { useState } from "react";
import PolicyContent from '../Data/PolicyContent'; 
import { PiCaretUpBold } from "react-icons/pi";
import { useRef } from "react";

const tocItems = [
  { id: "information-we-collect", title: "1. The Information We Collect" },
  { id: "process-personal-info", title: "2. How We Process Your Personal Information" },
  { id: "share-info", title: "3. How We Share Your Personal Information" },
  { id: "protect-info", title: "4. How We Protect Your Information" },
  { id: "retain-info", title: "5. How Long We Retain Your Information" },
  { id: "rights", title: "6. Know Your Rights" },
  { id: "cookie", title: "7. Updating Our Privacy Policy" },
  { id: "consent", title: "8. Consent" },
  { id: "contact", title: "9. Contact Us" },
  { id: "definitions", title: "10. Definitions" },
  { id: "data-protection", title: "11. Data Retention & Protection Policy" },
  { id: "protection-officer", title: "12. Protection Officer" },
  { id: "data-we-process", title: "13. Data We Process" },
  { id: "marketing", title: "14. Marketing" },
  { id: "legal-obligation", title: "15. Information we process because we have a legal obligation" },
  { id: "client-rights", title: "16. Data Protection Rights of Clients/Service Providers" },
  { id: "retention-period", title: "17. Retention period for personal data" },
  { id: "encryption", title: "18. Encryption of data" },
  { id: "review-policy", title: "19. Review of this data protection and retention policy" },
];

const PrivacyPolicies = () => {
  const [isTableOfContentVisible, setTableOfContentVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");

  const scrollRef = useRef(null);


  const toggleTableOfContent = () => {
    setTableOfContentVisible(!isTableOfContentVisible);
  };

  const handleClick = (id) => {
    setSelectedSection(id);
    setTableOfContentVisible(false);
  
    const target = document.getElementById(id);
    const container = scrollRef.current;
  
    if (target && container) {
      const yOffset = 120; 
      const targetTop = target.getBoundingClientRect().top;
      const containerTop = container.getBoundingClientRect().top;
  
      const scrollOffset = targetTop - containerTop + container.scrollTop - yOffset;
  
      container.scrollTo({ top: scrollOffset, behavior: "smooth" });
    }
  };
  
  
  return (
    <>
      <title>Privacy Policies</title>
      <div className="px-[20px] lg:px-[100px]">
        <div>
          <h1 className="pt-12 text-center text-level-1 font-nonito_sans text-primary-text font-bold">
            Privacy Policies
          </h1>
        </div>
        <div className="mt-6 mb-6 w-full h-auto p-5 bg-white border-[#CBD5E0] border-[1px] rounded-[20px]">
          Privacy policies in kidsplan
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicies;
