import React from "react";
import DecksTable from "../components/decksTable";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import Logger from "ts-logger-node";

const DecksPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: decks, error: deckError } = await supabase
    .from("decks")
    .select(
      `
        user_id,
              commander_id,
              deck_format,
              id,
              name,
              oathbreaker_id,
              signature_spell_id,
              notes,
              decks_colors ( * )
              `
    );

  if (deckError)
    Logger.print(`${JSON.stringify(deckError)}`, "ERROR");

  if (decks === null) return <DecksTable decks={[]} />;

  return <DecksTable decks={decks} />;
};

export default DecksPage;
