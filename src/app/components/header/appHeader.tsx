import Link from 'next/link';
import React from 'react';
import AppHeaderMenu from './appHeaderMenu';
import HomepageHeaderMenu from './homepageHeaderMenu';

const AppHeader = ({
  spellbookLink,
  hasSession,
}: {
  spellbookLink: 'dashboard' | '';
  hasSession: boolean;
}) => {
  return (
    <header className=" py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 bg-sky-400">
      <div className="flex justify-between items-center">
        <Link href={`/${spellbookLink}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold jaceNeonText">
            SpellBook
          </h1>
        </Link>

        <nav>
          {hasSession ? <AppHeaderMenu /> : <HomepageHeaderMenu />}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
