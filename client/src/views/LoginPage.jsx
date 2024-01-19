import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "dotenv";

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleCredentialResponse = async (response) => {
    try {
      const google_token = response.credential
      // console.log(google_token, "< google");
      const {data} = await Axios.post('http://localhost:3000/users/google-login', {google_token: google_token});
      localStorage.setItem('access_token', data.access_token);

      navigate('/home')

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: '758065923784-2kh44g7bt9ivb1kbnvrfcn4qfij2986l.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    })
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {theme: "outline", size: "large"}
    )
  }, [])
  

  const handleOnChange = (event) => {
    setLogin((prevValue) => {
      return {
      ...prevValue,
      [event.target.name]: event.target.value,
    }
    })
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    // console.log(login, ',,,');
    try {
      const response  = await Axios.post(
        "http://localhost:3000/users/login",
        login
      );

      const responseData = response.data.access_token
      // console.log(response, "<< ini response")
  
      localStorage.setItem("access_token", responseData);
      
      // console.log("akjsdlkajsd");
      
      toast.success("Login success ✅", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    }
  };

  const onRegisterNav = () => {
    navigate("/register");
  }

  return (
    <>
      <ToastContainer />
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 border sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg border-opacity-70 backdrop-blur bg-secondary">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">SIGN IN</h1>
            <p className="mt-4 text-gray-500">Sign in to your account</p>
          </div>
          <form
            className="max-w-md mx-auto mt-8 mb-0 space-y-4"
            onSubmit={handleOnSubmit}
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter email"
                  name="email"
                  value={login.email}
                  onChange={handleOnChange}
                />
                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter password"
                  name="password"
                  value={login.password}
                  onChange={handleOnChange}
                />
                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                  <button 
                  className="underline"
                  onClick={onRegisterNav}
                  >Sign up</button>
              </p>
              <button
                type="submit"
                className="inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
              >
                Sign in
              </button>
              
            </div>
            <div 
            id="buttonDiv"
            type="button"
            >
            </div>
          </form>
        </div>
        <div className="relative w-full h-64 sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt="Welcome"
            src="https://wallpaperaccess.com/download/1920x1080-cat-5922864"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
      </section>
    </>
  );
}
