import { clerkClient } from "@clerk/nextjs/server";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { metadata, profile } from "~/utils/profile";

export const profileRouter = createTRPCRouter({
  update: privateProcedure
    .input(profile.partial().merge(metadata))
    .mutation(
      async ({ ctx, input: { displayName: firstName, username, ...publicMetadata } }) =>
        await clerkClient.users.updateUser(ctx.userId, {
          firstName,
          username,
          publicMetadata,
        })
    ),
});
