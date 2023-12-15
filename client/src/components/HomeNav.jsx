import { useNavigate } from "react-router-dom";

export default function HomeNav() {
  const navigate = useNavigate();

  const onButtonHome = () => {
    navigate("/home");
  };

  const onAboutUsButton = () => {
    navigate("/about-us");
  };

  const onCats = () => {
    navigate("/cats");
  };

  const onLogin = () => {
    if (localStorage.getItem("access_token")) {
      localStorage.removeItem("access_token");
      navigate("/");
    } else {
      navigate("/");
    }
  };

  const onRegister = () => {
    navigate("/register");
  };

  const onFavCats = () => {
    navigate("/fav-cats");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-4 bg-primary">

        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => document.getElementById("nav-menu").classList.toggle("hidden")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <svg className="h-10 text-white" alt="logo" viewBox="0 0 10240 10240">
          {/* ... (kode lainnya) */}
        </svg>

        <ul id="nav-menu" className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <button
              type="button"
              className="text-white text-sm hover:text-gray-300"
              onClick={onButtonHome}
            >
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              className="text-white text-sm hover:text-gray-300"
              onClick={onAboutUsButton}
            >
              About us
            </button>
          </li>
          {localStorage.getItem('access_token') ? (
            <>
              <li>
                <button
                  type="button"
                  className="text-white text-sm hover:text-gray-300"
                  onClick={onCats}
                >
                  Cats
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-white text-sm hover:text-gray-300"
                  onClick={onFavCats}
                >
                  My Favorites
                </button>
              </li>
            </>
          ) : ""}
          <li className="lg:hidden">
            <button
              type="button"
              className="text-white text-sm hover:text-gray-300"
              onClick={onLogin}
            >
              {localStorage.getItem('access_token') ? "Log Out" : "Sign in"}
            </button>
          </li>
        </ul>

        <div className="lg:flex lg:items-center lg:space-x-6">
          <button
            className="px-6 py-2 text-sm font-bold text-gray-900 transition duration-200 hidden lg:inline-block lg:ml-auto lg:mr-3 bg-gray-50 hover:bg-gray-100 rounded-xl"
            onClick={onLogin}
          >
            {localStorage.getItem('access_token') ? "Log Out" : "Sign in"}
          </button>

          {localStorage.getItem('access_token') ? "" :
            <button
              className="px-6 py-2 text-sm font-bold text-gray-900 transition duration-200 hidden lg:inline-block lg:ml-auto lg:mr-3 bg-gray-50 hover:bg-gray-100 rounded-xl"
              onClick={onRegister}
            >
              Sign up
            </button>
          }
        </div>
      </nav>
    </>
  );
}
