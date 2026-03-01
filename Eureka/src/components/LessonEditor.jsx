import React from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { ExerciseBlockComponent } from "./ExerciseBlockComponent";

// Define the custom block with its React renderer outside the component
const ExerciseBlock = createReactBlockSpec(
  {
    type: "exercise",
    propSchema: {
      questionId: {
        default: "q-bar-freq",
      },
    },
    content: "none",
  },
  {
    render: (props) => <ExerciseBlockComponent {...props} />,
  }
);

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    exercise: ExerciseBlock(),
  },
});

export default function LessonEditor({ initialContent }) {
  // Create the editor instance
  const editor = useCreateBlockNote({
    schema,
    initialContent: initialContent || undefined,
  });

  // Handle changes (optional, mostly for debugging or if we wanted to save)
  const handleChange = () => {
    // console.log(editor.document);
  };

  return (
    <div className="lesson-editor-container lesson-editor-read-only">
      <BlockNoteView editor={editor} onChange={handleChange} editable={false} />
    </div>
  );
}
