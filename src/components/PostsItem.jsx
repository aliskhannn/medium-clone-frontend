const PostsItem = ({ post }) => {
  return (
    <div className="flex flex-col gap-3 w-1/2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span>Kostya Stepanov in UX Planet</span>
        </div>
        <span>|</span>
        <div>Oct 17, 2023</div>
      </div>

      <div className="flex flex-col gap-2">
        <span>Back-End & Web Development Trends For 2024</span>
        <p>
          By Mary Moore, copywriter at Shakuro The ever-shifting landscape of
          digital innovation can feel like a relentless race, a whirlwind of
          challenges and opportunities. Your pains as a developer are real — the...
        </p>
      </div>
    </div>
  );
};

export default PostsItem;
