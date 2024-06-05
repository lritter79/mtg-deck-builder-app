import React from 'react';
import ResetPwForm from './resetPwForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const PasswordResetPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect('/');
  return <ResetPwForm />;
};

export default PasswordResetPage;
