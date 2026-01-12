import { CircleUserRound } from "lucide-react";

export default function Post({ postDetails }) {
  if (!postDetails) return null;

  const postDate = new Date(postDetails.creationDate);

  return (
    <div className="mx-auto md:w-[520px] w-[70%] bg-white rounded-xl shadow-md mb-10 p-6">
      <div className="flex flex-col">
        <div className="ml-1 primary-bg-color text-white p-1 rounded-xl w-[160px] text-center">
          {postDetails.category.charAt(0).toUpperCase() +
            postDetails.category.slice(1)}
        </div>
        <div className="flex justify-between items-start mb-6">
          <User userDetails={postDetails.author} />

          <div className="text-right text-sm text-gray-500">
            <p>{postDate.toLocaleDateString("en-GB")}</p>
            <p>{postDate.toLocaleTimeString("en-GB")}</p>
          </div>
        </div>
      </div>

      {/* Title + content */}
      <div className="mt-4">
        <h1 className="font-bold text-2xl mb-2">{postDetails.title}</h1>
        <p className="text-gray-700 leading-relaxed">{postDetails.content}</p>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Comments */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Comments</h2>

        {postDetails.comments?.length > 0 ? (
          <div className="space-y-3">
            {postDetails.comments.map((c, i) => (
              <div
                key={i}
                className="bg-gray-100 px-3 py-2 rounded-md text-gray-800"
              >
                {c.text}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

function User({ userDetails }) {
  return (
    <div className="flex items-center mt-3">
      {userDetails.pfp_url ? (
        <img
          src={userDetails.pfp_url}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <CircleUserRound size={40} className="text-gray-600" />
      )}

      <p className="font-semibold text-gray-800 ml-3">{userDetails.name}</p>
    </div>
  );
}
