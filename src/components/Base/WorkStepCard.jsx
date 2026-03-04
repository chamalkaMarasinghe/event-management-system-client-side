import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import { useLanguage } from "../../context/language/language";

const WorkStepCard = ({
  stepNumber = 1,
  index = 0,
  title = "Discover Events",
  description = "Browse events or explore categories you love.",
}) => {
  const { language } = useLanguage();

  let translatedTitle = title;
  let translatedDescription = description;

  switch (stepNumber) {
    case 1:
      translatedTitle = languageTranslatorUtil(
        language,
        "common_stringTemplates",
        "step1Title"
      );
      translatedDescription = languageTranslatorUtil(
        language,
        "common_stringTemplates",
        "step1Description"
      );
      break;

    case 2:
      translatedTitle = languageTranslatorUtil(
        language,
        "common_stringTemplates",
        "step2Title"
      );
      translatedDescription = languageTranslatorUtil(
        language,
        "common_stringTemplates",
        "step2Description"
      );
      break;

    default:
      translatedTitle = languageTranslatorUtil(
        language,
        "common_stringTemplates",
        "step3Title"
      );
      translatedDescription = languageTranslatorUtil(
        language,
        "common_stringTemplates",
        "step3Description"
      );
      break;
  }

  return (
    <div className="bg-[#F7F7F8] rounded-[8px] min-h-[248px] py-[35px] lg:py-[35px] lg:h-[248px] flex items-center px-[45px] w-[352px]">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex bg-dark-black text-center w-[50px] h-[50px] rounded-xl text-white items-center justify-center font-semibold text-level-3">
          {stepNumber}
        </div>
        <div className="font-semibold text-dark-black text-level-3">
          {translatedTitle}
        </div>
        <div className="text-level-5 font-normal text-deep-black">
          {translatedDescription}
        </div>
      </div>
    </div>
  );
};

export default WorkStepCard;
