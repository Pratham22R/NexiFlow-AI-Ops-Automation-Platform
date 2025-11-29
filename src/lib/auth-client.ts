import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth";
export const authclient = createAuthClient({
  plugins: [polarClient()],
});
