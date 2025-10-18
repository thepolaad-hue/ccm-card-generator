
import React, { useState, useCallback } from 'react';
import { CardForm } from './components/CardForm.tsx';
import { CardPreview } from './components/CardPreview.tsx';
import { generatePdf } from './services/pdfService.ts';
import type { CardData } from './types.ts';

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  const addCard = () => {
    const newCard: CardData = {
      id: crypto.randomUUID(),
      place: '',
      date: '',
      time: 'सायं 06:00 वाजता',
      inviterName: '',
      companyName: '',
      address: '',
      phone: '',
      quantity: '60',
    };
    setCards(prevCards => [...prevCards, newCard]);
  };

  const updateCard = useCallback((id: string, field: keyof Omit<CardData, 'id'>, value: string) => {
    setCards(prevCards =>
      prevCards.map(card => (card.id === id ? { ...card, [field]: value } : card))
    );
  }, []);

  const removeCard = (id: string) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  const handleGeneratePdf = async () => {
    if (cards.length === 0) {
      alert("Please add at least one card before generating a PDF.");
      return;
    }
    setIsLoadingPdf(true);
    await generatePdf('pdf-content');
    setIsLoadingPdf(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center text-gray-800">CCM Card Generator</h1>
          <p className="text-center text-gray-600 mt-2">Create and export your invitation cards as a PDF</p>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="lg:pr-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Card Details</h2>
            <button
              onClick={addCard}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              + Add Card
            </button>
          </div>
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <CardForm
                key={card.id}
                card={card}
                onUpdate={updateCard}
                onRemove={removeCard}
                index={index}
              />
            ))
          ) : (
             <div className="text-center py-12 px-6 bg-white rounded-lg shadow-md border border-gray-200">
                <p className="text-gray-500">No cards added yet. Click "Add Card" to get started!</p>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="lg:pl-4">
          <div className="sticky top-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Live Preview</h2>
                 <button
                    onClick={handleGeneratePdf}
                    disabled={isLoadingPdf || cards.length === 0}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                >
                    {isLoadingPdf ? 'Generating...' : 'Generate PDF'}
                </button>
            </div>
            
            <div id="pdf-content" className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                {cards.length > 0 ? (
                    <div className="w-[595px] max-w-full mx-auto border-t border-gray-400"> {/* A4-like width for better preview */}
                        {cards.map((card) => (
                            <CardPreview key={card.id} card={card} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-6">
                        <p className="text-gray-500">Your card previews will appear here.</p>
                    </div>
                )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
