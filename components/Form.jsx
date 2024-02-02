import Link from "next/link";
import { useState } from "react";
const Form = ({ type, post, setPost, isSubmitting, handleSubmit }) => {
  const [currentTag, setCurrentTag] = useState("");

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">{type} Post</h1>
      <p className="desc text-left max-w-md">
        Share a prompt with PromptHub community.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-5 glassmorphism"
      >
        <label>
          <div className="font-satoshi font-semibold text-base text-gray-700 mb-3">
            Header
          </div>
        </label>
        <input
          type="text"
          maxLength={50}
          value={post.header}
          onChange={(e) => {
            setPost({
              ...post,
              header: e.target.value,
            });
          }}
          className="form_input"
          placeholder="Enter your header here..."
          required
        />
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
        </label>
        <textarea
          value={post.prompt}
          onChange={(e) =>
            setPost({
              ...post,
              prompt: e.target.value,
            })
          }
          className="form_textarea"
          placeholder="Enter your prompt here..."
          required
        ></textarea>
        <label>
          <div className="font-satoshi font-semibold text-base text-gray-700 mb-3">
            Tags
          </div>
          <div className="font-satoshi font-semibold text-base flex flex-wrap justify-start gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                onClick={() => {
                  setPost({
                    ...post,
                    tags: post.tags.filter((t) => t !== tag),
                  });
                }}
                className=" tag-span"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="font-satoshi font-weight-200 text-secondary text-gray-400 mb-0">
            After typing a tag, press enter to add it to the list. To remove a
            tag, click on it. <br />
            Maximum 9 tags and maximum tag length is 20 character.
          </div>
        </label>
        <input
          type="text"
          maxLength={20}
          value={currentTag}
          onChange={(e) => {
            setCurrentTag(e.target.value);
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              currentTag !== "" &&
              post.tags.length < 9
            ) {
              e.preventDefault();
              setPost({
                ...post,
                tags: [...post.tags, currentTag],
              });
              setCurrentTag("");
            }
          }}
          className="form_input"
          placeholder="Enter your tag here..."
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            className="
            px-5
            py-2
            rounded-2xl
            text-white
            font-semibold
           bg-gray-500 hover:bg-gray-600  
             "
            href="/"
          >
            Cancel
          </Link>
          <button
            type="
            submit"
            disabled={isSubmitting || post.tags.length === 0}
            className="
            px-5
            py-2
            rounded-2xl
            text-white
            font-semibold
             bg-blue-500 hover:bg-blue-600"
          >
            {isSubmitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
