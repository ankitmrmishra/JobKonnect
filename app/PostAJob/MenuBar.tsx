import React, { useState } from "react";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Eraser,
  Trash2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Undo,
  Redo,
} from "lucide-react";
import StarterKit from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Heading } from "@tiptap/extension-heading";

interface MenuBarProps {
  editor: Editor | null;
}

export function TiptapEditorToolbar({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }

  const ButtonGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="flex space-x-1">{children}</div>
  );

  return (
    <div className="w-full rounded-md border p-1">
      <div className="flex flex-wrap gap-1 sm:gap-2">
        <ButtonGroup>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-secondary" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-secondary" : ""}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-secondary" : ""}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "bg-secondary" : ""}
          >
            <Code className="h-4 w-4" />
          </Button>
        </ButtonGroup>

        <Separator orientation="vertical" className="hidden sm:block" />

        <ButtonGroup>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
          >
            <Eraser className="h-4 w-4 mr-2" />
            Clear marks
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().clearNodes().run()}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear nodes
          </Button>
        </ButtonGroup>

        <Separator orientation="vertical" className="hidden sm:block" />

        <ButtonGroup>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "bg-secondary" : ""}
          >
            Paragraph
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "bg-secondary" : ""
            }
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-secondary" : ""
            }
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "bg-secondary" : ""
            }
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </ButtonGroup>

        <Separator orientation="vertical" className="hidden sm:block" />

        <ButtonGroup>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-secondary" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-secondary" : ""}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "bg-secondary" : ""}
          >
            <Code className="h-4 w-4" />
          </Button>
        </ButtonGroup>

        <Separator orientation="vertical" className="hidden sm:block" />

        <ButtonGroup>
          <Button
            className="px-10"
            variant="link"
            size="icon"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            Seperator
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </ButtonGroup>

        <Separator orientation="vertical" className="hidden sm:block" />
      </div>
    </div>
  );
}
interface RichTextEditorProps {
  onChange?: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange }) => {
  const [editorContent, setEditorContent] = useState<string>(
    "<p>Hello, start writing about the job here...</p>"
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],

    content: editorContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setEditorContent(html);
      if (onChange) {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose md:min-w-[900px] max-w-[900px] min-h-[300px] p-4 focus:outline-none [&_ol]:list-decimal [&_ul]:list-disc [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl",
      },
    },
  });

  return (
    <div className="border rounded-lg shadow-sm">
      <TiptapEditorToolbar editor={editor} />
      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  );
};

export default RichTextEditor;
