import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import ErrorDisplay from "../components/errors/errorDisplay";
import NoDecksFallback from "../components/noDecksFallback";
import { Database, Deck } from "@/types/supabase";
import BlackContainer from "../components/utilities/BlackContainer";
import Tooltip from "../components/utilities/Tooltip";
import DeckGrid from "../components/dashboard/deckGrid";

const Dashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/");

  const user = session?.user;
  let { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(`username, avatar_url`)
    .eq("id", user?.id)
    .single();

  let { data: decks, error: decksError } = await supabase
    .from("decks")
    .select(`*`)
    .eq("user_id", user?.id);

  if (decksError && decks === null)
    return <ErrorDisplay error={decksError} />;
  if (profileError) return <ErrorDisplay error={profileError} />;
  if (decksError) return <ErrorDisplay error={decksError} />;

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4 text-center text-white">
        Welcome, {profile?.username}!
      </h1>

      <div>
        {decks === null || decks.length === 0 ? (
          <NoDecksFallback />
        ) : (
          <DeckGrid decks={decks} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
