'use client';

import { useState } from 'react';
import CardTooltip from '../cardTooltip';

interface CardProps {
  name: string;
  multiverseid: number;
  imageUrl?: string;
}

interface Props {
  items: CardProps[];
  deleteCallback: (multiverseid: number) => void;
  cardsByQuantity: {
    [multverseid: number]: number;
  }[];
  setCardsByQuantity: React.Dispatch<
    React.SetStateAction<
      {
        [multverseid: number]: number;
      }[]
    >
  >;
}

const CardList: React.FC<Props> = ({
  items,
  deleteCallback,
  cardsByQuantity,
  setCardsByQuantity,
}) => {
  function getValueByKey(number: number) {
    const kvp = cardsByQuantity.find((obj) =>
      obj.hasOwnProperty(number)
    );
    if (kvp) {
      return kvp[number];
    } else {
      return undefined;
    }
  }

  const updateCardQuantity = (
    multiverseid: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const quantity = parseInt(event.target.value);

    setCardsByQuantity((prevCards) => {
      // Find the index of the item with matching multiverseid
      const index = prevCards.findIndex((card) => card[multiverseid]);

      if (index !== -1) {
        // If the item exists, update its quantity
        const updatedCard = { ...prevCards[index] };
        updatedCard[multiverseid] = quantity;

        // Create a new array with the updated item
        const updatedCards = [...prevCards];
        updatedCards[index] = updatedCard;

        return updatedCards;
      }

      // If the item doesn't exist, add it to the array
      const newCard = { [multiverseid]: quantity };
      return [...prevCards, newCard];
    });
  };

  return (
    <div className="bg-white rounded p-4 mt-1">
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div key={item.multiverseid} className="flex items-center">
            <div>
              <CardTooltip imageUrl={`${item?.imageUrl}`}>
                <span>{item.name}</span>
              </CardTooltip>
            </div>
            <div className="ml-auto flex items-center">
              <select
                className="border border-gray-300 px-2 py-1 w-50"
                value={getValueByKey(item.multiverseid) || ''}
                onChange={(event) =>
                  updateCardQuantity(item.multiverseid, event)
                }
              >
                {Array.from(
                  { length: 100 },
                  (_, index) => index + 1
                ).map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
              <button
                className="ml-2 text-red-500"
                onClick={() => deleteCallback(item.multiverseid)}
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
