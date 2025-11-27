import { requireAuth } from "@/lib/auth-utils";
import { createCaller } from "@/trpc/server";
const Page = async () => {
  await requireAuth();
  const caller = createCaller();
  const data = await caller.getUsers();
  return (
    <div className="flex items-center-safe justify-center flex-col gap-y-6 min-h-screen min-w-screen">
      <p>protected server component</p>
      <div className=" ">{JSON.stringify(data,null,2)}</div>
    </div>
  );
};
export default Page;
