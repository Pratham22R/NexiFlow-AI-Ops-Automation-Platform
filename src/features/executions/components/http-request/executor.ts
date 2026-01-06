import type { NodeExecutor } from "@/features/executions/types";
import ky , {type Options as KyOptions} from "ky";
type HttpRequestData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
}

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  context,
  nodeId,
  step,
}) => {

  if(!data.endpoint) {
    throw new Error(`HTTP Request node (${nodeId}) is missing the endpoint URL.`);
  }
  // For HTTP request, we can simply merge the data into the context
  const result = await step.run("http-request",async ()=>{
    const endpoint = data.endpoint!;
    const method = data.method || "GET";

    const options : KyOptions = {
      method,
    };


    if(["POST", "PUT", "PATCH"].includes(method)) {
        options.body = data.body;
    }

    const response = await ky(endpoint, options);
    const contentType = response.headers.get("content-type") || "";

    const responseData = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return {
      ...context,
      httpResponse:{
        status: response.status,
        statusText: response.statusText,
        data: await responseData,
      }
    }
  })

  return result;
};
