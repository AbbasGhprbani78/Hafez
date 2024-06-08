import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes } from 'react-router-dom';
import routes from '../Routes';
export const IP = "https://apihafez.ariisco.com"
function App() {
  let router = useRoutes(routes);
  return (
    <>
      {router}
    </>
  )
}

export default App
