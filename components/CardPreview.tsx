
import React from 'react';
import type { CardData } from '../types.ts';

interface CardPreviewProps {
  card: CardData;
}

export const CardPreview: React.FC<CardPreviewProps> = ({ card }) => {
  return (
    <div className="border-b border-gray-400 relative py-4 px-2 text-black">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Section */}
        <div className="space-y-1 pr-4">
          <p><span className="font-bold">स्थळ :</span> {card.place || '...'}</p>
          <p><span className="font-bold">दिनांक :</span> {card.date || '...'}</p>
          <p><span className="font-bold">वेळ :</span> {card.time || '...'}</p>
        </div>
        {/* Right Section */}
        <div className="border-l border-gray-400 pl-4 text-center">
          <p className="font-bold">● निमंत्रक ●</p>
          <p>{card.inviterName || '...'}</p>
          <p className="font-bold text-lg my-1">{card.companyName || '...'}</p>
          <p className="text-sm">{card.address || '...'}</p>
          <p>{card.phone || '...'}</p>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 text-gray-600 text-lg">
        {card.quantity}
      </div>
    </div>
  );
};