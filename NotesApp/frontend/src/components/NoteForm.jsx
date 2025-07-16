import React, { useState, useEffect } from "react";

export default function NoteForm({ onSubmit, existingNote, availableTags }) {
  const [title, setTitle] = useState(existingNote?.title || "");
  const [content, setContent] = useState(existingNote?.content || "");
  const [selectedTags, setSelectedTags] = useState(existingNote?.tags?.map(tag => tag.id) || []);

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setSelectedTags(existingNote.tags.map(tag => tag.id));
    }
  }, [existingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, tagIds: selectedTags });
    setTitle("");
    setContent("");
    setSelectedTags([]);
  };

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 space-y-4 max-w-md mx-auto mb-8">
      <h2 className="text-xl font-bold text-center">{existingNote ? "Edit Note" : "Create Note"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
      />
      <div className="flex flex-wrap gap-2">
        {availableTags.map(tag => (
          <button
            type="button"
            key={tag.id}
            onClick={() => toggleTag(tag.id)}
            className={`px-3 py-1 rounded text-sm border ${
              selectedTags.includes(tag.id) ? "bg-[#F19955] text-white hover:cursor-pointer" : "bg-gray-200 hover:cursor-pointer"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
      <button type="submit" className="bg-[#F08D42] text-white px-4 py-2 rounded hover:bg-[#AA510E] hover:cursor-pointer w-full">
        {existingNote ? "Update" : "Create"}
      </button>
    </form>
  );
}
