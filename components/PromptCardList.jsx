"use client";
import PromptCard from "@components/PromptCard";
export const PromptCardList = ({
  prompts,
  handleTagClick,
  copied,
  handleCopiedPrompt,
  handleEdit,
  handleDelete,
}) => {
  console.log(prompts, "prompts");
  return (
    <div className="mt-16 prompt_layout">
      {prompts?.map((prompt) => (
        <PromptCard
          handleCopiedPrompt={handleCopiedPrompt}
          copied={copied}
          key={prompt?._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};
