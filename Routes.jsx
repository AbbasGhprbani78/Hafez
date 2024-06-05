import Home from "./src/Pages/Home/Home";
import SignUp from "./src/Pages/SignUp/SignUp";
import Paziresh from "./src/Pages/Paziresh/Paziresh";
const routes = [
    { path: "/", element: <Home /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/paziresh", element: <Paziresh /> }
]

export default routes