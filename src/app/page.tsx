import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PageContainer from './components/pageContainer';
import Link from 'next/link';
import AppHeader from './components/header/appHeader';
import Footer from './components/footer';
import { useState } from 'react';
import HomePageHeader from './components/header/homePageHeader';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect('/dashboard');

  return (
    <PageContainer>
      <HomePageHeader />
      <div className="m-auto text-center text-white pt-4 p-2">
        <h2 className="md:text-4xl sm:text-md font-bold mb-6">
          Introducing <span className="jaceNeonText">SpellBook</span>:
          Your Ultimate Magic the Gathering Deck Building Companion!
        </h2>
        <p className="md:text-lg sm:text-sm mb-8">
          Unleash the power of{' '}
          <span className="font-bold">SpellBook</span>, the premier
          online platform designed to revolutionize the way you
          construct and refine your Magic the Gathering decks. Awaken
          your strategic prowess as you seamlessly delve into the
          depths of card synergy, unraveling the true potential of
          your creations.
        </p>
        <p className="md:text-lg sm:text-sm mb-8">
          SpellBook&apos;s innovative features empower you to
          visualize the interplay between cards in your deck like
          never before. With a single click, witness the magical
          connections and discover the intricate web of possibilities
          that will guide your deckbuilding journey. Uncover hidden
          synergies, combos, and interactions, enabling you to
          optimize your deck to perfection.
        </p>
        <p className="md:text-lg sm:text-sm mb-8">
          Efficiency becomes your steadfast ally as SpellBook&apos;s
          intelligent algorithms swiftly analyze your deck, providing
          invaluable recommendations to enhance its strengths and
          address any weaknesses. From tribal synergies to impeccable
          color balance, from combo setups to finely tuned curves,
          SpellBook equips you with the tools to craft decks that
          rival the most formidable opponents.
        </p>
        <p className="md:text-lg sm:text-sm mb-8">
          Embark on a journey of collaboration as SpellBook nurtures a
          thriving community of fellow deck builders. Share your
          creations, seek advice, and engage in spirited discussions
          with like-minded players who share your unwavering passion
          for Magic the Gathering. Together, you&apos;ll unlock the
          true essence of every card and ascend to unparalleled
          heights of gameplay.
        </p>
        <p className="md:text-lg sm:text-sm">
          Experience the enchantment of SpellBook and embark on an
          odyssey of limitless possibilities. Begin forging legendary
          decks today and leave your opponents spellbound!
        </p>
      </div>
      <Footer />
    </PageContainer>
  );
}
