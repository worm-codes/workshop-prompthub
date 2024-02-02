"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
const PromptCard = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
  handleCopiedPrompt,
  copied,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  console.log(prompt, "prompt");
  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        <div
          onClick={() => {
            // router.push(`/profile/${prompt?.creator?._id}`);
          }}
          className="flex-1 flex justify-start items-center gap-3  cursor-pointer"
        >
          <Image
            src={prompt?.creator?.image}
            alt="profile picture"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt?.creator?.email}
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            handleCopiedPrompt(prompt?.prompt);
            navigator.clipboard.writeText(prompt?.prompt);
            setTimeout(() => {
              handleCopiedPrompt("");
            }, 3000);
          }}
          className="copy_btn"
        >
          <Image
            src={
              copied === prompt?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <h2 className="font-satoshi ml-1 font-semibold text-lg text-gray-900 mt-3">
        {prompt?.header}
      </h2>
      <p className="my-4 ml-1 font-satoshi text-sm text-gray-700">
        {prompt?.prompt}
      </p>
      <div className="font-satoshi font-semibold text-base flex flex-wrap justify-start gap-2 mb-3">
        {prompt?.tags?.map((tag) => (
          <span
            onClick={() => {
              handleTagClick(tag);
            }}
            className="tag-span"
          >
            #{tag}
          </span>
        ))}
      </div>
      {session?.user?.id === prompt?.creator?._id &&
        pathName.includes("/profile") && (
          <div className="mt-5 flex-start gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer
          "
              onClick={() => {
                handleEdit(prompt?._id);
              }}
            >
              Edit
            </p>
            <p
              className="font-inter  bg-gradient-to-r from-amber-500  font-bold via-orange-600 to-yellow-500 bg-clip-text text-transparent text-sm cursor-pointer
          "
              onClick={() => {
                handleDelete(prompt?._id);
              }}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
