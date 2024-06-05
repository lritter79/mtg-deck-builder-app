import React from 'react';
import PageContainer from '../../components/pageContainer';
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
