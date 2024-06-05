import { fetchCardsByName } from '@/app/functions/cardFunctions';
import {
  CardRarityTypes,
  CardSuperTypes,
  CardTypes,
  GathererCard,
} from '@/types/gatherer';
import React, { useState, useEffect } from 'react';

interface Props {
  callback: (card: GathererCard) => void;
  cardTypeFilters?: CardTypes[];
  cardSuperTypes?: CardSuperTypes[];
  cardRarities?: CardRarityTypes[];
}

const SearchBar: React.FC<Props> = ({
  callback,
  cardTypeFilters,
  cardSuperTypes,
  cardRarities,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<GathererCard[]>(
    []
  );
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleShowToast = () => {
    setShowToast(true);
  };
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const fetchCards = async () => {
        try {
          setIsLoading(true);
          let res = await fetchCardsByName(
            searchTerm,
            cardTypeFilters,
            cardSuperTypes,
            cardRarities
          );

          setSearchResults(res);
          setShowResults(true);
        } catch (error) {
          console.error('Error fetching cards:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCards();
    } else {
      setShowResults(false);
      setIsLoading(false);
    }
  }, [searchTerm]);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Card Search..."
        className="mt-1 w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {showResults && (
        <div className="mt-2 max-h-80 overflow-y-auto bg-white rounded-md shadow-md">
          {searchResults.map((card, index) => (
            <div
              key={card.multiverseid}
              title={`Click to add ${card.name} to your deck`}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              } py-2 px-4 cursor-pointer`}
              onClick={() => {
                setIsLoading(false);
                setSearchResults([]);
                setShowResults(false);
                setSearchTerm('');
                callback(card);
              }}
            >
              {card.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
