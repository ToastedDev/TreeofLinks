import type { IconType } from "react-icons";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaRedditAlien,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import type { FilteredExternalAccount } from "~/server/helpers/filterUserForClient";

type LinkTypes = {
  icon: IconType;
} & (
  | {
      oauth: true;
      linkable: false;
    }
  | { oauth: true; linkable: true; website: string }
  | {
      oauth: false;
    }
) &
  (
    | {
        oauth: true;
        provider: string;
        name: string;
        regex?: RegExp;
        removeUrl?: RegExp | false;
        renderUsername?: (
          data: FilteredExternalAccount
        ) => string | Promise<string>;
      }
    | {
        oauth: false;
        regex: RegExp;
        removeUrl?: RegExp;
        renderUsername?: (data: { name: string; url: string }) => string;
      }
  );

export const linkTypes: LinkTypes[] = [
  {
    oauth: true,
    provider: "oauth_discord",
    name: "Discord",
    regex: new RegExp(
      /(https?:\/\/|http?:\/\/)?(www.)?(discord.(gg|io|me|li)|discordapp.com\/invite|discord.com\/invite|dsc.gg)\/[^\s\/]+?(?=\b)/g
    ),
    removeUrl: false,
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
    oauth: true,
    provider: "oauth_github",
    name: "GitHub",
    regex: new RegExp(
      /(https?:\/\/github.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/g
    ),
    removeUrl: new RegExp(/https?:\/\/github.com\//g),
    icon: FaGithub,
    linkable: true,
    website: "https://github.com",
  },
  {
    oauth: true,
    provider: "oauth_twitch",
    name: "Twitch",
    icon: FaTwitch,
    linkable: true,
    website: "https://twitch.tv",
  },
  {
    oauth: false,
    regex: new RegExp(
      /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)/g
    ),
    icon: FaYoutube,
    renderUsername: ({ name, url }) => {
      if (
        new RegExp(
          /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g
        ).test(url)
      )
        return name;
      else
        return url
          .replace(
            /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)/g,
            ""
          )
          .replace(/(^\w+:|^)\/\//, "");
    },
  },
  {
    oauth: false,
    regex: new RegExp(
      /(https?:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/g
    ),
    removeUrl: new RegExp(/https?:\/\/twitter.com\//g),
    icon: FaTwitter,
  },
  {
    oauth: false,
    regex: new RegExp(
      /(https?:\/\/(instagram.com|instagr.am)\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/g
    ),
    removeUrl: new RegExp(/https?:\/\/(instagram.com|instagr.am)\//g),
    icon: FaInstagram,
  },
  {
    oauth: false,
    regex: new RegExp(
      /(https?:\/\/reddit.com\/(r|u)\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/g
    ),
    removeUrl: new RegExp(/https?:\/\/reddit.com\//g),
    icon: FaRedditAlien,
  },
];
