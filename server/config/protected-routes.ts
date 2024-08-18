import type { NitroFetchRequest } from "nitropack";

export const protectedRoutes: Readonly<
  Partial<Record<Exclude<NitroFetchRequest, Request>, boolean>>
> = {
  "/api/app/hello-world": true,
};
