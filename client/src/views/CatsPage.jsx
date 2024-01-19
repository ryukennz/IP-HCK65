import { useSelector, useDispatch } from "react-redux";
import HomeNav from "../components/HomeNav";
// import { fetchCat } from '../stores/catSlice';
import { useEffect, useMemo, useState } from "react";
import { fetchDataCat } from "../stores/fetchDataAsync";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function CatsPage() {
  const { data } = useSelector((state) => state.cats);

  // console.log(data, "<<< dataaa");

  const dispatch = useDispatch();

  const handleOnClick = async (id) => {
    try {
      await axios.post(
        `http://localhost:3000/cats`,
        {
          url: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      toast.success("Cat added to favorite list", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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

  const [user, setUser] = useState({
    id: 0,
    email: "",
    subscription: "free",
  });

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
  }, []);

  const isLogin = useMemo(() => {
    return !!localStorage.getItem("access_token");
  }, []);

  const isFree = isLogin && user.subscription === "free";
  const isPremium = isLogin && user.subscription === "premium";

  useEffect(() => {
    dispatch(fetchDataCat());
  }, []);

  return (
    <>
      <ToastContainer />
      <div>
        <HomeNav />
        <div className="flex flex-wrap gap-20 justify-center my-10">
          {/* <h1 className="flex text-center "> Loading... </h1> */}
          <>
            {isFree && (
              <>
                {data?.slice(0, 4).map((el) => {
                  return (
                    <>
                      <div className="grid grid-col-5 items-center justify-center w-full bg-white rounded-lg shadow-lg md:w-64">
                        <img
                          src={el.url}
                          alt="img"
                          title="img"
                          className="object-cover w-full h-auto rounded-t-lg bg-cover"
                        />
                        <div className="flex flex-col justify-start w-full p-4">
                          <button
                            type="button"
                            id=""
                            onClick={() => handleOnClick(el.url)}
                            className="px-4 py-2 my-4 text-white bg-primary hover:bg-secondary"
                          >
                            Favorites 🐾
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
            {isPremium && (
              <>
                {data.map((el) => {
                  return (
                    <>
                      <div className="grid grid-col-5 items-center justify-center w-full bg-white rounded-lg shadow-lg md:w-64">
                        <img
                          src={el.url}
                          alt="img"
                          title="img"
                          className="object-cover w-full h-auto rounded-t-lg bg-cover"
                        />
                        <div className="flex flex-col justify-start w-full p-4">
                          <button
                            type="button"
                            id=""
                            onClick={() => handleOnClick(el.url)}
                            className="px-4 py-2 my-4 text-white bg-primary hover:bg-secondary"
                          >
                            Favorites 🐾
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
}
