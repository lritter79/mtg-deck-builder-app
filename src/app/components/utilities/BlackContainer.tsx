import React from 'react';

const BlackContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-black border border-gray-400 rounded-lg p-4 shadow-sm">
      {children}
    </div>
  );
};

export default BlackContainer;
