import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { Tooltip } from "antd";
import "../../index.css";
import {
  addWishListedEventThunk,
  removeWishListedEventThunk,
} from "../../store/thunks/wishListThunks";
import { useState } from "react";
import { useThunk } from "../../hooks/useThunk";
import { useLanguage } from "../../context/language/language";
import { useDispatch } from "react-redux";
import showToast from "../../utils/toastNotifications";
import { languageTranslatorUtil } from "../../utils/languageTranslatorUtil";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeWishListedEvent, addWishListedEvent } from "../../store";
import { ConfirmationModal } from "../Model/ConfirmationModel";


// --- FIX: UI alignment for title and wishlist icon ---

const EventTitle = ({ eventTitle, event = null, showDeleteIcon = false }) => {
  const confirmationOptions = {
    type: "delete",
    title: "Remove from Wishlist",
    message: `Are you sure you want to remove "${
        event?.name || "this event"
    }" from your wishlist?`,
    confirmText: "Remove",
    cancelText: "Cancel",
  };

  const dispatch = useDispatch();
  const {language} = useLanguage();
  const [wishListed, setWishListed] = useState(showDeleteIcon);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [doAddWishList, isAddingWishList, errorAddingWishList] = useThunk(
      addWishListedEventThunk
  );
  const [doRemoveWishList, isRemovingWishList, errorRemovingWishList] =
      useThunk(removeWishListedEventThunk);

  const handleWishlistClick = () => {
    if (wishListed) {
      // Show confirmation modal for removal
      setShowConfirmModal(true);
    } else {
      // Add to wishlist directly
      addWishListedEventBtn();
    }
  };

  const handleConfirmRemoval = () => {
    removeWishListedEventBtn();
    setShowConfirmModal(false);
  };

  const handleCancelRemoval = () => {
    setShowConfirmModal(false);
  };

  async function removeWishListedEventBtn() {
    //remove from the store
    //remove from the local store
    //remove from the backend

    const result = await doRemoveWishList({ eventId: event._id });
    if (result.success) {
      dispatch(removeWishListedEvent(event));
      setWishListed(false);
      showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","eventWishlistRemoveSuccess"));
    } else {
      showToast(
          "error",
          result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","eventWishlistRemoveFailure")
      );
    }
  }

  async function addWishListedEventBtn() {
    const result = await doAddWishList({ eventId: event._id });

    if (result.success) {
      setWishListed(true);
      dispatch(addWishListedEvent(event));
      showToast("success", languageTranslatorUtil(language,"toastMessages","staticSuccessMsgs","wishListEventSuccess"));
    } else {
      showToast(
          "error",
          result?.error?.message || languageTranslatorUtil(language,"toastMessages","staticErrors","wishListEventFailure")
      );
    }
  }

  return (
      // --- FIXED: Flex container, align-items:center, prevent button from being absolutely positioned ---
      <div className="md:w-full flex items-center justify-between relative gap-2">
        <Tooltip
            title={eventTitle}
            placement="topLeft"
            overlayClassName="responsive-tooltip"
            getPopupContainer={(triggerNode) => triggerNode.parentElement}
            overlayStyle={{
              maxWidth: window.innerWidth < 768 ? "280px" : "400px",
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
        >
          <h1 className="text-[30px] md:text-text-[38px] leading-[100%] font-medium font-roboto text-dark-black mb-0 line-clamp-2 overflow-hidden flex-1 min-w-0">
            {eventTitle}
          </h1>
        </Tooltip>

        <ConfirmationModal
            isOpen={showConfirmModal}
            options={confirmationOptions}
            onConfirm={handleConfirmRemoval}
            onCancel={handleCancelRemoval}
        />
      </div>
  );
};

export default EventTitle;