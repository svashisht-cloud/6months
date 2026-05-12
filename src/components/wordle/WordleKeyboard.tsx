'use client';

import { useEffect } from 'react';
import { TileState } from './wordleLogic';

interface Props {
  keyboardState: Record<string, TileState>;
  onKey: (key: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  disabled: boolean;
}

const ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫'],
];

function keyColor(state: TileState | undefined): string {
  if (state === 'correct') return 'bg-green-500 text-white';
  if (state === 'present') return 'bg-yellow-400 text-white';
  if (state === 'absent')  return 'bg-gray-400  text-white';
  return 'bg-rose-100 text-gray-800 hover:bg-petal';
}

export default function WordleKeyboard({ keyboardState, onKey, onEnter, onDelete, disabled }: Props) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter') { onEnter(); return; }
      if (e.key === 'Backspace') { onDelete(); return; }
      if (/^[a-zA-Z]$/.test(e.key)) { onKey(e.key.toUpperCase()); }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKey, onEnter, onDelete]);

  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === '⌫';
            const color = isSpecial ? 'bg-velvet text-white hover:bg-velvet-dark' : keyColor(keyboardState[key]);

            return (
              <button
                key={key}
                disabled={disabled}
                onClick={() => {
                  if (key === 'ENTER') onEnter();
                  else if (key === '⌫') onDelete();
                  else onKey(key);
                }}
                className={`
                  ${isSpecial ? 'px-3 text-xs font-bold' : 'w-9 md:w-10'}
                  h-14 rounded font-bold text-sm
                  transition-colors duration-100
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${color}
                `}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
