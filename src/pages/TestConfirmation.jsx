import React from "react";
import { twMerge } from "tailwind-merge";
import { useConfirmation } from "../hooks/useConfirmation";

export const UseConfirmationTesting = () => {

    // importing the custom hook properties
    const { requestConfirmation, confirmation, confirm, cancel } = useConfirmation();

    
    // sample create method
    const handleCreate = async () => {

        // populating the model and await until the user select one of it's options
        const isConfirmed = await requestConfirmation({
            type: "create",
            title: "Create Item",
            message: "Are you sure you want to Create this item?",
            confirmText: "Yes, Create",
            cancelText: "Cancel",
        });

        // continue or terminating the rest flow of the method based on user selections of the model
        if (isConfirmed) {// continue flow
            console.log("Item Created!");
        } else {// terminating the flow
            console.log("Create operation canceled.");
        }
    };
    
    // sample assign method
    const handleAssign = async () => {

        // populating the model and await until the user select one of it's options
        const isConfirmed = await requestConfirmation({
            type: "assign",
            title: "Assign Item",
            message: "Are you sure you want to assign this item?",
            confirmText: "Yes, Assign",
            cancelText: "Cancel",
        });
        
        // continue or terminating the rest flow of the method based on user selections of the model
        if (isConfirmed) {// continue flow
            console.log("Item Assigned!");
        } else {// terminating the flow
            console.log("Assign operation canceled.");
        }
    };

    // sample edit method
    const handleEdit = async () => {

        // populating the model and await until the user select one of it's options
        const isConfirmed = await requestConfirmation({
            type: "edit",
            title: "Edit Item",
            message: "Are you sure you want to edit this item?",
            confirmText: "Yes, Edit",
            cancelText: "Cancel",
        });

        // continue or terminating the rest flow of the method based on user selections of the model
        if (isConfirmed) {// continue flow
            console.log("Item Edit!");
        } else {// terminating the flow
            console.log("Edit operation canceled.");
        }
    };
    
    // sample delete method
    const handleDelete = async () => {

        // populating the model and await until the user select one of it's options
        const isConfirmed = await requestConfirmation({
            type: "delete",
            title: "Delete Item",
            message: "Are you sure you want to delete this item?",
            confirmText: "Yes, Delete",
            cancelText: "Cancel",
        });

        // continue or terminating the rest flow of the method based on user selections of the model
        if (isConfirmed) {// continue flow
            console.log("Item deleted!");
        } else {// terminating the flow
            console.log("Delete operation canceled.");
        }
    };

    return(
        <>
            <div className="flex flex-col flex-grow justify-center items-center w-full h-screen bg-lime-100">
                <p className="text-level-1">Use Confirmation testing</p>
                <div className="p-6">
                    <div className="flex flex-row w-full gap-5">
                        <button className="px-4 py-2 bg-green-400 text-white rounded" onClick={handleCreate}>
                            Create Item
                        </button>
                        <button className="px-4 py-2 bg-blue-400 text-white rounded" onClick={handleAssign}>
                            Assign Item
                        </button>
                        <button className="px-4 py-2 bg-orange-400 text-white rounded" onClick={handleEdit}>
                            Edit Item
                        </button>
                        <button className="px-4 py-2 bg-red-400 text-white rounded" onClick={handleDelete}>
                            Delete Item
                        </button>
                    </div>

                    {/* Confirmation Modal */}
                    <ConfirmationModal
                        isOpen={confirmation.isOpen}
                        options={confirmation.options}
                        onConfirm={confirm}
                        onCancel={cancel}
                    />
                </div>
            </div>
        </>
    )
}

/* ===================================== actual model component ====================================================== */

const ConfirmationModal = ({ isOpen, options, onConfirm, onCancel }) => {
    
    if (!isOpen) return null;

    const typeBasedBgColor = 
    options.type === "create" ? "bg-green-100" :
    options.type === "assign" ? "bg-blue-100" : 
    options.type === "edit" ? "bg-orange-100" : 
    options.type === "delete" ? "bg-red-100" : "bg-white";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={twMerge("bg-white p-6 rounded-lg shadow-lg", typeBasedBgColor)}>
                <h2 className="text-lg font-bold">{options.title || "Confirm"}</h2>
                <p className="my-2">{options.message || "Are you sure?"}</p>
                <div className="flex justify-end space-x-2 mt-4">
                <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
                    {options.cancelText || "Cancel"}
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onConfirm}>
                    {options.confirmText || "OK"}
                </button>
                </div>
            </div>
        </div>
    );
};

/* ================================ custom hook: useConfirmation.js ================================================ */
/*
    export const useConfirmation = () => {
        const [confirmation, setConfirmation] = useState({
            isOpen: false,
            options: {},
            resolve: null,
        });

        const requestConfirmation = useCallback((options = {}) => {
            return new Promise((resolve) => {
                setConfirmation({ isOpen: true, options, resolve });
            });
        }, []);

        const confirm = () => {
            if (confirmation.resolve) confirmation.resolve(true);
            setConfirmation({ isOpen: false, options: {}, resolve: null });
        };

        const cancel = () => {
            if (confirmation.resolve) confirmation.resolve(false);
            setConfirmation({ isOpen: false, options: {}, resolve: null });
        };

        return {
            requestConfirmation,
            confirmation,
            confirm,
            cancel,
        };
    };
*/