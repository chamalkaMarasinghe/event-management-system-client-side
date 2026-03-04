import {
  AiOutlineFilePdf,
  AiOutlineFileWord,
  AiOutlineFileZip,
  AiOutlineFile,
} from "react-icons/ai";
import { HiTrash } from "react-icons/hi";

const FileItem = ({ file, onRemove, allowRemove }) => {
  console.log("file", file);

  const getFileIcon = () => {
    switch (file.type) {
      case "application/pdf":
        return (
          <AiOutlineFilePdf className="lg:text-3xl text-2xl text-red-500" />
        );
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return (
          <AiOutlineFileWord className="lg:text-3xl text-2xl text-blue-500" />
        );
      case "application/zip":
      case "application/vnd.rar":
        return (
          <AiOutlineFileZip className="lg:text-3xl text-2xl text-yellow-500" />
        );
      default:
        return <AiOutlineFile className="lg:text-3xl text-2xl text-gray-500" />;
    }
  };

  const handleDownload = () => {
    if (file instanceof File) {
      // Handle local File objects
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(link.href);
    } else if (file.url) {
      // Handle remote URLs
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name || "download"; // Use fileName or a default name
      link.click();
    } else {
      console.error("Unsupported file type for download:", file);
    }
  };

  return (
    <div
      className={`
        border border-light-blue rounded-lg 
        p-1 pr-2 md:pr-6 
        h-auto sm:h-20 
        flex 
        w-full 
        justify-between 
        items-start sm:items-center
        relative
        cursor-pointer
      `}
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center pr-12 sm:pr-0">
        <div
          onClick={handleDownload}
          title="Click to download"
          className="w-16 sm:w-28 h-16 flex items-center justify-center"
        >
          {getFileIcon()}
        </div>
        <div className="flex items-center gap-1">
          <p
            title={file.name}
            className="text-sm font-semibold max-w-48 sm:max-w-[12.5rem] truncate block text-gray-600"
          >
            {file.name}
          </p>
          {file?.size && (
            <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              ({(file.size / (1024 * 1024)).toFixed(2)}MB)
            </span>
          )}
        </div>
      </div>

      <div className="absolute sm:relative right-2 top-1 sm:top-auto">
        {allowRemove && (
          <div
            className="w-7 h-7 md:w-8 md:h-8 border border-red-300 sm:border-none rounded-md bg-red-100 flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the download handler from being triggered
              onRemove(file);
            }}
          >
            <HiTrash className="text-red-600 text-[16px] md:text-xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileItem;
