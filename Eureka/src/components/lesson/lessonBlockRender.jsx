import React from 'react';
import LessonEmbeddedQuestion from './LessonEmbeddedQuestion';

function youtubeEmbedUrl(raw) {
  if (!raw) return '';
  if (raw.includes('embed')) return raw;
  const m = raw.match(/(?:v=)([\w-]{11})|youtu\.be\/([\w-]{11})/);
  const id = m?.[1] || m?.[2];
  if (id) return `https://www.youtube.com/embed/${id}`;
  return raw;
}

function wrapStyledText(text, styles) {
  let node = text;
  if (styles?.code)
    node = (
      <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800 text-sm">{text}</code>
    );
  else {
    if (styles?.bold) node = <strong>{node}</strong>;
    if (styles?.italic) node = <em>{node}</em>;
  }
  const color =
    styles?.textColor && styles.textColor !== 'default' ? styles.textColor : undefined;
  const bg =
    styles?.backgroundColor && styles.backgroundColor !== 'default'
      ? styles.backgroundColor
      : undefined;
  if (color || bg) {
    node = (
      <span style={{ color, backgroundColor: bg }}>
        {node}
      </span>
    );
  }
  return node;
}

function inlineToReactPieces(content, keyPrefix = '') {
  if (!content || !Array.isArray(content)) return null;
  return content.map((piece, idx) => {
    if (!piece || piece.type !== 'text') return null;
    return (
      <React.Fragment key={`${keyPrefix}-i-${idx}`}>
        {wrapStyledText(piece.text ?? '', piece.styles)}
      </React.Fragment>
    );
  });
}

function renderBnParagraph(block, keyPrefix) {
  const inline =
    typeof block.content === 'string'
      ? block.content
      : inlineToReactPieces(block.content, keyPrefix);
  return (
    <p key={`${keyPrefix}-p`} className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
      {inline}
    </p>
  );
}

function renderBnHeading(block, keyPrefix) {
  const lvl = Math.min(Math.max(Number(block.props?.level) || 1, 1), 3);
  const Tag = lvl === 1 ? 'h1' : lvl === 2 ? 'h2' : 'h3';
  const cls =
    lvl === 1
      ? 'text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12'
      : lvl === 2
        ? 'text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8'
        : 'text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6';
  const inner =
    typeof block.content === 'string'
      ? block.content
      : inlineToReactPieces(block.content, keyPrefix);
  return (
    <Tag key={`${keyPrefix}-h`} className={cls}>
      {inner}
    </Tag>
  );
}

function renderVideoEmbed(url, keyPrefix) {
  const src = youtubeEmbedUrl(url);
  const isYt = src.includes('youtube.com/embed');
  return (
    <div
      key={`${keyPrefix}-vid`}
      className="video-container mb-10 rounded-2xl overflow-hidden shadow-2xl"
    >
      {isYt ? (
        <iframe
          width="100%"
          height="500"
          src={src}
          title="Video content"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video controls className="w-full rounded-2xl" src={src} />
      )}
    </div>
  );
}

function renderLessonQuestionBlock(block, keyPrefix) {
  const rawJson =
    block.props?.jsonContent ??
    (typeof block.content === 'string'
      ? block.content
      : JSON.stringify(block.content ?? {}));

  return <LessonEmbeddedQuestion key={`${keyPrefix}-eq`} rawJson={rawJson} />;
}

