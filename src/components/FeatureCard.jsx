const FeatureCard = ({ title, description, featureCardImg }) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white border-b-2 border-[#dde1e6] rounded-lg w-full lg:w-[276px]">
      <img src={featureCardImg} alt={title} className="w-[37px] h-[37px]" />
      <div className="flex flex-col gap-2.5">
        <h3 className="font-nonito_sans font-bold text-[22px] leading-[22px] tracking-[0.5px] text-primary-text">
          {title}
        </h3>
        <p className="font-inter font-normal text-level-6 leading-6 tracking-[0.3px] text-content">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
