import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import './style.scss'

// Reusable Button component
const Button = ({ 
    onClick, 
    disabled = false, 
    active = false, 
    children, 
    className = "" 
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        type="button"
        className={`px-3 py-2 rounded border text-sm font-medium transition-colors ${
            active 
                ? 'bg-blue-500 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        } ${className}`}
    >
        {children}
    </button>
);

function MenuBar({ editor }) {
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold') ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                isCode: ctx.editor.isActive('code') ?? false,
                isParagraph: ctx.editor.isActive('paragraph') ?? false,
                isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
                isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
                isBulletList: ctx.editor.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor.isActive('orderedList') ?? false,
                isUnderline: ctx.editor.isActive('underline') ?? false,
                canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
            }
        },
    })

    return (
        <div className="flex flex-wrap gap-2 p-4 border border-gray-200 rounded-lg bg-gray-50 mb-4">
            {/* Text Formatting */}
            <div className="flex gap-1">
                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    active={editorState.isBold}
                >
                    Bold
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    active={editorState.isItalic}
                >
                    Italic
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editorState.canUnderline}
                    active={editorState.isUnderline}
                >
                    Underline
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    active={editorState.isStrike}
                >
                    Strike
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editorState.canCode}
                    active={editorState.isCode}
                >
                    Code
                </Button>
            </div>

            {/* Headings */}
            <div className="flex gap-1">
                <Button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    active={editorState.isParagraph}
                >
                    Paragraph
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    active={editorState.isHeading1}
                >
                    H1
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editorState.isHeading2}
                >
                    H2
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editorState.isHeading3}
                >
                    H3
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    active={editorState.isHeading4}
                >
                    H4
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    active={editorState.isHeading5}
                >
                    H5
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    active={editorState.isHeading6}
                >
                    H6
                </Button>
            </div>

            {/* Lists */}
            <div className="flex gap-1">
                <Button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editorState.isBulletList}
                >
                    Bullet List
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editorState.isOrderedList}
                >
                    Ordered List
                </Button>
            </div>
        </div>
    )
}

export default function TextEditor({ value, onChange }) {
    const [wordCount, setWordCount] = useState(0);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-600 underline",
                },
            }),
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
    })
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
        <div>
            <MenuBar editor={editor} />
            <div
                className="border border-gray-300 rounded-lg min-h-[300px] p-6 cursor-text bg-white shadow-inner"
                onClick={() => editor.commands.focus()}
            >
                <EditorContent
                    editor={editor}
                    className="min-h-[250px] prose max-w-none focus:outline-none"
                />
            </div>

            {/* Word Count */}
            <div className="text-right text-sm text-gray-500 font-medium">
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </div>
        </div>
    )
}