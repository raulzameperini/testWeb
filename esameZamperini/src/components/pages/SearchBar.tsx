import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  onFridgeSearch: (ingredients: string) => void;
}

export const SearchBar: React.FC<Props> = ({ onSearch, onFridgeSearch }) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'standard' | 'fridge'>('standard');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'standard') {
      onSearch(input);
    } else {
      onFridgeSearch(input);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '15px' }}>
          <input 
            type="radio" 
            checked={mode === 'standard'} 
            onChange={() => setMode('standard')} 
          /> 
          Ricerca Classica (es. "Gluten free muffins") 
        </label>
        <label>
          <input 
            type="radio" 
            checked={mode === 'fridge'} 
            onChange={() => setMode('fridge')} 
          /> 
          Svuota Frigo (es. "apples, flour, sugar") 
        </label>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'standard' ? "Cerca ricetta..." : "Inserisci ingredienti separati da virgola"}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none' }}>
          Cerca
        </button>
      </form>
    </div>
  );
};