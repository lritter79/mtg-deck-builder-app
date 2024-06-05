import ComparisonForm from '@/app/components/deckanalyzer/deckcomparer/comparisonForm';
import { Database } from '@/types/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react';
import { redirect } from 'next/navigation';
import ErrorDisplay from '@/app/components/errors/errorDisplay';
import ComparisonTable from '@/app/components/deckanalyzer/deckcomparer/comparisonTable';
import { GathererCard } from '@/types/gatherer';
import { getCardsInDeck } from '@/app/functions/cardFunctions';

type AnalyzePageProps = {
  params: {};
  searchParams: { leftDeck: string; rightDeck: string };
};

async function getCardsByQuantityByDeck(
  comparisonData:
    | {
        multiverse_id: number;
        left_deck_id: number;
        right_deck_id: number;
        right_quantity: number;
        left_quantity: number;
      }[]
    | null
): Promise<{
  [multiverseid: number]: {
    [deckId: number]: {
      quantity: number;
    };
    card: GathererCard;
  };
}> {
  if (comparisonData) {
    let comparissionDictionary: {
      [multiverseid: number]: {
        [deckId: number]: {
          quantity: number;
        };
        card: GathererCard;
      };
    } = {};

    let cards = await getCardsInDeck(
      comparisonData.map((comparator) => {
        return comparator.multiverse_id;
      })
    );

    comparisonData.forEach((comparator) => {
      let deckQuantityDict: {
        [deckId: number]: {
          quantity: number;
        };
      } = {};
      deckQuantityDict[comparator.left_deck_id] = {
        quantity: comparator.left_quantity,
      };
      deckQuantityDict[comparator.right_deck_id] = {
        quantity: comparator.right_quantity,
      };
      let card = cards.find(
        (_card) => _card.multiverseid == comparator.multiverse_id
      );
      if (card) {
        comparissionDictionary[card?.multiverseid] = {
          ...deckQuantityDict,
          card,
        };
      }
    });

    return comparissionDictionary;
  }
  return {};
}

const Page = async (props: AnalyzePageProps) => {
  console.log(props);
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect('/');

  const user = session?.user;

  let { data: decks, error: decksError } = await supabase
    .from('decks')
    .select(`*`)
    .eq('user_id', user?.id);

  if (decksError) return <ErrorDisplay error={decksError} />;
  if (
    props.searchParams.leftDeck !== '' &&
    props.searchParams.rightDeck !== ''
  ) {
    console.log(`>>>${JSON.stringify(props)}`);
    const { data: comparisonData, error } = await supabase.rpc(
      'compare_decks',
      {
        left_id: Number(props.searchParams.leftDeck),
        right_id: Number(props.searchParams.rightDeck),
      }
    );

    if (error) return <>Technical difficulties</>;
    const cardsByQuantityByDeck = await getCardsByQuantityByDeck(
      comparisonData
    );
    return (
      <div>
        <ComparisonForm
          decks={decks || []}
          defaultValues={{
            left: Number(props.searchParams.leftDeck),
            right: Number(props.searchParams.rightDeck),
          }}
        />
        {(comparisonData === null || comparisonData.length === 0) && (
          <div>No overlap</div>
        )}
        {comparisonData && comparisonData.length > 0 && (
          <ComparisonTable
            leftDeckName={
              decks?.find(
                (deck) =>
                  deck.id === Number(props.searchParams.leftDeck)
              )?.name || ''
            }
            rightDeckName={
              decks?.find(
                (deck) =>
                  deck.id === Number(props.searchParams.rightDeck)
              )?.name || ''
            }
            leftDeckId={Number(props.searchParams.leftDeck)}
            rightDeckId={Number(props.searchParams.rightDeck)}
            cardsByQuantityByDeck={cardsByQuantityByDeck}
          />
        )}
      </div>
    );
  }
  return (
    <div>
      <ComparisonForm decks={decks || []} />
    </div>
  );
};

export default Page;
