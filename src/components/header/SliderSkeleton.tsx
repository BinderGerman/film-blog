export const SliderSkeleton = () => {
  return (
    <div className="relative h-[600px] mt-8 w-full overflow-hidden rounded-md animate-pulse bg-gray-300">
      <div className="absolute top-[80%] md:top-[65%] left-[2%] h-10 w-3/4 bg-gray-400 rounded" />
      <div className="absolute top-[78%] left-[2%] h-6 w-2/3 bg-gray-500 rounded hidden md:block" />
    </div>
  );
};
