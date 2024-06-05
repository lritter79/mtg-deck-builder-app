'use client';

import { GathererCard } from '@/types/gatherer';
import { SetStateAction, useState } from 'react';
import CardList from '../cardList';
import SearchBar from '../../searchbar';
import { useRouter } from 'next/navigation';
import WinsAndLossesEditor from './winsAndLossEditor';

type DeckEditorProps = {
  cards: GathererCard[];
  cardsByQuantity: { [multverseid: number]: number }[];
  deckId: number;
  wins: number; // New property: number of wins for the deck
  losses: number; // New property: number of losses for the deck
  versionId: string; // New property: a string identifier for the version of the deck
};

export const DeckEditor: React.FC<DeckEditorProps> = (props) => {
  const router = useRouter();

  const [selectedCards, setSelectedCards] = useState<GathererCard[]>(
    props.cards
  );

  const [cardsByQuantity, setCardsByQuantity] = useState<
    { [multverseid: number]: number }[]
  >(props.cardsByQuantity);

  const handleSelectedCardChange = (card: GathererCard): void => {
    setSelectedCards((prev) => [...prev, card]);
    setCardsByQuantity([
      ...cardsByQuantity,
      { [card.multiverseid]: 1 },
    ]);
  };

  function removeCard(multiverseid: number): void {
    setSelectedCards((prev) => {
      return prev.filter(
        (card) => card.multiverseid !== multiverseid
      );
    });
    setCardsByQuantity((prev) => {
      return prev.filter(
        (card) => !card.hasOwnProperty(multiverseid)
      );
    });
  }

  const editDeck = async () => {
    const res = await fetch(
      `${location.origin}/decks/api/${props.deckId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          cardsByQuantity,
          selectedCards,
        }),
      }
    );
    if (res.status === 201 || res.status === 200) {
      router.push(`/decks/${props.deckId}`);
    } else console.log(`error: ${JSON.stringify(res)}`);
  };

  return (
    <div className="bg-black border border-gray-400 rounded-lg p-4 shadow-sm">
      <div className="p-8">
        <div>
          <SearchBar callback={handleSelectedCardChange} />
        </div>
        <CardList
          items={selectedCards}
          deleteCallback={removeCard}
          cardsByQuantity={cardsByQuantity}
          setCardsByQuantity={setCardsByQuantity}
        />
      </div>
      <div>
        <button
          onClick={editDeck}
          className="mt-1 bg-white text-black font-bold py-2 px-4 rounded"
        >
          Save Deck
        </button>
      </div>
    </div>
  );
};

export default DeckEditor;
