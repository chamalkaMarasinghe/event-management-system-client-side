// NOTE: IMPORT OTHER CONSTANTS AND DEPENDENCIES
import Root from "../Layout/Root";
import {createBrowserRouter} from "react-router-dom";

// NOTE: IMPORT COMMON PAGES
import InternalServerErrorPage from "../pages/Kidsplan/InternalServerError";
import ErrorOccurPage from "../pages/Kidsplan/Error";
import NotFoundPage from "../pages/Kidsplan/NotFoundError";

// NOTE: IMPORT HOOKS
import {
    ProtectedClientRoute,
    PublicRoute,
} from "../components/protectedAndPublicRoute";

import PrivacyPolicies from "../pages/PrivacyPolicies";
import TermsAndCondition from "../pages/TermsAndCondition"
import AllOrders from "../components/Base/AllOrders";
import KidsplanClientHomePage from "../pages/Kidsplan/KidsplanClientHome";
import KidsplanClientContactUs from "../pages/Kidsplan/KidsplanClientContactUs";
import KidsplanClientAboutUs from "../pages/Kidsplan/KidsplanClientAboutUs";
import ExploreEvents from "../pages/Kidsplan/ExploreEvents";
import EventPage from "../pages/Kidsplan/EventPage";
import EventsCheckoutPage from "../pages/Kidsplan/EventsCheckoutPage";
import ClientServiceProProfile from "../pages/kidsPlanClient/ClientServiceProProfile";
import PaymentSucessful from "../pages/kidsPlanClient/PaymentSucessful";
import PaymentUnsucessful from "../pages/kidsPlanClient/PaymentUnsucessful";
import KidsplanClientRaiseComplaint from "../pages/Kidsplan/KidsplanClientRaiseComplaint";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorOccurPage/>,
        children: [
            {
                index: true,
                element: <KidsplanClientHomePage/>,
            },

            // NOTE: Public Routes
            {
                path: "",
                element: <PublicRoute/>,
                children: [
                    {
                        path: "privacy-policies",
                        element: <PrivacyPolicies/>
                    },
                    {
                        path: "terms-and-condition",
                        element: <TermsAndCondition/>
                    },
                    {
                        path: "contact-us",
                        element: <KidsplanClientContactUs/>
                    },
                    {
                        path: "about-us",
                        element: <KidsplanClientAboutUs/>
                    },
                    {
                        path: "events/:eventId",
                        element: <EventPage/>
                    },
                    {
                        path: "events/:eventId/checkout",
                        element: <EventsCheckoutPage/>
                    },
                    {
                        path: "events",
                        element: <ExploreEvents/>
                    },
                    {
                        path: "client-service-provider/:serviceProId",
                        element: <ClientServiceProProfile/>
                    },
                ],
            },

            // NOTE: protected routes
            {
                element: <ProtectedClientRoute/>,
                children: [
                    {
                        path: "all-orders",
                        element: <AllOrders/>
                    },
                    {
                        path: "payment-successful",
                        element: <PaymentSucessful/>
                    },
                    {
                        path: "payment-unsuccessful",
                        element: <PaymentUnsucessful/>
                    },
                    {
                        path: "create-event",
                        element: <KidsplanClientRaiseComplaint/>
                    },
                ],
            },
        ],
    },

    // NOTE: Error Pages
    {
        path: "/server-error",
        element: <InternalServerErrorPage/>,
        errorElement: <ErrorOccurPage/>

    },
    {
        path: "/error",
        element: <ErrorOccurPage/>,
        errorElement: <ErrorOccurPage/>

    },
    {
        path: "*",
        element: <NotFoundPage/>,
        errorElement: <ErrorOccurPage/>
    },
]);

export default router;
