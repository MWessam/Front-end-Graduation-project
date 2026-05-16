import React from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import {
  useCreateBlockNote,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import { defaultBlockSpecs, BlockNoteSchema } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { HelpCircle } from "lucide-react";
import EmbeddedQuestionBuilder from "./EmbeddedQuestionBuilder";
import {
  createDefaultEmbeddedQuestion,
  parseEmbeddedQuestion,
  stringifyEmbeddedQuestion,
} from "../../exercises/embeddedQuestion";

const filterSuggestionItems = (items, query) => {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((item) => {
    if (item.title.toLowerCase().includes(lowerQuery)) return true;
    if (item.aliases && item.aliases.some((alias) => alias.toLowerCase().includes(lowerQuery)))
      return true;
    if (item.subtext && item.subtext.toLowerCase().includes(lowerQuery)) return true;
    return false;
  });
};

const QUESTION_DEFAULT_JSON = stringifyEmbeddedQuestion(createDefaultEmbeddedQuestion());

const QuestionBlockConfig = {
  type: "question",
  propSchema: {
    jsonContent: {
      default: QUESTION_DEFAULT_JSON,
    },
  },
  content: "none",
};

const createQuestionBlock = createReactBlockSpec(QuestionBlockConfig, {
  render: (props) => {
    const [embed, setEmbed] = React.useState(() =>
      parseEmbeddedQuestion(props.block.props.jsonContent)
    );

    React.useEffect(() => {
      setEmbed(parseEmbeddedQuestion(props.block.props.jsonContent));
    }, [props.block.props.jsonContent]);

    const persist = React.useCallback(
      (next) => {
        setEmbed(next);
        props.editor.updateBlock(props.block, {
          props: { jsonContent: stringifyEmbeddedQuestion(next) },
        });
      },
      [props.editor, props.block]
    );

    const stopPropagation = (e) => {
      e.stopPropagation();
    };

    return (
      <div
        className="bn-embedded-q-shell rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => stopPropagation(e)}
        onClick={(e) => stopPropagation(e)}
        onKeyDown={(e) => stopPropagation(e)}
      >
        <EmbeddedQuestionBuilder value={embed} onChange={persist} layout="compact" />
      </div>
    );
  },
});

const questionSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    question: createQuestionBlock(),
  },
});

export default function BlockNoteEditor({ initialContent, onContentChange }) {
  const editor = useCreateBlockNote({
    initialContent: initialContent && initialContent.length > 0 ? initialContent : undefined,
    schema: questionSchema,
  });

  const handleChange = () => {
    onContentChange?.(editor.document);
  };

  const insertQuestion = (ed) => {
    if (!ed.schema.blockSpecs.question) return;
    const currentBlock = ed.getTextCursorPosition().block;

    const questionBlock = {
      type: "question",
      props: {
        jsonContent: QUESTION_DEFAULT_JSON,
      },
    };

    const isEmpty =
      currentBlock.type === "paragraph" &&
      (!currentBlock.content ||
        (Array.isArray(currentBlock.content) && currentBlock.content.length === 0));

    ed.insertBlocks([questionBlock], currentBlock, "after");
    if (isEmpty) {
      ed.removeBlocks([currentBlock]);
    }
  };

  const getCustomSlashMenuItems = (ed) => [
    ...getDefaultReactSlashMenuItems(ed),
    {
      title: "Interactive Question",
      onItemClick: () => insertQuestion(ed),
      aliases: ["question", "interactive", "chart", "quiz"],
      group: "Interactive",
      icon: <HelpCircle size={18} />,
      subtext: "Configurable exercise block (same as question builder)",
    },
  ];

  return (
    <MantineProvider>
      <div className="blocknote-wrapper border rounded-lg shadow-sm bg-white min-h-[500px] text-left">
        <BlockNoteView
          editor={editor}
          onChange={handleChange}
          theme="light"
          slashMenu={false}
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
