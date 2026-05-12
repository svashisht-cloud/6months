export const TARGET_WORD = 'ILOVEU';
export const MAX_ATTEMPTS = 6;
export const WORD_LENGTH = 6;

export type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd';

export interface TileResult {
  letter: string;
  state: TileState;
}

export function evaluateGuess(guess: string, target: string): TileResult[] {
  const result: TileResult[] = Array(WORD_LENGTH).fill(null).map((_, i) => ({
    letter: guess[i],
    state: 'absent' as TileState,
  }));

  const targetConsumed = Array(WORD_LENGTH).fill(false);
  const guessConsumed  = Array(WORD_LENGTH).fill(false);

  // Pass 1: mark greens
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === target[i]) {
      result[i].state = 'correct';
      targetConsumed[i] = true;
      guessConsumed[i]  = true;
    }
  }

  // Pass 2: mark yellows
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessConsumed[i]) continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (targetConsumed[j]) continue;
      if (guess[i] === target[j]) {
        result[i].state = 'present';
        targetConsumed[j] = true;
        break;
      }
    }
  }

  return result;
}

export function getKeyboardState(
  results: TileResult[][]
): Record<string, TileState> {
  const priority: Record<TileState, number> = {
    correct: 3,
    present: 2,
    absent:  1,
    tbd:     0,
    empty:   0,
  };

  const state: Record<string, TileState> = {};

  for (const row of results) {
    for (const tile of row) {
      const current = state[tile.letter];
      if (!current || priority[tile.state] > priority[current]) {
        state[tile.letter] = tile.state;
      }
    }
  }

  return state;
}

export function checkWin(result: TileResult[]): boolean {
  return result.every(t => t.state === 'correct');
}
