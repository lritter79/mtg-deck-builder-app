'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Signout({
  variant,
}: {
  variant: 'neon' | 'blue';
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <button
        className={
          variant === 'neon' ? 'jaceNeonText' : 'text-sky-400'
        }
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </>
  );
}
