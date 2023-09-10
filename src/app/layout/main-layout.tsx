import { ReactNode } from "react";

export default function MainLayour({
  LeftChild,
  RightChild,
}: {
  LeftChild: ReactNode;
  RightChild: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto bg-slate-800 w-full  min-h-screen lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-96 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
            {LeftChild}
          </div>

          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {RightChild}
          </div>
        </div>
      </div>
    </div>
  );
}
