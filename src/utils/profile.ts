import { z } from "zod";

export const profile = z.object({
  displayName: z.string(),
  username: z.string(),
});
export type Profile = z.infer<typeof profile>;

export const metadata = z.object({
  aboutMe: z.string().optional(),
  badges: z.enum(["owner", "developer", "verified"]).array().optional(),
  links: z
    .object({
      name: z.string(),
      url: z.string().url(),
    })
    .array()
    .optional(),
});
export type Metadata = z.infer<typeof metadata>;

const profileWithMetadata = profile.merge(metadata);
export type ProfileWithMetadata = z.infer<typeof profileWithMetadata>;
