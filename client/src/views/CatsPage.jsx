import { useEffect, useState } from "react";
import axios from "axios";
import "dotenv";
import HomeNav from "../components/HomeNav";

export default function CatsPage() {
  const [cats, setCats] = useState([]);

  const [loading, setLoading] = useState(false);

  const url = `https://api.thecatapi.com/v1/breeds?limit=20&page=0`;

  useEffect(() => {
    const asyncFunction = async () => {
      setLoading(true);
      const { data } = await axios.get(url, {
        headers: {
          "x-api-key": import.meta.env.VITE_CATS,
        },
      });
      setCats(data);
      setLoading(false);
    };
    asyncFunction();
  }, []);

  return (
      <div>
        <HomeNav />
      {loading ? <h1 className="flex text-center ">Loading...</h1> : <><h1>Cats</h1><>
              <div
                  id="whoobe-3fery"
                  className="flex flex-col items-center justify-center w-full bg-white rounded-lg shadow-lg md:w-64"
              >
                  <img
                      src="https://res.cloudinary.com/moodgiver/image/upload/v1633344243/adventure_woman_rujic1.webp"
                      alt="img"
                      title="img"
                      className="object-cover w-full h-auto rounded-t-lg"
                      id="whoobe-ixxe5" />
                  <div
                      id="whoobe-1okdg"
                      className="flex flex-col justify-start w-full p-4"
                  >
                      <h4 className="text-3xl border-b-2" id="whoobe-3mr7n">
                          Info Card
                      </h4>
                      <p className="my-4" id="whoobe-950fw">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac
                          tortor dignissim convallis aenean. Imperdiet massa tincidunt nunc
                          pulvinar.
                      </p>
                      <button
                          value="button"
                          className="px-4 py-2 my-4 text-white bg-blue-500 hover:bg-blue-700"
                          id="whoobe-jkkr2"
                      >
                          Read more
                      </button>
                  </div>
              </div>
          </></>}
    </div>
  );
}
