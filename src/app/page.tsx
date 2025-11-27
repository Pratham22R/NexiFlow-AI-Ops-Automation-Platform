import { requireAuth } from "@/lib/auth-utils";
import { createCaller } from "@/trpc/server";
import Logout from "./logout";
const Page = async () => {
  await requireAuth();
  const caller = createCaller();
  const data = await caller.getUsers();
  return (
    <div className="flex  justify-center flex-col gap-y-6 min-h-screen min-w-screen">
      <p>protected server component</p>
      <div className=" ">{JSON.stringify(data,null,2)}</div>
      <Logout />
    </div>
  );
};
export default Page;
