import React, { useState, useEffect } from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { 
  useCreateBlockNote, 
  SuggestionMenuController, 
  getDefaultReactSlashMenuItems 
} from "@blocknote/react";
import { 
  defaultBlockSpecs 
} from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { HelpCircle } from "lucide-react";
import { getQuestionRenderer } from "../../exercises/renderers";

// --- Utility: Filter Suggestion Items ---
const filterSuggestionItems = (items, query) => {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((item) => {
    // Check title
    if (item.title.toLowerCase().includes(lowerQuery)) return true;
    // Check aliases
    if (item.aliases && item.aliases.some(alias => alias.toLowerCase().includes(lowerQuery))) return true;
    // Check subtext (optional, but helpful)
    if (item.subtext && item.subtext.toLowerCase().includes(lowerQuery)) return true;
    return false;
  });
};

// --- 1. Define the Custom "Question" Block ---
const QuestionBlock = createReactBlockSpec(
  {
    type: "question",
    propSchema: {
      jsonContent: {
        default: '{\n  "type": "BAR_CHART",\n  "question": "Sample Question"\n}',
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      const [jsonVal, setJsonVal] = useState(props.block.props.jsonContent);
      const [parsedData, setParsedData] = useState(null);
      const [error, setError] = useState(null);

      useEffect(() => {
        setJsonVal(props.block.props.jsonContent);
      }, [props.block.props.jsonContent]);

      useEffect(() => {
        try {
          const data = JSON.parse(jsonVal);
          setParsedData(data);
          setError(null);
        } catch (e) {
          setParsedData(null);
          setError(e.message);
        }
      }, [jsonVal]);

      const handleChange = (e) => {
        const newVal = e.target.value;
        setJsonVal(newVal);
        props.editor.updateBlock(props.block, {
          props: { jsonContent: newVal },
        });
      };

      // Stop propagation to prevent BlockNote from handling these events
      const stopPropagation = (e) => {
        e.stopPropagation();
      };

      const RendererComponent = parsedData?.type ? getQuestionRenderer(parsedData.type) : null;

      return (
        <div 
          className="my-4 border rounded-lg overflow-hidden shadow-sm bg-white"
          onKeyDown={stopPropagation}
          onClick={stopPropagation}
        >
          <div className="bg-gray-100 p-2 border-b text-xs font-bold text-gray-600 flex justify-between items-center">
            <span>INTERACTIVE QUESTION BLOCK</span>
            <span className="text-gray-400">JSON Config</span>
          </div>

          <div className="p-0">
            <textarea
              value={jsonVal}
              onChange={handleChange}
              className="w-full p-3 font-mono text-sm bg-gray-50 focus:bg-white focus:outline-none min-h-[120px] resize-y"
              placeholder='{"type": "BAR_CHART", ...}'
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-2 border-t border-red-100">
              Invalid JSON: {error}
            </div>
          )}

          {parsedData && !error && (
            <div className="p-4 border-t bg-white">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Live Preview</div>
              <div className="p-4 border border-dashed rounded bg-gray-50 flex justify-center items-center min-h-[150px]">
                {RendererComponent ? (
                  <RendererComponent 
                    questionBody={parsedData} 
                    mode="VIEW" 
                    onResponse={() => {}} 
                  />
                ) : (
                  <div className="text-gray-400 italic">
                    {parsedData.type ? `No renderer found for type: ${parsedData.type}` : "Specify a 'type' to see preview"}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    },
  }
);

// --- 2. The Main Editor Component ---
export default function BlockNoteEditor({ initialContent, onContentChange }) {
  const editor = useCreateBlockNote({
    initialContent: initialContent && initialContent.length > 0 ? initialContent : undefined,
    blockSpecs: {
      ...defaultBlockSpecs,
      question: QuestionBlock,
    },
  });

  const handleChange = () => {
    if (onContentChange) {
      onContentChange(editor.document);
    }
  };

  // Custom Slash Menu Item
  const insertQuestion = (editor) => {
    const currentBlock = editor.getTextCursorPosition().block;
    
    // Insert the question block after the current block
    editor.insertBlocks(
      [
        {
          type: "question",
        },
      ],
      currentBlock,
      "after"
    );
  };

  const getCustomSlashMenuItems = (editor) => [
    ...getDefaultReactSlashMenuItems(editor),
    {
      title: "Interactive Question",
      onItemClick: () => insertQuestion(editor),
      aliases: ["question", "interactive", "chart", "quiz"],
      group: "Interactive",
      icon: <HelpCircle size={18} />,
      subtext: "Insert a configurable interactive question",
    },
  ];

  return (
    <MantineProvider>
      <div className="blocknote-wrapper border rounded-lg shadow-sm bg-white min-h-[500px] text-left">
        <BlockNoteView 
          editor={editor} 
          onChange={handleChange}
          theme="light"
          slashMenu={false} // Disable default to use custom one
        >
          <SuggestionMenuController
            triggerCharacter={"/"}
            getItems={async (query) =>
              filterSuggestionItems(getCustomSlashMenuItems(editor), query)
            }
          />
        </BlockNoteView>
      </div>
    </MantineProvider>
  );
}
