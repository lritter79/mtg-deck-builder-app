'use client';
import React, { ReactNode, useLayoutEffect, useState } from 'react';

interface TooltipProps {
  imageUrl: string;
  children: ReactNode;
}

const loadImage = (
  setImageDimensions: React.Dispatch<React.SetStateAction<number>>,
  imageUrl: string
) => {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    setImageDimensions(img.height);
  };
  img.onerror = (err) => {
    console.log('img error');
    console.error(err);
  };
};

const CardTooltip: React.FC<TooltipProps> = ({
  imageUrl,
  children,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);

  useLayoutEffect(() => {
    loadImage(setImageHeight, imageUrl);
    console.log(imageHeight);
  }, []);
  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <div
        className={`absolute z-10 flex items-center bottom-5 ${
          isTooltipVisible ? '' : 'hidden'
        }`}
      >
        <img
          src={imageUrl}
          alt="Card Image Not Found"
          className="absolute z-10 bg-white shadow p-2 rounded"
          style={{
            position: 'relative',
            maxWidth: '160px',
          }}
        />
      </div>
    </div>
  );
};

export default CardTooltip;
