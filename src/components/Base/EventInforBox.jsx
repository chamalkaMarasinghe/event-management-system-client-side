import React from 'react';
import { useLanguage } from '../../context/language/language';
import { languageTranslatorUtil } from '../../utils/languageTranslatorUtil';

const EventInforBox = () => {
  const {language} = useLanguage();
  const steps = [
    {
      number: 1,
      text:  languageTranslatorUtil(language,"event_details_page","open_event_plan_section","step1","description")
    },
    {
      number: 2,
      text: languageTranslatorUtil(language,"event_details_page","open_event_plan_section","step2","description")
    },
    {
      number: 3,
      text: languageTranslatorUtil(language,"event_details_page","open_event_plan_section","step3","description")
    },
    {
      number: 4,
      text: languageTranslatorUtil(language,"event_details_page","open_event_plan_section","step4","description")
    }
  ];

  return (
      <div className="h-full flex justify-center items-center w-full">
        <div className="border-2 w-full h-full md:h-full flex flex-col bg-[#C5C5C559] rounded-xl xs:p-2 lg:p-5 p-2 max-w-full sm:max-w-[400px] md:max-w-full mx-auto">
          <h2 className="xs:font-normal xs:text-lg xs:p-1 md:font-normal md:text-lg md:p-2 leading-[100%] tracking-[0] capitalize font-inter text-deep-gray lg:mb-5 lg:p-0 lg:text-level-4 lg:font-medium mb-2">
            {languageTranslatorUtil(language,"ms_values","eventPlanProcedure")}
          </h2>
          <ol className="md:space-y-5 lg:space-y-7 space-y-3 mb-0">
            {steps.map((step) => (
                <li
                    key={step.number}
                    className="flex items-start md:pl-2 pl-1 gap-2 xs:gap-2"
                >
                  <div
                      className="flex-shrink-0 flex items-center justify-center rounded-full md:p-3 bg-orange-500 text-white font-semibold mr-2"
                      style={{
                        width: '1.2rem',
                        height: '1.2rem',
                        fontSize: '1rem',
                        marginTop: 0,
                        marginBottom: 0,
                        alignSelf: 'flex-start'
                      }}
                  >
                    {step.number}
                  </div>
                  <p className="text-gray-700 xs:text-sm md:text-xs md:pr-2 lg:text-level-5 text-xs leading-tight mb-0">
                    {step.text}
                  </p>
                </li>
            ))}
          </ol>
        </div>
      </div>
  )
};

export default EventInforBox