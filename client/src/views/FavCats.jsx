import { useEffect, useState } from "react";
import HomeNav from "../components/HomeNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function FavCats() {
  // const navigate = useNavigate();
  const [cats, setCats] = useState([]);

  

  
  const fetchdata = async () => {
    try {
      const {data} = await axios.get(`http://localhost:3000/cats/fav-cats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const finalData = data
      setCats(finalData);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleDelete = async (id) => {
    try {
      // console.log(id, "<< id");
      // Ganti URL dengan endpoint delete favCats pada server Anda
      await axios.delete(`http://localhost:3000/cats/fav-cats/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      
      // navigate('/fav-cats')

      toast.success("Cat deleted from favorite list", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      // console.log(response.data.message);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchdata();
  }, [cats]);
  return (
    <>
          <ToastContainer/>
          <HomeNav />
          <div className="flex flex-wrap my-10 items-center justify-center">
            {cats&&cats.map((el) => (
              
              <div key={el.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                <div className="bg-white rounded-lg shadow-lg">
                  <img
                    src={el.imgUrl}
                    alt="img"
                    title="img"
                    className="object-cover w-full h-auto rounded-t-lg bg-cover"
                  />
                  <div className="flex flex-col justify-start w-full p-4">
                    <button
                      type="button"
                      onClick={() => handleDelete(el.id)}
                      className="px-4 py-2 my-4 text-white bg-primary hover:bg-secondary"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
}
