import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { mapCardsByQuantityToAdd } from '@/app/functions/cardFunctions';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const deckId = params.id;
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { cardsByQuantity, selectedCards } = await request.json();
    console.log('>>>put');
    console.log(cardsByQuantity);
    console.log(selectedCards);
    const { data: version, error: versionError } = await supabase
      .from('deck_version')
      .insert({
        created_at: new Date(Date.now()).toISOString(),
        deck_id: deckId,
      })
      .select();

    if (versionError) throw versionError;
    console.log('>>>');
    console.log(version);
    if (version !== null) {
      const cardsToAdd = mapCardsByQuantityToAdd(
        cardsByQuantity,
        deckId,
        version[0].id
      );

      const { data: cardsData, error: cardsError } = await supabase
        .from('decks_cards')
        .insert(cardsToAdd);
      if (cardsError) throw cardsError;
      console.log('>>>');
      console.log(cardsData);
      return NextResponse.json(cardsData);
    }
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 401 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const id = params.id;
  // we will use params to access the data passed to the dynamic route
  const { error } = await supabase.rpc('delete_deck', {
    deck_id: id,
  });

  if (error)
    return new Response(`${JSON.stringify(error)}`, { status: 400 });

  return new Response(`Deleted Deck ${params.id}`, { status: 200 });
}
