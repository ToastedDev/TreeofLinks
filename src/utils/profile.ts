import { z } from "zod";

export const profile = z.object({
  displayName: z.string(),
});
export type Profile = z.infer<typeof profile>;

export const metadata = z.object({
  aboutMe: z.string().optional(),
});
export type Metadata = z.infer<typeof metadata>;
