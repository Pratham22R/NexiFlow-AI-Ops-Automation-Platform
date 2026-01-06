import { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  data,
  context,
  nodeId,
  step,
}) => {
  // For manual trigger, we can simply merge the data into the context
  const result = await step.run("manual-trigger", async () => context);

  return result;
};
