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
    if (input.trim()) {
      if (mode === 'standard') {
        onSearch(input);
      } else {
        onFridgeSearch(input);
      }
      setInput('');
    }
  };

  return (
    <div className="bg-light rounded-3 p-3" style={{ minWidth: '400px' }}>
      <div className="mb-3">
        <div className="form-check form-check-inline">
          <input 
            className="form-check-input"
            type="radio" 
            id="search-standard"
            name="searchMode"
            checked={mode === 'standard'} 
            onChange={() => setMode('standard')} 
          /> 
          <label className="form-check-label" htmlFor="search-standard" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
            🔍 Ricerca Classica
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input 
            className="form-check-input"
            type="radio"
            id="search-fridge" 
            name="searchMode"
            checked={mode === 'fridge'} 
            onChange={() => setMode('fridge')} 
          /> 
          <label className="form-check-label" htmlFor="search-fridge" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
            🧊 Svuota Frigo
          </label>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'standard' ? "Es. Gluten free muffins..." : "Es. apples, flour, sugar..."}
            style={{ fontFamily: 'Segoe UI, sans-serif' }}
          />
          <button className="btn btn-success" type="submit" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
            🔎 Cerca
          </button>
        </div>
      </form>
    </div>
  );
};