import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { mapCardsByQuantityToAdd } from '@/app/functions/cardFunctions';
import { NextResponse } from 'next/server';
import Logger from 'ts-logger-node';

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { versionId, wins, losses } = await request.json();
    const { data: version, error: versionError } = await supabase
      .from('deck_version')
      .update({
        wins: wins,
        losses: losses,
      })
      .eq('id', versionId)
      .select();

    if (versionError) throw versionError;

    return NextResponse.json(version);
  } catch (e) {
    Logger.print(JSON.stringify(e), 'ERROR');
    return NextResponse.json(
      { error: JSON.stringify(e) },
      { status: 401 }
    );
  }
}
