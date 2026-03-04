const FormSectionHeading = ({ index, title }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white font-inter font-medium text-sm">
        <span>{index}</span>
      </div>
      <h2 className="text-dark font-inter font-medium text-[20px] mb-0">
        {title}
      </h2>
    </div>
  );
};

export default FormSectionHeading;
