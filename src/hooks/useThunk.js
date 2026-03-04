import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAuth } from "../store";
import showToast from "../utils/toastNotifications";
import { errorMessages } from "../constants/frontendErrorMessages";
import { useLanguage } from "../context/language/language";
import { LANGUAGE } from "../constants/commonConstants";
import { ErrorCodes } from "../constants/errorCodes";
import { languageTranslatorUtil } from "../utils/languageTranslatorUtil";
// import { validateError } from "../helpers/validateError";

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const runThunk = useCallback(
    async (arg) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await dispatch(thunk(arg)).unwrap();
        return { success: true, response: response };
      } catch (err) {
        console.log(err);

        const errorCode = err.code || 500;
        const errorMessage = err.message || languageTranslatorUtil(language,"ms_values","internalServerError");
        const customCode = err?.name || "Axios Error";

        const validatedError = {
          code: errorCode,
          message: errorMessage,
          customCode: customCode,
        };

        setError(validatedError);

        // check if the err code is 6010, if it is, that user is a suspended user, so we should redirect them to the home page
        if (customCode && (customCode === 6010 || customCode === "6010")) {
          dispatch(updateAuth({ user: { isSuspended: true } }));
          validatedError.message = errorMessages.SUSPENDED_TASKER_ACCOUNT;
          showToast("error", validatedError.message);
          setTimeout(() => {
            navigate("/");
          }, 3000);
          return { success: false, error: validatedError };
        }

        if (err.code === 500 || err.code === "500") {
          navigate("/server-error");
          return { success: false, error: validatedError };
        }
        
        if(language === LANGUAGE.POLISH.value && validatedError?.message?.split(":")?.lenghth < 2){
          validatedError.message =languageTranslatorUtil(language,"toastMessages","dynamicErrors",validatedError?.customCode) || validatedError.message;
          setError(validatedError);
        }
        
        return { success: false, error: validatedError };
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, thunk, navigate,language]
  );

  return [runThunk, isLoading, error];
}
