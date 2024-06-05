import { GathererCard } from '@/types/gatherer';
import React from 'react';
import CardTooltip from '../../cardTooltip';

type ComparisonTableProps = {
  leftDeckName: string;
  rightDeckName: string;
  leftDeckId: number;
  rightDeckId: number;
  cardsByQuantityByDeck: {
    [multiverseid: number]: {
      [deckId: number]: { quantity: number };
      card: GathererCard;
    };
  };
};

const ComparisonTable: React.FC<ComparisonTableProps> = (props) => {
  const {
    leftDeckName,
    rightDeckName,
    cardsByQuantityByDeck,
    leftDeckId,
    rightDeckId,
  } = props;

  return (
    <div className="flex justify-center">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">{leftDeckName}</th>
            <th className="border px-4 py-2"></th>
            <th className="border px-4 py-2">{rightDeckName}</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cardsByQuantityByDeck).map((id) => {
            const cardByQuantityByDeck = cardsByQuantityByDeck[+id];
            const leftQuantity = cardByQuantityByDeck[leftDeckId];
            const rightQuantity = cardByQuantityByDeck[rightDeckId];

            return (
              <tr key={id}>
                <td className="border px-4 py-2">
                  {leftQuantity.quantity}
                </td>
                <td className="border px-4 py-2">
                  <CardTooltip
                    imageUrl={cardByQuantityByDeck.card.imageUrl}
                  >
                    {cardByQuantityByDeck.card.name}
                  </CardTooltip>
                </td>
                <td className="border px-4 py-2">
                  {rightQuantity.quantity}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
