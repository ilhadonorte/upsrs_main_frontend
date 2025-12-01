import type { Route } from ".react-router/types/app/+types/root";
import { useEffect, useRef, useState } from "react";
import { Form, Link, redirect, useActionData, useNavigate } from "react-router";
import { API_LOGIN_URL } from "shared/config";


export async function clientAction({request}:Route.ClientActionArgs) {
  // Здесь вы бы обрабатывали данные формы и делали fetch к вашему API
  let formData = await request.formData();
  // formData.forEach((value, key) => {console.log(`${key}: ${value}`)});
   formData.append('email3', 'john.doe@example.com');
  // formData.forEach((value, key) => {console.log(`${key}: ${value}`)});
  // console.log("loginPage action formData:", formData)
  let credentials = Object.fromEntries(formData.entries())
  // console.log("loginPage action credentials:", credentials)
  try {
    const result = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(credentials),
        // credentials: 'include', // Include cookies for cross-origin requests
    })
    // console.log("result from server: ", result)
    if(!result) {
      console.log("loginPage action no response from server"); 
      throw new Error("No response from server");
    }

    else if (!result.ok) {
      console.log("loginPage action response is NOT ok:", await result.json());
        if (result.status === 401) {console.log("loginPage action 401 Unauthorized");}
        throw new Error(`Response status error: ${result.status}`);
      }

    const tokens =  await result.json()
    console.log("loginPage action tokens:", tokens);
    return tokens
  
  } catch (error) {
    console.error("loginPage action error:", error);
    //отработать ситуацик когда сервер недоступен 2025-11-29+
    if(!error?.response) {console.log("Server not responding?")}
    else if (error.response?.status === 400) {console.log("wrong username or password")}
    else if (error.response?.status === 401) {console.log("is not autorized")}
    else {console.log("Login failed")}
  }

}



// async function submitManual(e: React.FormEvent<HTMLFormElement>) {
//   e.preventDefault();
//   const form = e.target;
//   const formData = new FormData();
//   // formData.append('email', form.email.value);

//   const resp = await fetch(API_LOGIN_URL, {
//     method: 'POST',
//     body: formData,

//   });

//   const data = await resp.json();
//   console.log(data);
// }



export default function LoginPage() {
  const [errMsg, setErrMsg] =  useState<string>("Пока ничего");
  let navigate = useNavigate();
  const errRef = useRef<HTMLParagraphElement>(null);
  const actionData = useActionData();
  const usernameRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  if (!actionData) {
    console.error("Error: loginPage no actionData yet (no server response)");
    // setErrMsg("No response from server yet");
  }
  else if (actionData.errors) {
    console.error("Error in hook from server:", actionData.error);  
    // setErrMsg("Ошибка авторизации: " + actionData.error);
  }
  else {
    console.log("loginPage actionData from hook:", actionData);
    // setErrMsg("Успешная аутентификация");
    // navigate("/marca"); глючило 2025-11-29 
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Used parts searching and reselling system: login page</h2>

      <Form 
        id="loginForm" 
        className="space-y-4" 
        method="post"
        // onSubmit={submitManual}
        // action = "/api/v1/user/login"
        noValidate>
      {/* <!-- Email --> */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Электронная почта</label>
        <input
          id="username2"
          name="username"
          type="text"
          required
          ref={usernameRef}
          autoComplete="username"
          placeholder=""
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-xs text-red-600 hidden" id="emailError">Укажите корректную электронную почту</p>
      </div>

      {/* <!-- Password --> */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          // minLength="6"
          placeholder="••••••••"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-xs text-red-600 hidden" id="passwordError">Пароль должен содержать минимум 6 символов</p>
      </div>

      {/* <!-- Remember me и забыли пароль (опционально) --> */}
      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm text-gray-600">
          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
          <span className="ml-2">Запомнить меня</span>
        </label>
        <a href="#" className="text-sm text-blue-600 hover:underline">Забыли пароль?</a>
      </div>

      {/* <!-- Кнопка --> */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Войти
      </button>

      {/* <!-- Сообщение об ошибке/успехе (пример) --> */}
      <p id="formMessage" className="text-sm text-center text-green-600 hidden">Успешная аутентификация (пример)</p>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    </Form>
  </div>
</div>
    </>
  );
}

{/* <body className="min-h-screen bg-gray-100 flex items-center justify-center"> */}


  // <script>
  //   // Простая клиентская валидация (для примера)
  //   const form = document.getElementById('loginForm');
  //   const emailInput = document.getElementById('email');
  //   const passwordInput = document.getElementById('password');
  //   const emailError = document.getElementById('emailError');
  //   const passwordError = document.getElementById('passwordError');
  //   const formMessage = document.getElementById('formMessage');

  //   form.addEventListener('submit', function(e) {
  //     e.preventDefault();
  //     let ok = true;

  //     // Простая валидация email
  //     if (!emailInput.value || !/.+@.+\..+/.test(emailInput.value)) {
  //       emailError.classNameList.remove('hidden');
  //       ok = false;
  //     } else {
  //       emailError.classNameList.add('hidden');
  //     }

  //     // Простой пароль
  //     if (!passwordInput.value || passwordInput.value.length < 6) {
  //       passwordError.classNameList.remove('hidden');
  //       ok = false;
  //     } else {
  //       passwordError.classNameList.add('hidden');
  //     }

  //     if (ok) {
  //       // Здесь вы бы делали fetch к вашему API
  //       formMessage.textContent = 'Успешная авторизация (пример)';
  //       formMessage.classNameList.remove('hidden');
  //       // Сброс формы или редирект
  //     } else {
  //       formMessage.classNameList.add('hidden');
  //     }
  //   });
  // </script>