/** Renders CMS / BlockNote-derived blocks inside a lesson slide */
export function renderLessonSlideBlocks(blocks) {
  if (!blocks?.length) return null;

  const out = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    const key = block.id ?? `b-${i}`;

    const takeList = (predicate) => {
      const grp = [];
      while (i < blocks.length && predicate(blocks[i])) {
        grp.push(blocks[i]);
        i++;
      }
      return grp;
    };

    if (block.type === 'bulletListItem') {
      const items = takeList((b) => b.type === 'bulletListItem');
      out.push(
        <ul
          key={`ul-${items[0].id ?? items[0].type}-${i}`}
          className="space-y-2 mb-6 list-disc list-inside text-gray-700 dark:text-gray-300 text-lg"
        >
          {items.map((li, j) => (
            <li key={li.id ?? j}>
              {typeof li.content === 'string'
                ? li.content
                : inlineToReactPieces(li.content, `li-${j}`)}
              {Array.isArray(li.children) && li.children.length > 0 && (
                <ul className="ml-6 mt-2 space-y-1 list-disc list-inside text-base">
                  {li.children.map((child, ci) => (
                    <li key={child.id ?? ci}>
                      {typeof child.content === 'string'
                        ? child.content
                        : inlineToReactPieces(child.content, `li-${j}-c-${ci}`)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (block.type === 'numberedListItem') {
      const items = takeList((b) => b.type === 'numberedListItem');
      out.push(
        <ol
          key={`ol-${items[0].id ?? i}`}
          className="space-y-2 mb-6 list-decimal list-inside text-gray-700 dark:text-gray-300 text-lg"
        >
          {items.map((li, j) => (
            <li key={li.id ?? j}>
              {typeof li.content === 'string'
                ? li.content
                : inlineToReactPieces(li.content, `nl-${j}`)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (block.type === 'checkListItem') {
      const items = takeList((b) => b.type === 'checkListItem');
      out.push(
        <ul key={`chk-${items[0]?.id ?? i}`} className="space-y-2 mb-6 text-lg">
          {items.map((li, j) => (
            <li
              key={li.id ?? j}
              className="flex gap-3 items-start text-gray-700 dark:text-gray-300"
            >
              <span className="mt-1">
                {li.props?.checked ? '✅' : '⬜'}
              </span>
              <span>
                {typeof li.content === 'string'
                  ? li.content
                  : inlineToReactPieces(li.content, `chk-${j}`)}
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (block.type === 'divider' || block.type === 'horizontalRule') {
      out.push(
        <hr
          key={key}
          className="my-10 border-gray-200 dark:border-gray-700"
        />
      );
      i++;
      continue;
    }

    switch (block.type) {
      case 'title':
        out.push(
          <h1
            key={key}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8"
          >
            {block.content}
          </h1>
        );
        break;
      case 'h1':
        out.push(
          <h1
            key={key}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12"
          >
            {block.content}
          </h1>
        );
        break;
      case 'h2':
      case 'h3':
      case 'h4': {
        const cls =
          block.type === 'h2'
            ? 'text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8'
            : block.type === 'h3'
              ? 'text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6'
              : 'text-lg font-bold text-gray-900 dark:text-white mb-2 mt-4';
        const Tag = block.type === 'h2' ? 'h2' : block.type === 'h3' ? 'h3' : 'h4';
        out.push(
          <Tag key={key} className={cls}>
            {block.content}
          </Tag>
        );
        break;
      }
      case 'paragraph':
        if (Array.isArray(block.content))
          out.push(renderBnParagraph(block, key));
        else
          out.push(
            <p
              key={key}
              className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6"
            >
              {block.content}
            </p>
          );
        break;
      case 'heading':
        out.push(renderBnHeading(block, key));
        break;
      case 'bullet_list':
        out.push(
          <ul key={key} className="space-y-4 mb-8 list-disc list-inside">
            {String(block.content)
              .split('\n')
              .filter(Boolean)
              .map((item, ix) => (
                <li key={ix} className="text-gray-700 dark:text-gray-300 text-lg">
                  {item}
                </li>
              ))}
          </ul>
        );
        break;
      case 'numbered_list':
        out.push(
          <ol key={key} className="space-y-4 mb-8 list-decimal list-inside">
            {String(block.content)
              .split('\n')
              .filter(Boolean)
              .map((item, ix) => (
                <li key={ix} className="text-gray-700 dark:text-gray-300 text-lg">
                  {item}
                </li>
              ))}
          </ol>
        );
        break;
      case 'video':
        out.push(renderVideoEmbed(block.content ?? block.props?.url, key));
        break;
      case 'image':
        out.push(
          <div key={key} className="image-container mb-10">
            <img
              src={
                typeof block.props?.url === 'string'
                  ? block.props.url
                  : block.content
              }
              alt=""
              className="w-full rounded-2xl shadow-xl"
            />
          </div>
        );
        break;
      case 'audio':
        out.push(
          <div
            key={key}
            className="audio-container mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
          >
            <audio
              controls
              className="w-full"
              src={typeof block.props?.url === 'string' ? block.props.url : block.content}
            />
          </div>
        );
        break;
      case 'code':
      case 'codeBlock': {
        let codeText = '';
        if (typeof block.content === 'string') codeText = block.content;
        else if (Array.isArray(block.content))
          codeText = block.content.map((p) => (p?.type === 'text' ? (p.text ?? '') : '')).join('');
        out.push(
          <div
            key={key}
            className="bg-slate-900 rounded-2xl p-8 text-sm mb-8 font-mono overflow-x-auto shadow-xl"
          >
            <pre>
              <code className="text-slate-200">{codeText}</code>
            </pre>
          </div>
        );
        break;
      }
      case 'gamma':
        out.push(
          <div
            key={key}
            className="gamma-card p-10 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800 rounded-3xl mb-10 shadow-sm"
          >
            <div className="flex items-start gap-6">
              <span className="material-icons text-indigo-500 text-4xl">auto_awesome</span>
              <p className="text-indigo-900 dark:text-indigo-200 text-xl leading-relaxed italic">
                {block.content}
              </p>
            </div>
          </div>
        );
        break;
      case 'question':
        out.push(renderLessonQuestionBlock(block, key));
        break;
      default:
        break;
    }
    i++;
  }

  return out;
}
