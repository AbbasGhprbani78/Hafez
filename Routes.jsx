import Home from "./src/Pages/Home/Home";
import SignUp from "./src/Pages/SignUp/SignUp";
import Paziresh from "./src/Pages/Paziresh/Paziresh";
import Login from './src/Pages/Login/Login'
import Draft from "./src/Pages/Draft/Draft";
import AllForm from "./src/Pages/AllForm/AllForm";
const routes = [
    { path: "/", element: <Home /> },
    { path: "/draft", element: <Draft /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/paziresh", element: <Paziresh /> },
    { path: "/login", element: <Login /> },
    { path: "/allform", element: <AllForm /> }

]

export default routes