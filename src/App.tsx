import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { BsFileDiff, BsFileText, BsImage } from 'react-icons/bs';
import { BiCommand } from 'react-icons/bi';
import fuzzysort from 'fuzzysort';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// In renderer process (web page).
const { ipcRenderer } = require('electron');

const ClipViewer = ({ clip }: { clip: Clip }) => {
  return (
    <div
      style={{
        whiteSpace: 'pre-line',
      }}
    >
      {clip.type === 'image' && (
        <img
          alt="Copied"
          src={clip.contents}
          className="max-w-full max-h-full"
        />
      )}

      {clip.type === 'code' && (
        <SyntaxHighlighter language="javascript" style={tomorrow}>
          {clip.contents}
        </SyntaxHighlighter>
      )}

      {(clip.type === 'text' || clip.type === 'html') && clip.contents}
    </div>
  );
};

const ShortcutIcon = ({ number }: { number: number }) => {
  return (
    <div className="bg-rounded-lg p-1 rounded-lg flex items-center">
      <BiCommand className="text-indigo-500 text-sm" />{' '}
      <span className="text-xs">{number}</span>
    </div>
  );
};

const ClipboardItem = ({
  clip,
  isSelected,
  onClick,
  index,
}: {
  clip: Clip;
  isSelected: boolean;
  index: number | undefined;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  const ref = React.useRef();

  React.useEffect(() => {
    if (!ref.current || !isSelected) return;

    //@ts-ignore
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isSelected]);

  return (
    <div
      ref={ref}
      className={`px-2 py-1 cursor-pointer rounded-lg text-gray-600 hover:text-gray-800 flex items-center justify-between ${
        isSelected ? 'bg-gray-100 text-gray-800' : ''
      }`}
      onClick={onClick}
      aria-hidden="true"
    >
      <div className="flex items-center">
        <div className="min-w-4">
          {clip.type === 'text' && (
            <BsFileText className="text-lg text-indigo-500 mr-1" />
          )}
          {clip.type === 'html' && (
            <BsFileDiff className="text-lg text-gray-500 mr-1" />
          )}

          {clip.type === 'image' && (
            <BsImage className="text-lg text-green-500 mr-1" />
          )}
        </div>

        <span
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {clip.label}
        </span>
      </div>

      {typeof index !== 'undefined' && (
        <div className="ml-1">
          <ShortcutIcon number={index + 1} />
        </div>
      )}
    </div>
  );
};

type Clip = {
  id: string;
  label: string;
  contents: string;
  type: string;
};

type SendClipPayload = {
  clip: Clip;
};

type RefreshClipPayload = {
  clips: Clip[];
};

const MAX_SHORTCUTS = 9;
const LAST_SCROLLTO_INDEX = 11;

const AmmoClip = () => {
  const [{ ids, clips }, setClips] = React.useState<{
    ids: string[];
    clips: { [k: string]: Clip };
  }>({ ids: [], clips: {} });

  const [{ cursor }, setState] = React.useState({ cursor: 0 });
  const [searchResults, setSearch] = React.useState([]);

  const isSearching = !!searchResults.length;
  const filteredIds = isSearching ? searchResults : ids;
  const selectedClip = clips[filteredIds[cursor]];

  // TODO: Arrow navigation probably needs fixed to work correctly with search results

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentCursor = cursor;

      if (e.key === 'Backspace') {
        ipcRenderer.send('DELETE_CLIP', { clip: selectedClip });

        if (isSearching) {
          setSearch((prev) => prev.filter((id) => id !== selectedClip.id));
        }

        setClips((prev) => {
          const {
            [selectedClip.id]: remove,
            ...clipsWithoutDeletedClip
          } = prev.clips;

          return {
            ...prev,
            clips: clipsWithoutDeletedClip,
            ids: prev.ids.filter((id) => id !== selectedClip.id),
          };
        });
      }

      if (e.key === 'Enter') {
        ipcRenderer.send('WRITE_CLIP', { clip: selectedClip });
      }

      // arrow up/down button should select next/previous list element
      if (e.key === 'ArrowUp') {
        setState((prevState) => ({
          ...prevState,
          cursor: prevState.cursor - 1 < 0 ? 0 : prevState.cursor - 1,
        }));

        if (currentCursor - 1 < 0) {
          setClips((prev) => {
            const newIds = [...prev.ids];

            //@ts-ignore
            newIds.unshift(newIds.pop());

            return { ...prev, ids: newIds };
          });
        }
      } else if (e.key === 'ArrowDown') {
        setState((prevState) => ({
          ...prevState,
          cursor:
            prevState.cursor + 1 >= LAST_SCROLLTO_INDEX
              ? LAST_SCROLLTO_INDEX
              : prevState.cursor + 1,
        }));

        if (currentCursor + 1 >= LAST_SCROLLTO_INDEX) {
          setClips((prev) => {
            const newIds = [...prev.ids];

            //@ts-ignore
            newIds.push(newIds.shift());

            return { ...prev, ids: newIds };
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ids, selectedClip, isSearching, cursor]);

  React.useEffect(() => {
    ipcRenderer.send('REFRESH_CLIPS');

    ipcRenderer.on(
      'REFRESH_CLIPS',
      (_: any, { clips: newClips }: RefreshClipPayload) => {
        setClips((prev) => ({
          ...prev,
          ids: [...prev.ids, ...newClips.map((clip) => clip.id)],
          clips: {
            ...prev.clips,
            ...newClips.reduce((acc, curr: Clip) => {
              acc[curr.id] = curr;

              return acc;
            }, {} as { [k: string]: Clip }),
          },
        }));
      }
    );

    ipcRenderer.on('SEND_CLIP', (_: any, args: SendClipPayload) => {
      setClips((prev) => ({
        ...prev,
        ids: [args.clip.id, ...prev.ids],
        clips: { ...prev.clips, [args.clip.id]: args.clip },
      }));
    });
  }, []);

  let searchPromise = React.useRef();

  function handleSearch(e) {
    if (searchPromise.current) {
      //@ts-ignore
      searchPromise.current.cancel();
    }

    if (!e.target.value.trim().length) {
      return setSearch([]);
    }

    //@ts-ignore
    searchPromise.current = fuzzysort.goAsync(
      e.target.value,
      ids.map((id) => clips[id]),
      { key: 'contents' }
    );

    //@ts-ignore
    searchPromise.current.then((results) => {
      setSearch(results.map((result) => result.obj.id));
    });
  }

  function sendContents(clip: Clip) {
    ipcRenderer.send('WRITE_CLIP', { clip });
  }

  return (
    <div className="relative flex h-screen w-full flex-col">
      <div className="border-b-2 border-gray-200 mb-2">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-3 focus:outline-none"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      </div>
      <div
        className="flex flex-1 h-full px-2"
        style={{ maxHeight: 'calc(100vh - 60px)' }}
      >
        <div className="w-1/2 border-r-2 border-gray-200 border-b- h-full pr-2 overflow-hidden pb-20">
          {filteredIds.map((id: string, i: number) => {
            const clip: Clip = clips[id];

            return (
              <ClipboardItem
                key={clip.id}
                clip={clip}
                isSelected={cursor === i}
                index={
                  i < MAX_SHORTCUTS
                    ? cursor === LAST_SCROLLTO_INDEX && i < LAST_SCROLLTO_INDEX
                      ? i - 1
                      : i
                    : undefined
                }
                onClick={() => sendContents(clip)}
              />
            );
          })}
        </div>

        {selectedClip && (
          <div className="w-1/2 h-full pl-2">
            <ClipViewer clip={selectedClip} />
          </div>
        )}
      </div>
      <div
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0), rgba(255,255,255,1))',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 100,
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={AmmoClip} />
      </Switch>
    </Router>
  );
}
