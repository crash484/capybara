import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";


export default function MarkdownEditor({ content, setContent }: { content: string; setContent: (v: string) => void }) {
  const editor = useMemo(
    () => (
      <SimpleMDE
        value={content}
        onChange={(value: string) => setContent(value || "")}
        options={{ spellChecker: false, placeholder: "Write here..." }}
      />
    ),
    [setContent] // only re-create if setContent changes
  );

  return editor;
}
