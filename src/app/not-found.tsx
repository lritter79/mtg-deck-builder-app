import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import PageContainer from './components/pageContainer';
import AppHeader from './components/header/appHeader';
import Footer from './components/footer';

export default async function Custom404() {
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
        <div className="m-auto">
          {' '}
          <h1>404 - Page Not Found</h1>;
        </div>
        <Footer />
      </>
    </PageContainer>
  );
}
