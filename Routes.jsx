import Home from "./src/Pages/Home/Home";
import SignUp from "./src/Pages/SignUp/SignUp";
import Paziresh from "./src/Pages/Paziresh/Paziresh";
import Login from './src/Pages/Login/Login'
const routes = [
    { path: "/", element: <Home /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/paziresh", element: <Paziresh /> },
    { path: "/login", element: <Login /> }
]

export default routes