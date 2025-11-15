import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

export default function TextEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            Link,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder: "Write your story here...",
            }),
        ],
        content: value,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        if (!editor) return;
        const count = editor
            .getText()
            .trim()
            .split(/\s+/)
            .filter((w) => w.length > 0).length;
        setWordCount(count);
    }, [editor, value]);

    return (
        <div className='space-y-2'>
            {/* ---------- Toolbar ---------- */}
            {editor && (
                <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-gray-50">

                    <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
                    <button onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>

                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                        H1
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                        H2
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                        H3
                    </button>

                    <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
                        • List
                    </button>
                    <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                        1. List
                    </button>

                    <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                        Quote
                    </button>

                    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                        CodeBlock
                    </button>
                </div>
            )}

            <div
                className="border border-gray-300 rounded-lg min-h-[300px] p-4 cursor-text"
                onClick={() => editor?.commands.focus()}
            >
                <EditorContent editor={editor} className="min-h-[250px] focus:outline-none" />
            </div>


            <div className="text-right text-sm text-gray-400">{wordCount} words</div>
        </div>
    );
}
