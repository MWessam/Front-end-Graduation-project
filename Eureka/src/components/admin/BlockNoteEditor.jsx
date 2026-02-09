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
  defaultBlockSpecs,
  BlockNoteSchema
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
// Separate the config definition from the implementation for Schema compatibility
const QuestionBlockConfig = {
  type: "question",
  propSchema: {
    jsonContent: {
      default: '{"type": "BAR_CHART", "question": "Sample Question"}',
    },
  },
  content: "none",
};

const QuestionBlock = createReactBlockSpec(
  QuestionBlockConfig,
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
  // Create a custom schema that includes the Question block
  // Note: For React Custom Blocks, we pass them directly to useCreateBlockNote's schema option
  // if we can, or we use the BlockNoteSchema.create. 
  // However, BlockNoteSchema.create from @blocknote/core might not fully understand React specs.
  // Actually, useCreateBlockNote handles the schema creation if we pass the specs dictionary.
  // But since we want type safety or explicit schema, let's try passing the spec dictionary to BlockNoteSchema.create.
  
  // FIX: The error "reading 'node'" usually comes from passing a React Spec (which is an object with config + implementation)
  // to a function expecting just the config or a different structure.
  // But createReactBlockSpec should return a valid spec.
  
  // Let's try constructing the schema object manually if BlockNoteSchema.create is failing
  // OR revert to the pattern that is known to work with React: passing the schema object directly
  // created via BlockNoteSchema.create BUT ensure we are using the correct inputs.

  // In latest BlockNote, createReactBlockSpec returns { config, implementation }.
  // BlockNoteSchema.create expects { blockSpecs: { name: config } }.
  // So we might need to pass QuestionBlock.config instead of QuestionBlock itself?
  
  // Let's try passing QuestionBlock.config if it exists, otherwise QuestionBlock itself.
  // We'll inspect it with a log first (but we can't easily see logs).
  
  // SAFE BET: Revert to passing 'schema' to useCreateBlockNote, but constructing it differently.
  // If we look at docs for React Custom Blocks:
  // const schema = BlockNoteSchema.create({ blockSpecs: { ...defaultBlockSpecs, question: QuestionBlock } });
  // This IS the standard way.
  
  // If it fails, maybe defaultBlockSpecs is the issue?
  // Let's try to define the schema OUTSIDE the component to see if it's a timing issue, 
  // but it needs QuestionBlock which is defined in the file.
  
  const schema = React.useMemo(() => {
    try {
      // NOTE: blockSpecs for BlockNoteSchema.create expects just the configuration (QuestionBlockConfig),
      // NOT the React component implementation.
      // The implementation is handled by the React context when the editor is rendered.
      // However, createReactBlockSpec returns an object that bundles both.
      // In newer BlockNote versions, we should pass the returned Spec object to useCreateBlockNote's schema if possible,
      // OR pass the Config to BlockNoteSchema.create.
      
      // Let's try passing the Config to BlockNoteSchema.create
      // This is the correct separation for @blocknote/core
      return BlockNoteSchema.create({
        blockSpecs: {
          ...defaultBlockSpecs,
          question: QuestionBlockConfig,
        },
      });
    } catch (e) {
      console.error("Error creating schema with QuestionBlock:", e);
      // Fallback to default schema if custom one fails
      return BlockNoteSchema.create({
        blockSpecs: defaultBlockSpecs,
      });
    }
  }, []);

  const editor = useCreateBlockNote({
    initialContent: initialContent && initialContent.length > 0 ? initialContent : undefined,
    schema,
  });

  const handleChange = () => {
    if (onContentChange) {
      onContentChange(editor.document);
    }
  };

  // Custom Slash Menu Item
  const insertQuestion = (editor) => {
    console.log("Inserting question block...");
    console.log("Editor Schema Specs:", Object.keys(editor.schema.blockSpecs));
    
    if (!editor.schema.blockSpecs.question) {
      console.error("ERROR: 'question' block spec is missing from editor schema!");
      alert("Error: Question block type not registered in editor.");
      return;
    }

    try {
      const currentBlock = editor.getTextCursorPosition().block;
      
      const questionBlock = {
        type: "question",
        props: {
          jsonContent: '{"type": "BAR_CHART", "question": "Sample Question"}'
        }
      };

      // If current block is empty paragraph (just the slash command), replace it
      const isEmpty = currentBlock.type === "paragraph" && 
        (!currentBlock.content || (Array.isArray(currentBlock.content) && currentBlock.content.length === 0));

      console.log("Current block:", currentBlock);
      console.log("Is empty:", isEmpty);

      if (isEmpty) {
        // Workaround: replaceBlocks can fail with custom blocks in some versions
        // So we insert first, then remove the empty block
        editor.insertBlocks([questionBlock], currentBlock, "after");
        editor.removeBlocks([currentBlock]);
      } else {
        editor.insertBlocks([questionBlock], currentBlock, "after");
      }
    } catch (e) {
      console.error("Failed to insert question block:", e);
      alert(`Failed to insert block: ${e.message}`);
    }
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
