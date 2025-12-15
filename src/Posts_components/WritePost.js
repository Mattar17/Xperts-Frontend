import { useReducer, useState } from "react";
import Cookies from "js-cookie";
import WritePostError from "./WritePostError";
import { ClipLoader } from "react-spinners";

const InitialState = {
  title: "",
  content: "",
  category: "",
};

const reducer = function (state, action) {
  return { ...state, ...action.payload };
};

export default function WritePost({ closeWritingPost, setPosts }) {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const api_url = process.env.REACT_APP_API_URL;

  const closeError = function () {
    setError(null);
  };

  const handleFormSubmit = async function (e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`${api_url}/api/posts/create-post`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authentication: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          setError(data.message);
        } else {
          setPosts((current) => [data.data, ...current]);
          closeWritingPost();
        }
      });
  };

  return (
    <>
      {error ? <WritePostError error={error} closeError={closeError} /> : null}
      <div className="mx-auto mt-8 w-[520px] bg-white shadow-lg p-6 rounded-xl">
        <div className="flex justify-end">
          <button
            onClick={closeWritingPost}
            className="text-xl font-bold text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => handleFormSubmit(e)}>
          {/* Category */}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="text-gray-700 font-semibold mb-1"
            >
              Category
            </label>

            <select
              id="category"
              className="border border-gray-300 rounded-lg p-2 text-gray-600 focus:ring-blue-500 focus:border-blue-500"
              required
              defaultValue=""
              value={state.category}
              onChange={(e) =>
                dispatch({ payload: { category: e.target.value } })
              }
            >
              <option value="" disabled>
                Select Post Category
              </option>
              <option value="engineering">Engineering</option>
              <option value="medical">Medical</option>
              <option value="graphic design">Graphic Design</option>
            </select>
          </div>

          {/* Title */}
          <div className="flex flex-col">
            <label
              htmlFor="post-title"
              className="text-gray-700 font-semibold mb-1"
            >
              Title
            </label>

            <input
              required
              id="post-title"
              type="text"
              placeholder="Post title"
              className="border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              value={state.title}
              onChange={(e) => {
                dispatch({ payload: { title: e.target.value } });
              }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <label
              htmlFor="post-content"
              className="text-gray-700 font-semibold mb-1"
            >
              Content
            </label>

            <textarea
              required
              id="post-content"
              placeholder="Post content"
              rows="4"
              className="border border-gray-300 rounded-lg p-2 resize-none focus:ring-blue-500 focus:border-blue-500"
              value={state.content}
              onChange={(e) => {
                dispatch({ payload: { content: e.target.value } });
              }}
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn w-full text-white font-semibold p-2 rounded-lg  transition"
          >
            {isLoading ? (
              <ClipLoader size={24} color="#FFFFFF" />
            ) : (
              <>Publish Post</>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
