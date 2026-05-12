'use client';

import { useState, useCallback } from 'react';
import {
  MAX_ATTEMPTS,
  WORD_LENGTH,
  TileResult,
  getRandomWord,
  evaluateGuess,
  getKeyboardState,
  checkWin,
} from './wordleLogic';
import WordleBoard from './WordleBoard';
import WordleKeyboard from './WordleKeyboard';

const REVEAL_DURATION = WORD_LENGTH * 200 + 300;

const initialState = () => ({
  targetWord:   getRandomWord(),
  guesses:      [] as string[],
  results:      [] as TileResult[][],
  currentGuess: '',
  gameStatus:   'playing' as 'playing' | 'won' | 'lost',
  isRevealing:  false,
  shakeRow:     null as number | null,
  message:      '',
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

      const result     = evaluateGuess(s.currentGuess, s.targetWord);
      const newGuesses = [...s.guesses, s.currentGuess];
      const newResults = [...s.results, result];
      const won  = checkWin(result);
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
        guesses:     newGuesses,
        results:     newResults,
        currentGuess: '',
        isRevealing: true,
        shakeRow:    null,
      };
    });
  }, [showMessage]);

  const reset = () => setState(initialState());

  const kbState    = getKeyboardState(state.results);
  const currentRow = state.guesses.length;

  return (
    <section className="flex flex-col items-center gap-4 sm:gap-6 w-full">
      <div className="text-center">
        <h2 className="font-serif font-light italic text-3xl sm:text-4xl text-rose-deep tracking-wide">Guess How I Feel?</h2>
        <p className="text-velvet/80 mt-1 font-sans text-sm sm:text-base">Because you like Wordle, please do this one for me!</p>
      </div>

      {/* Toast message */}
      <div className={`
        transition-opacity duration-300 text-sm font-sans font-semibold text-white
        bg-gray-800/90 rounded-full px-4 py-1.5
        ${state.message ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        {state.message || ' '}
      </div>

      <WordleBoard
        guesses={state.guesses}
        results={state.results}
        currentGuess={state.currentGuess}
        currentRow={currentRow}
        isRevealing={state.isRevealing}
        shakeRow={state.shakeRow}
      />

      {/* Win result */}
      {state.gameStatus === 'won' && (
        <div className="animate-fadeIn text-center bg-gradient-to-r from-rose-deep via-velvet to-petal-dark text-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
          <div className="text-5xl animate-heartbeat mb-3">♥</div>
          <p className="font-script text-3xl">You figured it out!</p>
          <p className="mt-1 font-serif italic font-light opacity-90 text-lg">Just like you figured out my heart.</p>
          <button
            onClick={reset}
            className="mt-4 px-5 py-2 rounded-full bg-white text-rose-deep font-sans font-semibold text-sm hover:bg-rose-50 transition-colors touch-manipulation"
          >
            Play again
          </button>
        </div>
      )}

      {/* Loss result */}
      {state.gameStatus === 'lost' && (
        <div className="animate-fadeIn text-center bg-white/80 border border-petal rounded-2xl p-6 w-full max-w-sm shadow">
          <p className="font-serif italic font-light text-xl text-rose-deep">The word was</p>
          <p className="font-script text-5xl text-velvet mt-1">{state.targetWord.toLowerCase()}</p>
          <p className="font-serif italic font-light text-gray-500 mt-2 text-base">It&apos;s okay — try the next one!</p>
          <button
            onClick={reset}
            className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-rose-deep to-velvet text-white font-sans font-semibold text-sm hover:opacity-90 transition-opacity touch-manipulation"
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
