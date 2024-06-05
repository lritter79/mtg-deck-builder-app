import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Database, Deck } from "@/types/supabase";
import { GathererCard, GathererUrl } from "@/types/gatherer";
import { mapCardsByQuantityToAdd } from "@/app/functions/cardFunctions";

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { deckId, versionId } = await request.json();

    const user = session?.user;

    if (user?.id) {
      const { data, error } = await supabase.rpc("fork_deck", {
        fork_deck_id: deckId,
        fork_version_id: versionId,
        fork_user_id: user.id,
      });
      if (error) throw error;
      return NextResponse.json(data);
    }

    return NextResponse.json("");
  } catch (e: any) {
    return new Response(JSON.stringify(e), { status: 401 });
  }
}
