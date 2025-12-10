import type { JSX } from "react";

import {API_LOGIN_URL, API_MARCA_URL} from "../../shared/config"

export default function Links(): JSX.Element {

    return(
        <div>
            <span>
                <a href={API_LOGIN_URL}  target='blank'> api users post</a>  | 
                <a href={API_MARCA_URL}  target='blank'> api marcas</a>  | 
            </span>
            <hr></hr>
            <span>
        <a href="https://htmlcolorcodes.com/" target='blank'> html colors</a> | 
      <a href="https://redketchup.io/color-picker" target='blank'> color picker</a> | 

      <a href="https://redux-toolkit.js.org/introduction/getting-started" target='blank'> Redux Toolkit</a> | 
      <a href="https://redux.js.org/api/api-reference" target='blank'> Redux</a> | 

      <a href="https://reactcommunity.org/react-modal/" target='blank'> react-modal</a> | 
      <a href="https://react-hot-toast.com/docs" target='blank'> toast notifications</a> | 
      <a href="https://react.dev/reference/react-dom/components/select" target='blank'> react.dev</a> | 
      
      <a href="https://redis-py.readthedocs.io/en/stable/index.html" target='blank'> redis-py</a> | 
      <a href="https://ant.design/components/overview/" target='blank'> ANT design</a> | 
      <a href="https://tailwindcss.com/docs/installation/using-vite" target='blank'> Tailwind CSS</a> | 
            </span>

       
        </div>
    )
}