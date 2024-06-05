import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function DELETE(
  request: Request,
  { params }: { params: { id: number; versionId: string } }
) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const id = params.id;
  const versionId = params.versionId;
  // we will use params to access the data passed to the dynamic route
  const { error: cardsError } = await supabase
    .from("decks_cards")
    .delete()
    .eq("deck_id", id)
    .eq("version_id", versionId);

  if (cardsError)
    return new Response(`${JSON.stringify(cardsError)}`, {
      status: 400,
    });

  const { error: versionError } = await supabase
    .from("deck_version")
    .delete()
    .eq("id", versionId);

  if (versionError)
    return new Response(`${JSON.stringify(versionError)}`, {
      status: 400,
    });

  return new Response(
    `Deleted Version ${versionId} of Deck ${params.id}`,
    { status: 204 }
  );
}
