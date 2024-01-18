import { useSelector, useDispatch } from "react-redux";
import HomeNav from "../components/HomeNav";
// import { fetchCat } from '../stores/catSlice';
import { useEffect } from "react";
import { fetchDataCat } from "../stores/fetchDataAsync";

export default function CatsPage() {
  const { data } = useSelector((state) => state.cats);

  // console.log(data, "<<< dataaa");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataCat());
  }, []);

  return (
    <>
      <div>
        <HomeNav />
        <div className="flex flex-wrap gap-20 justify-center my-10">
          {/* <h1 className="flex text-center "> Loading... </h1> */}
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
                        // onClick={() => handleOnClick(el.url)}
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
        </div>
      </div>
    </>
  );
}
