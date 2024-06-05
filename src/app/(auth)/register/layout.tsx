import React from 'react';
import PageContainer from '../../components/pageContainer';
import AppHeader from '../../components/header/appHeader';
import Link from 'next/link';
import Footer from '../../components/footer';
import HomePageHeader from '../../components/header/homePageHeader';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer>
      <>
        <HomePageHeader />
        <div className="m-auto"> {children}</div>
        <Footer />
      </>
    </PageContainer>
  );
}
