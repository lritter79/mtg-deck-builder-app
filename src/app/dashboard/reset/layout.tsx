export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="m-auto"> {children}</div>
    </>
  );
}
