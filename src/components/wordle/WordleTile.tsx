'use client';

import { TileState } from './wordleLogic';

interface Props {
  letter: string;
  state: TileState;
  colIndex: number;
  isRevealing: boolean;
}

const stateClasses: Record<TileState, string> = {
  correct: 'bg-green-500 text-white border-green-500',
  present: 'bg-yellow-400 text-white border-yellow-400',
  absent:  'bg-gray-500  text-white border-gray-500',
  tbd:     'bg-white text-gray-900 border-rose-400 border-2',
  empty:   'bg-white text-transparent border-gray-300',
};

const delayMs = [0, 200, 400, 600, 800, 1000];

export default function WordleTile({ letter, state, colIndex, isRevealing }: Props) {
  const colorClass = stateClasses[state];
  const revealStyle = isRevealing && (state === 'correct' || state === 'present' || state === 'absent')
    ? {
        animationName: 'flip',
        animationDuration: '0.6s',
        animationTimingFunction: 'ease-in-out',
        animationFillMode: 'both',
        animationDelay: `${delayMs[colIndex]}ms`,
      }
    : {};

  return (
    <div
      className={`
        w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14
        flex items-center justify-center
        text-lg sm:text-xl font-bold uppercase
        border rounded-md
        select-none
        transition-colors duration-100
        ${colorClass}
      `}
      style={revealStyle}
    >
      {letter}
    </div>
  );
}
