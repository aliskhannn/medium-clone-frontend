import Skeleton from "react-loading-skeleton";

const PostSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Skeleton
          variant="circular"
          borderRadius={"50%"}
          width={24}
          height={24}
        />
        <Skeleton
          variant="text"
          width={150}
          height={10}
          sx={{ fontSize: "1rem" }}
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <Skeleton
          variant="text"
          width={250}
          height={10}
          sx={{ fontSize: "1.25rem" }}
        />
        <div>
          <Skeleton
            variant="text"
            width={"100%"}
            height={10}
            sx={{ fontSize: "1rem" }}
          />
          <Skeleton
            variant="text"
            width={"100%"}
            height={10}
            sx={{ fontSize: "1rem" }}
          />
          <Skeleton
            variant="text"
            width={"50%"}
            height={10}
            sx={{ fontSize: "1rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
