import { CircleUserRound } from "lucide-react";

export function Post({ postDetails }) {
  const postDate = new Date(Date.parse(postDetails?.creationDate));

  return (
    <div className="mx-auto w-[520px] h-[470px] bg-white mb-[40px] rounded-lg">
      <div className="mx-6 h-full">
        {/*user and Date*/}
        <div className="flex justify-between items-center mb-3 pt-4">
          {/*user*/}
          <User userDetails={postDetails?.author} />
          {/*date*/}
          <div className="mt-3">
            <h1 className="font-medium">
              {postDate.toLocaleDateString("en-GB")}
            </h1>
            <h1 className="font-medium">
              {postDate.toLocaleTimeString("en-GB")}
            </h1>
          </div>
        </div>

        <div className="mx-[10px] mt-10">
          <h1 className="font-semibold text-xl">{postDetails?.title}</h1>
          <p>{postDetails?.content}</p>
        </div>
      </div>
    </div>
  );
}

function User({ userDetails }) {
  return (
    <div className="flex justify-between items-center mt-3">
      <CircleUserRound size={34} />
      <a href="#" className="text-[17px] pl-2 pb-1 font-semibold text-gray-800">
        {userDetails?.name}
      </a>
    </div>
  );
}
