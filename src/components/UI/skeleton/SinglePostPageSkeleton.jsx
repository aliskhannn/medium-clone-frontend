import Skeleton from "react-loading-skeleton";

const SinglePostPageSkeleton = () => {
  return (
    <div className="w-full">
      <div>
        <Skeleton
          variant="text"
          width={"100%"}
          height={40}
          sx={{ fontSize: "2.25rem" }}
        />
        <div className="flex gap-3 mt-8">
          <Skeleton
            variant="circular"
            borderRadius={"50%"}
            width={48}
            height={48}
          />
          <div>
            <Skeleton
              variant="text"
              width={150}
              height={10}
              sx={{ fontSize: "1rem" }}
            />
            <div className="flex gap-1">
              <Skeleton
                variant="text"
                width={100}
                height={10}
                sx={{ fontSize: "1rem" }}
              />
              <Skeleton
                variant="text"
                width={100}
                height={10}
                sx={{ fontSize: "1rem" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Skeleton
            variant="text"
            width={"100%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
          <Skeleton
            variant="text"
            width={"100%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
          <Skeleton
            variant="text"
            width={"100%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
          <Skeleton
            variant="text"
            width={"50%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
        </div>

        <div className="mt-8">
          <Skeleton
            variant="text"
            width={"100%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
          <Skeleton
            variant="text"
            width={"100%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
          <Skeleton
            variant="text"
            width={"100%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
          <Skeleton
            variant="text"
            width={"100%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
          <Skeleton
            variant="text"
            width={"80%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
        </div>

        <div className="mt-8">
          <Skeleton
            variant="text"
            width={"100%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
          <Skeleton
            variant="text"
            width={"100%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
          <Skeleton
            variant="text"
            width={"30%"}
            height={12}
            sx={{ fontSize: "1.125rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPageSkeleton;
