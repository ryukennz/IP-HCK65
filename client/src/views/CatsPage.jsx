import { useEffect, useState } from "react";
import axios from "axios";
import "dotenv";
import HomeNav from "../components/HomeNav";

export default function CatsPage() {
  const [cats, setCats] = useState([]);

  const [loading, setLoading] = useState(false);

  const url = `http://localhost:3000/cats`;

  useEffect(() => {
    // console.log(loading, "<<< ini loading");
    const asyncFunction = async () => {

      setLoading(true);

      const data = await axios.get(url);
      // console.log(data, "<<< cek data");
      const setData = data.data.data
      setCats(setData);

      setLoading(false);
    }
    asyncFunction();

  }, []);
  
  const handleOnClick = async (id) => {
    try {
      
      await axios.post(`http://localhost:3000/cats`, {
        url : id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      } )
      console.log(localStorage.access_token);

    } catch (error) {
     console.log(error); 
    }
  }
  

  return (
    <div>
    <HomeNav />
    <div className="flex flex-wrap gap-20 justify-center">
      {loading ? ( <h1 className="flex text-center "> Loading... </h1>) : (
          <>
          {cats.map(el => {
            return (

              <>
            <div
              
              className="grid grid-col-5 items-center justify-center w-full bg-white rounded-lg shadow-lg md:w-64"
            >
              <img
              src={el.url}
                alt="img"
                title="img"
                className="object-cover w-full h-auto rounded-t-lg bg-cover"
              />
              <div
                className="flex flex-col justify-start w-full p-4"
              >
                <button
                  type="button"
                  id={el.id}
                  onClick={() => handleOnClick(el.url)}
                  className="px-4 py-2 my-4 text-white bg-primary hover:bg-secondary"
                >
                  Favorites
                </button>
              </div>
            </div>
            </>
            )
            
          })}
          </>
      )}
      </div>
  </div>
  )
}