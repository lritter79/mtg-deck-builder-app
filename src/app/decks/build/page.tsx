import DeckBuilder from '@/app/components/deckbuilder/deckBuilder';
import { Database } from '@/types/supabase';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { error } from 'console';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const DeckBuilderPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect('/');

  let { data: formats, error: formatsError } = await supabase
    .from('decks_formats')
    .select('*');
  let { data: colors, error: colorsError } = await supabase
    .from('colors')
    .select('*');

  if (colorsError) throw colorsError;
  if (formatsError) throw formatsError;

  if (colors && formats) {
    return (
      <>
        <DeckBuilder formats={formats} colors={colors} />
      </>
    );
  }
};

export default DeckBuilderPage;
