import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";


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

  const onFavCats = () => {
    navigate("/fav-cats");
  };

  const [user, setUser] = useState({
    id: 0,
    email: "",
    subscription: "free",
  });

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const fetchUser = async () => {
    const { data } = await axios.get("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    setUser(data);
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      fetchUser();
    }
  }, [fetchUser])

  

  const handleOnUpgrade = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/payments/midtrans/token",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
      window.snap.pay(data.transaction_token, {
        onSuccess: async function () {
          const form = {
            orderId: data.orderId,
          };

          await axios.patch("http://localhost:3000/users/me/upgrade", form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });

          toast.success("Success upgrade account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isLogin = useMemo(() => {
    return !!localStorage.getItem("access_token");
  }, []);

  const isFree = isLogin && user.subscription === "free";
  const isPremium = isLogin && user.subscription === "premium";
  

  return (
    <>
    <ToastContainer/>
      <nav className="flex items-center justify-between px-4 py-4 bg-primary">
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() =>
              document.getElementById("nav-menu").classList.toggle("hidden")
            }
          >
            
          </button>
        </div>

        <a className="flex items-center ml-6" href="#">
              <h5>{isPremium ? "Premium" : "CatMeme"}</h5>
            </a>

        <ul
          id="nav-menu"
          className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-6"
        >
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
          <li className="lg:hidden">
            <button
              type="button"
              className="text-white text-sm hover:text-gray-300"
              // onClick={onLogin}
            >
              {localStorage.getItem("access_token") ? "Log Out" : "Sign in"}
            </button>
          </li>
        </ul>

        <div className="lg:flex lg:items-center lg:space-x-6">
          {isFree && (
          <button
            className="px-6 py-2 text-sm font-bold text-gray-900 transition duration-200 hidden lg:inline-block lg:ml-auto lg:mr-3 bg-gray-50 hover:bg-gray-100 rounded-xl"
            onClick={handleOnUpgrade}
          >
            Upgrade
          </button>
          )}
          {isLogin && (
          <button
            className="px-6 py-2 text-sm font-bold text-gray-900 transition duration-200 hidden lg:inline-block lg:ml-auto lg:mr-3 bg-gray-50 hover:bg-gray-100 rounded-xl"
            onClick={handleLogOut}
          >
            Logout
          </button>

          )}

         
        </div>
      </nav>
    </>
  );
}
