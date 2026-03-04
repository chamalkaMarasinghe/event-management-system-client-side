import WorkStepCard from "./WorkStepCard";

const HowKidsplanWorksSection = ({ workSteps }) => {
  return (
    <div className="bg-white rounded-xl py-[32px] md:py-[56px] lg:py-[72px] px-[36px] md:px-[52px] lg:px-[88px] items-center justify-center">
      <div className="font-medium uppercase text-subheadings/60 text-level-5">
        Get ready for the new experience
      </div>
      <div className="font-medium text-[40px] mt-3">
        How kidsplan <span className="text-primary">Works</span>
      </div>
      <div className="flex flex-wrap gap-6 items-center justify-center mt-[40px]">
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
