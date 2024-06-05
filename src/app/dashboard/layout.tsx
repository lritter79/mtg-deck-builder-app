import React, { useState } from 'react';
import Signout from '../components/signout';
import PageContainer from '../components/pageContainer';
import AppHeader from '../components/header/appHeader';
import Footer from '../components/footer';
import Link from 'next/link';
import AppHeaderMenu from '../components/header/appHeaderMenu';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <PageContainer>
      <>
        <AppHeader
          hasSession={session !== null}
          spellbookLink="dashboard"
        />
        <div className="m-auto"> {children}</div>
        <Footer />
      </>
    </PageContainer>
  );
}
