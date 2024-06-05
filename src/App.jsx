import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes } from 'react-router-dom';
import routes from '../Routes';
export const IP = "http://185.79.156.226:9500"
function App() {
  let router = useRoutes(routes);
  return (
    <>
      {router}
    </>
  )
}

export default App
