import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { MdNavigateNext } from "react-icons/md";
import { LoadingPage } from "~/components/loading";
import { Navbar } from "~/components/navbar";
import { api } from "~/utils/api";
import { metadata, profile, type ProfileWithMetadata } from "~/utils/profile";

const Input = React.forwardRef<
  HTMLInputElement,
  {
    errorText?: string;
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
    type?: string;
    badge?: React.ReactNode | string;
  } & React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`mt-1 block w-full rounded-md bg-green-800/50 px-3 py-2 outline-none outline-offset-0 focus-visible:outline-green-500 ${
        props.className || ""
      }`}
    />
  );
});
Input.displayName = "Input";

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  {
    errorText?: string;
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
    type?: string;
    badge?: React.ReactNode | string;
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className="mt-1 block w-full rounded-md border-none bg-green-800/50 px-3 py-2 outline-none focus:outline-offset-0 focus:outline-green-500 focus:ring-0"
    />
  );
});
TextArea.displayName = "TextArea";

const ManageAccount: NextPage = () => {
  const { isSignedIn, isLoaded: userLoaded, user } = useUser();
  const { register, handleSubmit, control, reset } =
    useForm<ProfileWithMetadata>({
      resolver: zodResolver(profile.merge(metadata)),
    });
  const { fields, append, remove } = useFieldArray<ProfileWithMetadata>({
    name: "links", // unique name for your Field Array,
    control, // control props comes from useForm (optional: if you are using FormContext)
  });

  const { mutate, isLoading: isSubmitting } = api.profile.update.useMutation({
    onSuccess: () => toast.success("Successfully updated your profile!"),
    onError: () => toast.error("An error occured. Try again later."),
  });

  useEffect(() => {
    if (!userLoaded || !user) return;
    reset({
      displayName: user.firstName || "",
      username: user.username || "",
      ...user.publicMetadata,
    });
  }, [user, userLoaded, reset]);

  if (!userLoaded)
    return (
      <>
        <NextSeo title="Manage account" />
        <main>
          <Navbar />
          <LoadingPage />
        </main>
      </>
    );
  if (!isSignedIn) return null;

  return (
    <>
      <NextSeo title="Manage account" />
      <main>
        <Navbar />
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit((data) => mutate(data))}
          noValidate
          className="flex flex-col items-center justify-center p-4"
        >
          <div className="grid w-full grid-cols-1 gap-6 md:max-w-lg">
            <label className="block">
              <span className="text-xs">Display name</span>
              <Input {...register("displayName")} />
            </label>
            <label className="block">
              <span className="text-xs">Username</span>
              <Input {...register("username")} />
            </label>
            <label className="block">
              <span className="text-xs">About me</span>
              <TextArea {...register("aboutMe")} rows={5} />
            </label>
            <div className="block">
              <span className="text-xs">Links</span>
              <div className="flex flex-col gap-1.5">
                {fields.map((field, index) => (
                  <div className="flex items-center gap-1.5" key={field.id}>
                    <Input
                      {...register(`links.${index}.name`, {
                        required: true,
                      })}
                      placeholder="Name"
                      className="w-36"
                    />
                    <Input
                      placeholder="URL"
                      {...register(`links.${index}.url`, {
                        required: true,
                      })}
                    />
                    <button onClick={() => remove(index)}>
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                value="Add more links"
                className="mt-3 flex items-center gap-1 font-semibold uppercase text-green-500"
                onClick={() => append({ name: "", url: "" })}
              >
                <AiOutlinePlus /> Add link
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <Link
                href="/account/manage/other"
                className="group flex items-center hover:text-green-500"
              >
                <span className="group-hover:underline">
                  Change other settings{" "}
                </span>{" "}
                <MdNavigateNext className="mt-[3.5px] group-hover:border-b-[1.5px] group-hover:border-green-500" />
              </Link>
              <Link
                href="/user/me"
                className="group flex items-center hover:text-green-500"
              >
                <span className="group-hover:underline">
                  View your profile{" "}
                </span>{" "}
                <MdNavigateNext className="mt-[3.5px] group-hover:border-b-[1.5px] group-hover:border-green-500" />
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-sm enabled:hover:bg-green-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            Save <FiSave />
          </button>
        </form>
      </main>
    </>
  );
};

export default ManageAccount;
