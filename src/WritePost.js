export default function WritePost({ closeWritingPost }) {
  return (
    <div className="mx-auto mt-[50px] w-[520px] h-[470px] bg-white mb-[40px] rounded-lg">
      <h1>Write your post</h1>
      <button onClick={closeWritingPost}>&times;</button>
    </div>
  );
}
