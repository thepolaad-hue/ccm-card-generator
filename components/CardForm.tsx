
import React from 'react';
import type { CardData } from '../types.ts';

interface CardFormProps {
  card: CardData;
  onUpdate: (id: string, field: keyof Omit<CardData, 'id'>, value: string) => void;
  onRemove: (id: string) => void;
  index: number;
}

const InputField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, onChange }) => (
    <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
    </div>
);

export const CardForm: React.FC<CardFormProps> = ({ card, onUpdate, onRemove, index }) => {
  const handleInputChange = (field: keyof Omit<CardData, 'id'>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(card.id, field, e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative mb-6">
        <h3 className="text-xl font-bold mb-4 text-indigo-700">Card {index + 1}</h3>
        <button 
            onClick={() => onRemove(card.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-semibold transition-colors"
        >
            Remove
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField label="स्थळ (Place)" value={card.place} onChange={handleInputChange('place')} />
            <InputField label="दिनांक (Date)" value={card.date} onChange={handleInputChange('date')} />
            <InputField label="वेळ (Time)" value={card.time} onChange={handleInputChange('time')} />
            <InputField label="निमंत्रक (Inviter Name)" value={card.inviterName} onChange={handleInputChange('inviterName')} />
            <InputField label="कंपनी (Company Name)" value={card.companyName} onChange={handleInputChange('companyName')} />
            <InputField label="पत्ता (Address)" value={card.address} onChange={handleInputChange('address')} />
            <InputField label="फोन (Phone)" value={card.phone} onChange={handleInputChange('phone')} />
            <InputField label="Quantity" value={card.quantity} onChange={handleInputChange('quantity')} />
        </div>
    </div>
  );
};
