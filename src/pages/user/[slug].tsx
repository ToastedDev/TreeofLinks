import type { User } from "@clerk/nextjs/dist/api";
import { clerkClient } from "@clerk/nextjs/server";
import Markdown from "markdown-to-jsx";
import type { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, type PropsWithChildren } from "react";
import { type IconType } from "react-icons";
import { FaCheck, FaLink, FaUser } from "react-icons/fa";
import { LoadingPage } from "~/components/loading";
import { Navbar } from "~/components/navbar";
import {
  filterUserForClient,
  type FilteredExternalAccount,
} from "~/server/helpers/filterUserForClient";
import { badges } from "~/utils/badges";
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
              (l) => l.oauth && l.provider === account.provider
            );
            if (!linkType || !linkType.oauth || !linkType.renderUsername)
              return account;
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
        <NextSeo title={user.fullName || user.username || ""} />
        <main>
          <Navbar />
          <LoadingPage />
        </main>
      </>
    );

  return (
    <>
      <NextSeo title={user.fullName || user.username || ""} />
      <main>
        <Navbar />
        <div className="flex flex-col items-center justify-center p-4">
          <div className="w-full md:max-w-2xl">
            <div className="flex items-center gap-3">
              <Image
                src={user.profileImageUrl}
                alt={`${user.fullName || user.username || ""} profile picture`}
                width={100}
                height={100}
                className="rounded-full"
              ></Image>
              <div className="flex flex-col justify-start">
                <h1
                  className={`text-3xl font-bold ${
                    user.publicMetadata.badges ? "flex items-center gap-2" : ""
                  }`}
                >
                  {user.fullName}
                  {user.publicMetadata.badges ? (
                    <div className="flex items-center gap-2">
                      {" "}
                      {user.publicMetadata.badges?.map((badge) => {
                        const badgeType = badges.find(
                          (b) => b.name.toLowerCase() === badge.toLowerCase()
                        );
                        if (!badgeType) return null;

                        return (
                          <badgeType.icon
                            key={badge}
                            fill={badgeType.color}
                            title={badgeType.title}
                          />
                        );
                      })}
                    </div>
                  ) : null}
                </h1>
                <p className="text-sm">@{user.username}</p>
              </div>
            </div>
            <Section icon={FaUser} title="About Me">
              <div className="prose max-w-none text-slate-100">
                <Markdown>
                  {`${
                    user.publicMetadata.aboutMe ||
                    "Just your average TreeofLinks user."
                  }`.replace(
                    /@([a-zA-Z0-9_])*/g,
                    (str) => `[${str}](/user/${str})`
                  )}
                </Markdown>
              </div>
            </Section>

            {(externalAccounts.length || user.publicMetadata.links) && (
              <Section icon={FaLink} title="Links">
                <div className="grid gap-2">
                  {externalAccounts?.map(({ provider, username }) => {
                    const linkType = linkTypes.find(
                      (l) => l.oauth && l.provider === provider
                    );
                    if (!linkType || !linkType.oauth) return null;

                    if (!linkType.linkable)
                      return (
                        <div
                          key={provider}
                          className="flex items-center gap-1.5"
                        >
                          <linkType.icon className="h-6 w-6" />
                          <p>{username}</p>
                          <FaCheck
                            className="h-3 w-3 text-green-500"
                            title="This user has linked this account to their profile."
                          />
                        </div>
                      );
                    else
                      return (
                        <Link
                          href={`${linkType.website}/${username as string}`}
                          key={provider}
                          className="flex items-center gap-1.5"
                        >
                          <linkType.icon className="h-6 w-6" />
                          <p>{username}</p>
                          <FaCheck
                            className="h-3 w-3 text-green-500"
                            title="This user has linked this account to their profile."
                          />
                        </Link>
                      );
                  })}
                  {user.publicMetadata.links?.map((link) => {
                    const linkType = linkTypes.find((l) => {
                      return l.regex && link.url.match(l.regex);
                    });

                    if (!linkType)
                      return (
                        <Link
                          href={link.url}
                          key={link.name}
                          className="flex items-center gap-1.5"
                        >
                          <FaLink className="h-6 w-6" />
                          <p>{link.name}</p>
                        </Link>
                      );
                    else
                      return (
                        <Link
                          href={link.url}
                          key={link.name}
                          className="flex items-center gap-1.5"
                        >
                          <linkType.icon className="h-6 w-6" />
                          <p>
                            {(!linkType.oauth
                              ? linkType.renderUsername?.(link)
                              : undefined) ||
                              (linkType.removeUrl || linkType.regex
                                ? link.url.replace(
                                    linkType.removeUrl || linkType.regex || "",
                                    ""
                                  )
                                : link.name)}
                          </p>
                        </Link>
                      );
                  })}
                </div>
              </Section>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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

export default UserPage;
