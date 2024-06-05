import Link from 'next/link';
import React from 'react';

const NoDecksFallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl text-white font-medium mb-4">
        No Decks Found
      </h2>
      <p className="text-white text-center">
        It seems like you don&apos;t have any decks yet. Start
        building your own Magic: The Gathering decks now!
      </p>
      <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        <Link href="/decks">Create New Deck </Link>
      </button>
    </div>
  );
};

export default NoDecksFallback;
