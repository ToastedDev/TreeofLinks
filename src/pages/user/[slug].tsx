import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import type { GetStaticProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type PropsWithChildren } from "react";
import { type IconType } from "react-icons";
import { FaLink, FaUser } from "react-icons/fa";
import { LoadingPage } from "~/components/loading";
import { Navbar } from "~/components/navbar";
import {
  filterUserForClient,
  type FilteredExternalAccount,
} from "~/server/helpers/filterUserForClient";
import { linkTypes } from "~/utils/linkTypes";

const Section = (
  props: PropsWithChildren<{ icon: IconType; title: string }>
) => {
  return (
    <div className="mt-3 rounded-md bg-neutral-800/40 p-4">
      <span className="mb-3 flex items-center gap-2">
        <props.icon className="h-8 w-8" />
        <p className="text-xl font-bold">{props.title}</p>
      </span>
      {props.children}
    </div>
  );
};

const UserPage: NextPage<{ user: string }> = ({ user: userUnparsed }) => {
  const user = filterUserForClient(JSON.parse(userUnparsed) as User);
  const [externalAccounts, setExternalAccounts] = useState<
    FilteredExternalAccount[] | null
  >();

  useEffect(() => {
    async function getRenderedUsernames() {
      setExternalAccounts(
        await Promise.all(
          user.externalAccounts.map(async (account) => {
            const linkType = linkTypes.find(
              (x) => x.provider === account.provider
            );
            if (!linkType || linkType.linkable) return account;
            else
              return {
                ...account,
                username: await linkType.renderUsername(account),
              };
          })
        )
      );
    }

    if (!externalAccounts) {
      void getRenderedUsernames();
    }
  }, [user, externalAccounts]);

  if (!externalAccounts)
    return (
      <>
        <NextSeo title={user.firstName || user.username || ""} />
        <main>
          <Navbar />
          <LoadingPage />
        </main>
      </>
    );

  return (
    <>
      <NextSeo title={user.firstName || user.username || ""} />
      <main>
        <Navbar />
        <div className="flex flex-col items-center justify-center p-4">
          <div className="w-full md:max-w-2xl">
            <div className="flex items-center gap-3">
              <Image
                src={user.profileImageUrl}
                alt={`${user.firstName || user.username || ""} profile picture`}
                width={100}
                height={100}
                className="rounded-full"
              ></Image>
              <div className="flex flex-col justify-start">
                <h1 className="text-3xl font-bold">{user.firstName}</h1>
                <p className="text-sm">@{user.username}</p>
              </div>
            </div>
            <Section icon={FaUser} title="About Me">
              <p>{user.publicMetadata.aboutMe}</p>
            </Section>

            <Section icon={FaLink} title="Links">
              {externalAccounts?.map(({ provider, username }) => {
                const linkType = linkTypes.find((x) => x.provider === provider);
                if (!linkType) return null;

                if (!linkType.linkable)
                  return (
                    <div key={provider} className="flex items-center gap-1.5">
                      <linkType.icon />
                      <p>{username}</p>
                    </div>
                  );
                else
                  return (
                    <Link
                      href={`${linkType.website}/${username as string}`}
                      key={provider}
                      className="flex items-center gap-1.5"
                    >
                      <linkType.icon />
                      <p>{username}</p>
                    </Link>
                  );
              })}
            </Section>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  const users = await clerkClient.users.getUserList({
    username: [username],
  });
  if (!users.length)
    return {
      notFound: true,
      props: {},
    };

  return {
    props: {
      user: JSON.stringify(users[0]),
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default UserPage;
