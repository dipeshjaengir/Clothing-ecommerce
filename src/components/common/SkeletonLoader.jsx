import React from 'react';

const SkeletonLoader = ({ type = "card", count = 1 }) => {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, i) => {
        if (type === "card") {
          return (
            <div key={i} className="flex flex-col gap-4 w-full">
              <div className="bg-luxury-border aspect-[3/4] w-full rounded-2xl animate-pulse" />
              <div className="h-5 bg-luxury-border rounded-md w-2/3 animate-pulse" />
              <div className="h-4 bg-luxury-border rounded-md w-1/4 animate-pulse" />
            </div>
          );
        }
        if (type === "details") {
          return (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full py-8">
              {/* Product Gallery Skeleton */}
              <div className="flex flex-col gap-4">
                <div className="bg-luxury-border aspect-[3/4] w-full rounded-2xl animate-pulse" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-luxury-border aspect-square rounded-xl animate-pulse" />
                  <div className="bg-luxury-border aspect-square rounded-xl animate-pulse" />
                  <div className="bg-luxury-border aspect-square rounded-xl animate-pulse" />
                </div>
              </div>
              {/* Product Text Details Skeleton */}
              <div className="flex flex-col gap-6 py-4">
                <div className="h-10 bg-luxury-border rounded-lg w-3/4 animate-pulse" />
                <div className="h-6 bg-luxury-border rounded-md w-1/4 animate-pulse" />
                <div className="h-4 bg-luxury-border rounded-md w-1/3 animate-pulse" />
                <hr className="border-luxury-border" />
                <div className="h-16 bg-luxury-border rounded-lg w-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-luxury-border rounded w-full animate-pulse" />
                  <div className="h-4 bg-luxury-border rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-luxury-border rounded w-4/5 animate-pulse" />
                </div>
                <div className="space-y-3 mt-4">
                  <div className="h-12 bg-luxury-border rounded-xl w-full animate-pulse" />
                  <div className="h-12 bg-luxury-border rounded-xl w-full animate-pulse" />
                </div>
              </div>
            </div>
          );
        }
        return (
          <div key={i} className="h-4 bg-luxury-border rounded-md w-full animate-pulse" />
        );
      })}
    </>
  );
};

export default SkeletonLoader;
