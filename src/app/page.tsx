import { Button } from "@/components/ui/button";
import { getQueryClient, trpc } from "@/trpc/server";
import Client from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
const Page = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <div className="flex items-center justify-center flex-col gap-5 min-h-screen">
      <h1 className="text-red-400 font-extrabold text-2xl">
        Hello from nextjs!!
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>loading...</p>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
      <Button className="bg-blue-200 text-black hover:bg-blue-300 h-10 w-30 ">
        Click Me
      </Button>
    </div>
  );
};
export default Page;
