'use client';
import { Color, Deck, Format } from '@/types/supabase';
import React, { useCallback, useMemo, useState } from 'react';
import ColorSelector from './colorSelector';
import SearchBar from '../searchbar';
import { GathererCard } from '@/types/gatherer';
import CardList from './cardList';
import CardTooltip from '../cardTooltip';
import { TooltipWrapper } from './components';
import { useRouter } from 'next/navigation';
import BlackContainer from '../utilities/BlackContainer';

type DeckBuilderProps = {
  formats: Format[];
  colors: Color[];
};

/**
 * Todo: make this component modular so it can be user for editting decks as well
 * @param  formats The types of formas the player can choose.
 * @param colors The mtg color wheel.
 */
const DeckBuilder: React.FC<DeckBuilderProps> = ({
  formats,
  colors,
}) => {
  const router = useRouter();

  const [selectedFormat, setSelectedFormat] = useState<number | null>(
    null
  );
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [selectedCards, setSelectedCards] = useState<GathererCard[]>(
    []
  );

  const [cardsByQuantity, setCardsByQuantity] = useState<
    { [multverseid: number]: number }[]
  >([]);

  const [deckName, setDeckName] = useState<string>('');
  const [deckNotes, setDeckNotes] = useState<string>('');
  const [commander, setCommander] = useState<GathererCard | null>(
    null
  );
  const [oathbreaker, setOathbreaker] = useState<GathererCard | null>(
    null
  );
  const [signatureSpell, setSignatureSpell] =
    useState<GathererCard | null>(null);

  const addDeck = async () => {
    const commanderId = commander ? commander.multiverseid : null;
    const oathbreakerId = oathbreaker
      ? oathbreaker.multiverseid
      : null;
    const signatureSpellId = signatureSpell
      ? signatureSpell.multiverseid
      : null;
    const res = await fetch(`${location.origin}/decks/api`, {
      method: 'POST',
      body: JSON.stringify({
        deck: {
          deckName,
          deckNotes,
          commanderId,
          oathbreakerId,
          signatureSpellId,
          selectedFormat,
        },
        selectedColors,
        cardsByQuantity,
      }),
    });
    if (res.status === 201 || res.status === 200) {
      const newDeck: Deck = await res.json();
      router.push(`/decks/${newDeck.id}`);
    } else console.log(`error: ${JSON.stringify(res)}`);
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

  const handleFormatChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCommander(null);
    setSelectedFormat(Number(event.target.value));
  };

  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const colorId = Number(event.target.value);
    const isChecked = event.target.checked;

    setSelectedColors((prevSelectedColors) => {
      if (isChecked) {
        return [...prevSelectedColors, colorId];
      } else {
        return prevSelectedColors.filter(
          (color) => color !== colorId
        );
      }
    });
  };

  const handleSelectedCardChange = (card: GathererCard): void => {
    setSelectedCards((prev) => [...prev, card]);
    setCardsByQuantity([
      ...cardsByQuantity,
      { [card.multiverseid]: 1 },
    ]);
  };

  const handleDeckNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeckName(event.target.value);
  };

  const handleDeckNotesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDeckNotes(event.target.value);
  };

  const formatOptions = formats.map((format) => (
    <option key={format.id} value={format.id}>
      {format.format_name}
    </option>
  ));

  const isDisabled = useCallback(
    (color: Color) => {
      if (color.id === 6) {
        return (
          selectedColors.length > 0 &&
          selectedColors.includes(6) === false
        );
      } else {
        return selectedColors.includes(6) === true;
      }
    },
    [selectedColors]
  );

  const colorSelectors = colors.map((color) => (
    <ColorSelector
      key={color.id}
      color={color}
      selectedColors={selectedColors}
      isDisabled={isDisabled}
      handleColorChange={handleColorChange}
    />
  ));

  return (
    <BlackContainer>
      <div className="p-4">
        <div className="mb-4">
          <label
            htmlFor="format"
            className="block text-sm font-medium text-gray-300"
          >
            Format
          </label>
          <select
            id="format"
            value={selectedFormat || ''}
            onChange={handleFormatChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a format</option>
            {formatOptions}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="colors"
            className="block text-sm font-medium text-gray-300"
          >
            Colors
          </label>
          <div className="mt-1">{colorSelectors}</div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="deckName"
            className="block text-sm font-medium text-gray-300"
          >
            Deck Name
          </label>
          <input
            type="text"
            value={deckName}
            maxLength={60}
            onChange={handleDeckNameChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        {selectedFormat === 1 && (
          <div className="mb-4">
            <label
              htmlFor="commanderId"
              className="block text-sm font-medium text-gray-300"
            >
              Commander
            </label>
            <TooltipWrapper>
              {commander && (
                <CardTooltip imageUrl={`${commander?.imageUrl}`}>
                  <span>{commander.name}</span>
                </CardTooltip>
              )}
            </TooltipWrapper>

            <SearchBar
              callback={(card: GathererCard) => {
                setCommander(card);
              }}
              cardTypeFilters={['Creature']}
              cardSuperTypes={['Legendary']}
            />
          </div>
        )}
        {selectedFormat === 2 && (
          <div className="mb-4">
            <label
              htmlFor="commanderId"
              className="block text-sm font-medium text-gray-300"
            >
              Commander
            </label>
            <TooltipWrapper>
              {commander && (
                <CardTooltip imageUrl={`${commander?.imageUrl}`}>
                  <span>{commander.name}</span>
                </CardTooltip>
              )}
            </TooltipWrapper>
            <SearchBar
              callback={(card: GathererCard) => {
                setCommander(card);
              }}
              cardTypeFilters={['Creature']}
              cardRarities={['Uncommon']}
            />
          </div>
        )}

        {selectedFormat === 4 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="commanderId"
                className="block text-sm font-medium text-gray-300"
              >
                Oathbreaker
              </label>
              <TooltipWrapper>
                {oathbreaker && (
                  <CardTooltip imageUrl={`${oathbreaker?.imageUrl}`}>
                    <span>{oathbreaker.name}</span>
                  </CardTooltip>
                )}
              </TooltipWrapper>
              <SearchBar
                callback={(card: GathererCard) => {
                  setOathbreaker(card);
                }}
                cardTypeFilters={['Planeswalker']}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="signatureSpell"
                className="block text-sm font-medium text-gray-300"
              >
                Signature Spell
              </label>
              <TooltipWrapper>
                {signatureSpell && (
                  <CardTooltip
                    imageUrl={`${signatureSpell?.imageUrl}`}
                  >
                    <span>{signatureSpell.name}</span>
                  </CardTooltip>
                )}
              </TooltipWrapper>
              <SearchBar
                callback={(card: GathererCard) => {
                  setSignatureSpell(card);
                }}
                cardTypeFilters={['Instant', 'Sorcery']}
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label
            htmlFor="deckNotes"
            className="block text-sm font-medium text-gray-300"
          >
            Deck Notes
          </label>
          <textarea
            id="deckNotes"
            value={deckNotes}
            maxLength={500}
            onChange={handleDeckNotesChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <div>
          <SearchBar callback={handleSelectedCardChange} />
        </div>
        <div>
          <label
            htmlFor="deckList"
            className="block text-sm font-medium text-gray-300"
          >
            Deck List
          </label>
          <CardList
            items={selectedCards}
            cardsByQuantity={cardsByQuantity}
            setCardsByQuantity={setCardsByQuantity}
            deleteCallback={removeCard}
          />
        </div>
        <div>
          <button
            onClick={addDeck}
            className="mt-1 bg-white text-black font-bold py-2 px-4 rounded"
          >
            Create Deck
          </button>
        </div>
      </div>
    </BlackContainer>
  );
};

export default DeckBuilder;
