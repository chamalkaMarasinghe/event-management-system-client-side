import React, { useState, useCallback, useEffect } from "react";
import {referencesFormats} from "../../../constants/commonConstants";
import { useDropzone } from "react-dropzone";
import { Image } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";
import { ClipLoader } from "react-spinners";
import DraggableFileItem from "../ImageUploader/DraggableFileItem";
import FileItem from "../ImageUploader/FileItem";
import UploadImg from "../../../assets/Upload icon.svg";
import { useRef } from "react";
import { useLanguage } from "../../../context/language/language";
import { languageTranslatorUtil } from "../../../utils/languageTranslatorUtil";

const ImageUpload = ({
                         label = "Upload Files",
                         isRequired,
                         labelStyle,
                         outerContainerStyle = "",
                         onFileUpload,
                         onClick,
                         onBlur,
                         isLoading = false,
                         uploadText = "Jpeg, Jpg, png, pdf, doc, docx, zip files are allowed",
                         dragText = "Drag & drop files or Browse",
                         numberOfFiles,
                         accept = Object.values(referencesFormats),
                         borderStyle = "border-dashed",
                         isDisabled = false,
                         maximumSize = 30,
                         allowImageArrange = false,
                         error,
                         uploadFiles = [],
                         allowRemove = true,
                         isModel = false,
                         isForm = false, // New prop for border label
                     }) => {
    const {language} = useLanguage();
                        
    const [files, setFiles] = useState(uploadFiles || []);
    const [errorFiles, setErrorFiles] = useState([]);
    const [visible, setVisible] = useState(false);

    if(dragText === "Drag & drop files or Browse"){
    dragText = languageTranslatorUtil(language,"ms_values","dragDrop");
    }
    if(uploadText === "Jpeg, Jpg, png, pdf, doc, docx, zip files are allowed"){
        uploadText = languageTranslatorUtil(language,"ms_values","fileTypesAllowed");
    }

    if(label ==="Upload Files"){
        label = languageTranslatorUtil(language,"ms_values","uploadFiles");
    }

    const actionButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                actionButtonRef.current &&
                !actionButtonRef.current.contains(event.target)
            ) {
                onBlur()
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setFiles(Array.isArray(uploadFiles) ? uploadFiles : []);
    }, [uploadFiles]);

    const moveFile = useCallback(
        (dragIndex, hoverIndex) => {
            if (!allowImageArrange) return;
            setFiles((prevFiles) => {
                const newFiles = [...prevFiles];
                const draggedFile = newFiles[dragIndex];
                newFiles.splice(dragIndex, 1);
                newFiles.splice(hoverIndex, 0, draggedFile);
                onFileUpload(newFiles);
                return newFiles;
            });
        },
        [allowImageArrange, onFileUpload]
    );

    const onDrop = useCallback(
        (acceptedFiles, rejectedFiles) => {
            const oversizedFiles = acceptedFiles.filter(
                (file) => file.size > maximumSize * 1024 * 1024
            );
            let validFiles = acceptedFiles
                .filter((file) => file.size <= maximumSize * 1024 * 1024)
                .map((file) =>
                    Object.assign(file, {
                        preview: file.type.startsWith("image/")
                            ? URL.createObjectURL(file)
                            : null,
                    })
                );
            // Ensure no duplicate files
            validFiles = validFiles.filter(
                (file) => !files.some((existingFile) => existingFile.name === file.name)
            );
            // all error messages
            const newErrorFiles = [
                ...oversizedFiles.map((f) => ({
                    name: f.name,
                    error: `File size exceeds ${maximumSize}MB limit`,
                })),
                ...rejectedFiles.map((f) => ({
                    name: f.path,
                    error: "Invalid file type",
                })),
            ];
            // Check total files and add upload limit error if needed
            if (files.length + validFiles.length > numberOfFiles) {
                validFiles = validFiles.slice(0, numberOfFiles - files.length);
                newErrorFiles.push({
                    name: "Upload limit",
                    error: `You can only upload up to ${numberOfFiles} files.`,
                });
            }
            setErrorFiles(newErrorFiles);
            setFiles((prev) => [...prev, ...validFiles]);
            onFileUpload([...files, ...validFiles]);
        },
        [maximumSize, numberOfFiles, files, onFileUpload]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: accept.reduce((acc, format) => {
            acc[format.mime] = format.extensions;
            return acc;
        }, {}),
        onDrop,
        disabled: isDisabled || isLoading,
    });

    const removeFile = useCallback(
        (fileToRemove) => {
            setFiles((prev) => {
                const newFiles = prev.filter((f) => f.name !== fileToRemove.name);
                onFileUpload(newFiles);
                return newFiles;
            });
            if (fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
        },
        [onFileUpload]
    );

    const groupedFiles = Array.isArray(files)
        ? files.reduce((acc, file) => {
            const type = file.type.startsWith("image/") ? "images" : "documents";
            if (!acc[type]) acc[type] = [];
            acc[type].push(file);
            return acc;
        }, {})
        : { images: [], documents: [] };

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                className={twMerge("flex flex-col gap-2 w-full", outerContainerStyle)}
                ref={actionButtonRef}
                onClick={onClick}
            >
                {label && !isForm && (
                    <label
                        className={twMerge(
                            "text-light-gray font-inter font-medium text-sm",
                            labelStyle
                        )}
                    >
                        {label} {isRequired && <span className="text-light-red">*</span>}
                    </label>
                )}
                <div
                    className={`${
                        isModel ? "lg:p-5 p-2" : "p-5 lg:p-10"
                    } border border-[#CBD5E0] rounded-md relative`}
                >
                    {/* Border label - only shown when isForm is true */}
                    {label && isForm && (
                        <label
                            className={twMerge(
                                "absolute text-level-6 font-roboto text-light-gray font-medium -top-2.5 left-3 px-1 bg-white z-10",
                                labelStyle
                            )}
                        >
                            {label} {isRequired && <span className="text-light-red">*</span>}
                        </label>
                    )}
                    <div
                        {...getRootProps()}
                        className={`border-2 ${borderStyle} ${
                            errorFiles.length > 0 ? "border-yellow-400" : error ? "border-light-red" : "border-user-orange/30"
                        } rounded flex flex-col items-center justify-center ${
                            isDisabled || isLoading ? " cursor-not-allowed" : "cursor-pointer"
                        }
             ${
                            isModel
                                ? " p-4 md:p-8 min-h-[100px] h-[180px] "
                                : " min-h-[194px] p-8 h-auto"
                        } 
            `}
                    >
                        <input {...getInputProps()} />
                        {isLoading ? (
                            <div className="mb-4">
                                <ClipLoader
                                    loading={isLoading}
                                    speedMultiplier={1}
                                    size={24}
                                    color="var(--primary-color)"
                                />
                            </div>
                        ) : (
                            <div className="relative flex flex-col items-center justify-center">
                                <img
                                    src={UploadImg}
                                    alt="Upload"
                                    className="w-[60px] h-[52px] mb-3"
                                />
                                <p className="font-semibold text-base leading-6 text-center align-middle font-roboto text-light-gray">
                                    {dragText.split(" or ")[0]} or {" "}
                                    <span className="text-[#F65F18] font-bold underline">{dragText.split(" or ")[1]}</span>
                                </p>
                                <p className="font-roboto font-normal text-xs leading-6 text-center align-middle text-[#676767] mt-1">
                                    {uploadText}
                                </p>
                            </div>
                        )}
                    </div>
                    {errorFiles.length > 0 && (
                        <div className="mt-2 p-2 bg-yellow-50 rounded">
                            {errorFiles.map((file, index) => (
                                <p key={index} className="text-yellow-700 text-sm">
                                    {file.name}: {file.error}
                                </p>
                            ))}
                        </div>
                    )}
                    {error && (
                        <span className="text-light-red text-sm font-nonito_sans">
                            {error}
                        </span>
                    )}
                    {groupedFiles.images && groupedFiles.images.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-[0.875rem] font-semibold font-nonito_sans text-gray-700 mb-2">
                                {languageTranslatorUtil(language, "common_stringTemplates", "Images")}{" "}
                                {allowImageArrange && (
                                    <span className="text-sm font-normal font-nonito_sans text-gray-500">
                                       { languageTranslatorUtil(language,"ms_values","dragToReorder")}
                                    </span>
                                )}
                            </h3>
                            <Image.PreviewGroup
                                preview={{
                                    visible,
                                    onVisibleChange: (vis) => setVisible(vis),
                                }}
                            >
                                <div className="flex flex-col gap-2">
                                    {groupedFiles.images.map((file, index) => (
                                        <DraggableFileItem
                                            key={file.name}
                                            file={file}
                                            index={index}
                                            moveFile={moveFile}
                                            onRemove={removeFile}
                                            visible={visible}
                                            setVisible={setVisible}
                                            allowRemove={allowRemove}
                                            allowImageArrange={allowImageArrange}
                                        />
                                    ))}
                                </div>
                            </Image.PreviewGroup>
                        </div>
                    )}
                    {groupedFiles.documents && groupedFiles.documents.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-[0.875rem] font-semibold font-nonito_sans text-gray-700 mb-2">
                                Documents
                            </h3>
                            <div className="flex flex-col gap-2">
                                {groupedFiles.documents.map((file) => (
                                    <FileItem
                                        key={file.name}
                                        file={file}
                                        onRemove={removeFile}
                                        allowRemove={allowRemove}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DndProvider>
    );
};

export default ImageUpload;