import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes, useNavigate } from 'react-router-dom';
import routes from '../Routes';
import { useEffect } from 'react';
import axios from 'axios';
export const IP = "https://apihafez.ariisco.com"
function App() {

  const navigate = useNavigate()

  useEffect(() => {
    const isUserLogin = async () => {
      const refresh = localStorage.getItem('refresh');
      if (refresh) {

        const body = {
          refresh: refresh,
        };

        try {
          const response = await axios.post(`${IP}/user/token/refresh/`, body);

          if (response.status === 200) {
            window.localStorage.removeItem('access');
            window.localStorage.setItem('access', response.data.access);
            navigate('/')
          }

        } catch (e) {
          if (e.response.status === 401) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            navigate('/login')
          }
        }
      } else {
        navigate('/login')
      }
    }

    isUserLogin()

  }, [])

  let router = useRoutes(routes);
  return (
    <>
      {router}
    </>
  )
}

export default App
