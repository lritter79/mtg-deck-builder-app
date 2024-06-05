export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:container min-h-screen  border-0 border-transparent lg:border-cyan-50	lg:border-solid lg:border-r-2 lg:border-l-2 flex flex-col">
      {children}
    </div>
  );
}
