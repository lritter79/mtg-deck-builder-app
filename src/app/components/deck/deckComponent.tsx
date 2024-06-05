import { Database } from "../../../types/supabase"; // Import the defined types
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getCardsInDeck } from "../../functions/cardFunctions";
import { GathererCard } from "@/types/gatherer";
import Link from "next/link";

import DeckDeleteButton from "../utilities/deckDeleteButton";

import DeckList from "./deckList";
import Logger from "ts-logger-node";

const DeckComponent: React.FC<{ id: number }> = async ({ id }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  let { data: deck, error: deckError } = await supabase
    .from("decks")
    .select(
      `
      user_id,
      commander_id,
      deck_format,
      id,
      notes,
      name,
      oathbreaker_id,
      signature_spell_id             
      `
    )
    .eq("id", id)
    .single();


  const { data: cards, error } = await supabase
    .from("decks_cards")
    .select("*");

  const { data: versions, error: versionsError } = await supabase
    .from("deck_version")
    .select("*")
    .eq("deck_id", id)
    .order("created_at", { ascending: false });

  const gathererCards = await getCardsInDeck(
    cards?.map((card) => card.multiverse_id) || []
  );

  let { data: format, error: formatError } = await supabase
    .from("decks_formats")
    .select(`*`)
    .eq("id", deck?.deck_format)
    .single();

  if (error || formatError || versionsError) {
    Logger.print(JSON.stringify(error), "ERROR");
    throw error;
  }

  if (formatError) {
    Logger.print(JSON.stringify(formatError), "ERROR");
    throw formatError;
  }

  if (versionsError) {
    Logger.print(JSON.stringify(versionsError), "ERROR");
    throw versionsError;
  }

  let deckByCardsByVersion: {
    [versionId: string]: {
      id: number;
      multiverse_id: number;
      number_of_copies: number | null;
      gathererCard: GathererCard | undefined;
    }[];
  } = {};

  if (versions) {
    versions?.forEach((version) => {
      let versionCards = cards
        .filter((card) => card.version_id === version.id)
        .map((card) => {
          let _gathererCard = gathererCards.find(
            (_card) => _card.multiverseid == card.multiverse_id
          );
          return {
            id: card.id,
            multiverse_id: card.multiverse_id,
            number_of_copies: card.number_of_copies,
            gathererCard: _gathererCard,
          };
        });
      deckByCardsByVersion[version.id] = versionCards;
    });
  }

  if (deck && format && gathererCards) {
    return (
      <div className="p-4 bg-gray-100 rounded shadow-md sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{deck.name}</h2>
        {user?.id === deck.user_id && (
          <div>
            <Link
              className="jaceNeonText"
              href={`/decks/${deck.id}/edit`}
            >
              Edit
            </Link>{" "}
            <DeckDeleteButton deckId={id} />
          </div>
        )}
        <p className="text-sm sm:text-base">
          <span className="font-bold">Deck ID:</span> {deck.id}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Format:</span>{" "}
          {format.format_name}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Has Commander:</span>{" "}
          {format.has_commander ? "Yes" : "No"}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Has Oathbreaker:</span>{" "}
          {format.has_oath_breaker ? "Yes" : "No"}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Has Signature Spell:</span>{" "}
          {format.has_signature_spell ? "Yes" : "No"}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Card Limit:</span> {format.card_limit}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Allow Rares:</span>{" "}
          {format.allow_rares ? "Yes" : "No"}

        </p>
        <h3 className="text-lg sm:text-xl font-bold mt-4">Cards:</h3>

        <DeckList
          deckId={deck.id}
          versions={versions}
          deck={deckByCardsByVersion}
          deckUserId={deck.user_id}
          userId={user?.id || null}
        />
      </div>
    );
  }
};

export default DeckComponent;
