"use client";

import Logout from "./logout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const Page = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI Job queued");
      },
    })
  );
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    })
  );
  return (
    <div className="flex items-center justify-center flex-col gap-y-6 min-h-screen min-w-screen">
      <p>protected server component</p>
      <div className="">{JSON.stringify(data, null, 2)}</div>
      <Button onClick={() => testAi.mutate()} disabled={testAi.isPending}>
        Test AI
      </Button>
      <Button onClick={() => create.mutate()} disabled={create.isPending}>
        Create Workflow
      </Button>
      <Logout />
    </div>
  );
};
export default Page;
