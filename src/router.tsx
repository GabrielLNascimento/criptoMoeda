import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/detail/:cripto",
                element: <Details />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export { router };
