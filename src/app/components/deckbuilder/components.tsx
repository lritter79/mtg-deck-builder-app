export const TooltipWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded p-4 mt-1">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
};
