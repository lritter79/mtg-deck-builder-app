import DeckEditor from '@/app/components/deckbuilder/editors/deckEditor';
import { getCardsInDeck } from '@/app/functions/cardFunctions';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';

const EditPage = async ({ params }: { params: { id: number } }) => {
  const supabase = createServerComponentClient({ cookies });

  let { data: decksByVersion, error: deckError } = await supabase
    .from('deck_version')
    .select(
      `
       id, 
       deck_id, 
       created_at,
       wins,
       losses,
       decks_cards (           
        deck_id,
        gatherer_id,
        id,
        multiverse_id,
        version_id,
        number_of_copies)          
    `
    )
    .eq('deck_id', params.id)
    .order('created_at', { ascending: false });
  if (!decksByVersion) {
    throw deckError;
  } else {
    console.log(decksByVersion[0]);

    const gathererCards = await getCardsInDeck(
      decksByVersion[0]?.decks_cards.map(
        (card) => card.multiverse_id
      ) || []
    );

    const gathererCardsByQuantity =
      decksByVersion[0]?.decks_cards.map((card) => {
        return {
          [card.multiverse_id]: card.number_of_copies as number,
        };
      });

    return (
      <>
        <DeckEditor
          cards={gathererCards}
          cardsByQuantity={gathererCardsByQuantity}
          deckId={params.id}
          versionId={decksByVersion[0].id || ''}
          wins={decksByVersion[0].wins}
          losses={decksByVersion[0].losses}
        />
      </>
    );
  }
};

export default EditPage;
