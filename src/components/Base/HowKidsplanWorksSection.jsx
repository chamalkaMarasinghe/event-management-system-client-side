import WorkStepCard from "./WorkStepCard";
import { useLanguage } from "../../context/language/language";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";

const HowKidsplanWorksSection = ({ workSteps }) => {
  const { language } = useLanguage();
  return (
    <div className="bg-white rounded-xl py-[32px] md:py-[56px] lg:py-[72px] px-[36px] md:px-[52px] lg:px-[88px] xl:px-[78px] items-center justify-center">
      <div className="font-medium uppercase text-subheadings/60 text-level-5">
        {languageTranslatorUtil(language, "home_page", "growBusinessSubtitle")}
      </div>
      <div className="font-medium text-[40px] mt-3">
            {languageTranslatorUtil(language,"ms_values","howKidsplan")} <span className="text-primary">{languageTranslatorUtil(language,"ms_values","works")}</span>
      </div>
      <div className="flex flex-wrap fo gap-6 items-center justify-center mt-[40px]">
        {workSteps.map((step, index) => (
          <WorkStepCard
            key={index}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HowKidsplanWorksSection;
