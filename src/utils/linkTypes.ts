import type { IconType } from "react-icons";
import { FaDiscord, FaGithub } from "react-icons/fa";
import type { FilteredExternalAccount } from "~/server/helpers/filterUserForClient";

type LinkTypes = {
  provider?: string;
  name: string;
  icon: IconType;
  renderUsername?: (data: FilteredExternalAccount) => string | Promise<string>;
} & ({ linkable: false } | { linkable: true; website: string });

export const linkTypes: LinkTypes[] = [
  {
    provider: "oauth_discord",
    name: "Discord",
    icon: FaDiscord,
    linkable: false,
    renderUsername: async ({ id }) => {
      const data = (await fetch(
        `https://cors.imtca.repl.co/dutils.shay.cat/api/v1/users/${id}`
      ).then((res) => res.json())) as { name: string; discriminator: string };
      return `${data.name}#${data.discriminator}`;
    },
  },
  {
    provider: "oauth_github",
    name: "GitHub",
    icon: FaGithub,
    linkable: true,
    website: "https://github.com",
  },
];
