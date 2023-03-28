import { z } from "zod";

export const profile = z.object({
  displayName: z.string(),
});
export type Profile = z.infer<typeof profile>;
