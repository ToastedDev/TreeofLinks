import type { ExternalAccount, User } from "@clerk/nextjs/dist/api";

const filterExternalAccountsForClient = (account: ExternalAccount) => ({
  provider: account.provider,
  username: account.username,
  id: account.externalId,
});

export type FilteredExternalAccount = ReturnType<
  typeof filterExternalAccountsForClient
>;

export const filterUserForClient = (user: User) => ({
  id: user.id,
  username: user.username,
  firstName: user.firstName,
  profileImageUrl: user.profileImageUrl,
  publicMetadata: user.publicMetadata,
  externalAccounts: user.externalAccounts.map(filterExternalAccountsForClient),
});
