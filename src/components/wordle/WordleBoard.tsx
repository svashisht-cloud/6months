'use client';

import { TileResult, TileState, WORD_LENGTH, MAX_ATTEMPTS } from './wordleLogic';
import WordleTile from './WordleTile';

interface Props {
  guesses: string[];
  results: TileResult[][];
  currentGuess: string;
  currentRow: number;
  isRevealing: boolean;
  shakeRow: number | null;
}

export default function WordleBoard({
  guesses,
  results,
  currentGuess,
  currentRow,
  isRevealing,
  shakeRow,
}: Props) {
  const rows = Array(MAX_ATTEMPTS).fill(null).map((_, rowIdx) => {
    const isCompleted = rowIdx < currentRow;
    const isActive    = rowIdx === currentRow;

    const tiles = Array(WORD_LENGTH).fill(null).map((_, colIdx) => {
      let letter: string = '';
      let state: TileState = 'empty';

      if (isCompleted) {
        letter = guesses[rowIdx]?.[colIdx] ?? '';
        state  = results[rowIdx]?.[colIdx]?.state ?? 'absent';
      } else if (isActive) {
        letter = currentGuess[colIdx] ?? '';
        state  = letter ? 'tbd' : 'empty';
      }

      return (
        <WordleTile
          key={colIdx}
          letter={letter}
          state={state}
          colIndex={colIdx}
          isRevealing={isCompleted && isRevealing && rowIdx === currentRow - 1}
        />
      );
    });

    return (
      <div
        key={rowIdx}
        className={`flex gap-1.5 ${shakeRow === rowIdx ? 'animate-shake' : ''}`}
      >
        {tiles}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-1.5 p-4">
      {rows}
    </div>
  );
}
