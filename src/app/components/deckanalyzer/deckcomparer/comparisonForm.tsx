import { Deck } from '@/types/supabase';
import React, { useState } from 'react';

interface ComparisonFormProps {
  decks: Deck[];
  defaultValues?: { left: number; right: number };
}

const ComparisonForm: React.FC<ComparisonFormProps> = ({
  decks,
  defaultValues,
}) => {
  console.log(defaultValues);
  return (
    <>
      <form className="w-full max-w-md mx-auto mt-4">
        <div className="mb-4">
          <label
            htmlFor="leftDeck"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Deck 1
          </label>
          <select
            id="leftDeck"
            name="leftDeck"
            defaultValue={defaultValues ? defaultValues.left : ''}
            className="w-full border border-gray-400 p-2 rounded"
          >
            <option value="">Select a deck</option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name || 'Unnamed Deck'}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="rightDeck"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Deck 2
          </label>
          <select
            id="rightDeck"
            name="rightDeck"
            defaultValue={defaultValues ? defaultValues.right : ''}
            className="w-full border border-gray-400 p-2 rounded"
          >
            <option value="">Select a deck</option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name || 'Unnamed Deck'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded`}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ComparisonForm;
