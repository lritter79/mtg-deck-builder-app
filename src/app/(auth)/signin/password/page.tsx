import React from 'react';
import ForgotPwForm from './forgotPwForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const PasswordRecoveryPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect('/dashboard');

  return (
    <div className="m-auto">
      <ForgotPwForm />
    </div>
  );
};

export default PasswordRecoveryPage;
