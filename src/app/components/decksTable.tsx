'use client';
import { Colors } from '@/types/enums';
import { Deck, DeckWithColors } from '@/types/supabase';
import Link from 'next/link';
import React, { useState } from 'react';

interface DecksTableProps {
  decks: DeckWithColors[];
}

const DecksTable: React.FC<DecksTableProps> = ({ decks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [decksPerPage] = useState(10); // Number of decks to show per page

  // Sorting state
  const [sortField, setSortField] = useState<keyof Deck | undefined>(
    undefined
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    'asc'
  );

  // Handle column sorting
  const handleSort = (field: keyof Deck | undefined) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filtered and sorted decks
  const sortedDecks = decks.sort((a, b) => {
    if (sortField) {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if ((fieldA as string) < (fieldB as string))
        return sortDirection === 'asc' ? -1 : 1;
      else return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Calculate pagination
  const indexOfLastDeck = currentPage * decksPerPage;
  const indexOfFirstDeck = indexOfLastDeck - decksPerPage;
  const currentDecks = sortedDecks.slice(
    indexOfFirstDeck,
    indexOfLastDeck
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <table className="w-full border border-gray-300">
        <thead>
          <tr>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name
              {sortField === 'name' && (
                <span className="ml-2">
                  {sortDirection === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('deck_format')}
            >
              Format
              {sortField === 'deck_format' && (
                <span className="ml-2">
                  {sortDirection === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </th>
            <th className="px-4 py-2 cursor-pointer">Colors</th>
            <th className="px-4 py-2 cursor-pointer">User</th>
          </tr>
        </thead>
        <tbody>
          {currentDecks.map((deck) => (
            <tr key={deck.id}>
              <td className="px-4 py-2">
                <Link href={`/decks/${deck.id}`}>{deck?.name}</Link>
              </td>
              <td className="px-4 py-2">{deck?.deck_format}</td>
              <td className="px-4 py-2">
                {deck?.decks_colors
                  ?.map((color) => Colors[color.color_id || 0])
                  .reduce((prev, current, i) => {
                    if (i === 0) return current;
                    return prev + ', ' + current;
                  }, '')}
              </td>
              <td>{deck.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4">
        <button
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md mr-2"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastDeck >= decks.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DecksTable;
