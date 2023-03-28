import { clerkClient } from "@clerk/nextjs/server";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { profile } from "~/utils/profile";

export const profileRouter = createTRPCRouter({
  update: privateProcedure
    .input(profile)
    .mutation(
      async ({ ctx, input: { displayName: firstName } }) =>
        await clerkClient.users.updateUser(ctx.userId, { firstName })
    ),
});
