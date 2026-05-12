'use client';

import { useState, useCallback } from 'react';
import {
  TARGET_WORD,
  MAX_ATTEMPTS,
  WORD_LENGTH,
  TileResult,
  evaluateGuess,
  getKeyboardState,
  checkWin,
} from './wordleLogic';
import WordleBoard from './WordleBoard';
import WordleKeyboard from './WordleKeyboard';

const REVEAL_DURATION = WORD_LENGTH * 200 + 300;

const initialState = () => ({
  guesses: [] as string[],
  results: [] as TileResult[][],
  currentGuess: '',
  gameStatus: 'playing' as 'playing' | 'won' | 'lost',
  isRevealing: false,
  shakeRow: null as number | null,
  message: '',
});

export default function WordleGame() {
  const [state, setState] = useState(initialState);

  const showMessage = useCallback((msg: string) => {
    setState(s => ({ ...s, message: msg }));
    setTimeout(() => setState(s => ({ ...s, message: '' })), 1800);
  }, []);

  const handleKey = useCallback((key: string) => {
    setState(s => {
      if (s.gameStatus !== 'playing' || s.isRevealing) return s;
      if (s.currentGuess.length >= WORD_LENGTH) return s;
      return { ...s, currentGuess: s.currentGuess + key };
    });
  }, []);

  const handleDelete = useCallback(() => {
    setState(s => {
      if (s.gameStatus !== 'playing' || s.isRevealing) return s;
      return { ...s, currentGuess: s.currentGuess.slice(0, -1) };
    });
  }, []);

  const handleEnter = useCallback(() => {
    setState(s => {
      if (s.gameStatus !== 'playing' || s.isRevealing) return s;

      if (s.currentGuess.length < WORD_LENGTH) {
        const row = s.guesses.length;
        setTimeout(() => setState(prev => ({ ...prev, shakeRow: null })), 500);
        showMessage('Not enough letters');
        return { ...s, shakeRow: row };
      }

      const result  = evaluateGuess(s.currentGuess, TARGET_WORD);
      const newGuesses = [...s.guesses, s.currentGuess];
      const newResults = [...s.results, result];
      const won = checkWin(result);
      const lost = !won && newGuesses.length >= MAX_ATTEMPTS;

      setTimeout(() => {
        setState(prev => ({
          ...prev,
          isRevealing: false,
          gameStatus: won ? 'won' : lost ? 'lost' : 'playing',
        }));
      }, REVEAL_DURATION);

      return {
        ...s,
        guesses: newGuesses,
        results: newResults,
        currentGuess: '',
        isRevealing: true,
        shakeRow: null,
      };
    });
  }, [showMessage]);

  const reset = () => setState(initialState());

  const kbState = getKeyboardState(state.results);
  const currentRow = state.guesses.length;

  return (
    <section className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-serif text-3xl text-rose-deep font-bold">Can You Guess How I Feel?</h2>
        <p className="text-velvet mt-1 italic font-serif">6 letters. 6 chances. The word says it all.</p>
      </div>

      {/* Toast message */}
      <div className={`
        transition-opacity duration-300 text-sm font-bold text-white
        bg-gray-800 rounded-full px-4 py-1
        ${state.message ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        {state.message || ' '}
      </div>

      <WordleBoard
        guesses={state.guesses}
        results={state.results}
        currentGuess={state.currentGuess}
        currentRow={currentRow}
        isRevealing={state.isRevealing}
        shakeRow={state.shakeRow}
      />

      {/* Win / Loss result */}
      {state.gameStatus === 'won' && (
        <div className="animate-fadeIn text-center bg-gradient-to-r from-rose-deep via-velvet to-petal-dark text-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
          <div className="text-5xl animate-heartbeat mb-3">♥</div>
          <p className="font-serif text-2xl font-bold">You figured it out!</p>
          <p className="mt-1 italic opacity-90">Just like you figured out my heart.</p>
          <button
            onClick={reset}
            className="mt-4 px-5 py-2 rounded-full bg-white text-rose-deep font-bold text-sm hover:bg-rose-50 transition-colors"
          >
            Play again
          </button>
        </div>
      )}

      {state.gameStatus === 'lost' && (
        <div className="animate-fadeIn text-center bg-white/80 border border-petal rounded-2xl p-6 w-full max-w-sm shadow">
          <p className="font-serif text-xl text-rose-deep font-bold">The word was</p>
          <p className="font-serif text-4xl font-bold text-velvet tracking-widest mt-1">ILOVEU</p>
          <p className="text-gray-500 italic mt-2 text-sm">It&apos;s okay — now you know for certain.</p>
          <button
            onClick={reset}
            className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-rose-deep to-velvet text-white font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
        </div>
      )}

      <WordleKeyboard
        keyboardState={kbState}
        onKey={handleKey}
        onEnter={handleEnter}
        onDelete={handleDelete}
        disabled={state.isRevealing || state.gameStatus !== 'playing'}
      />
    </section>
  );
}
