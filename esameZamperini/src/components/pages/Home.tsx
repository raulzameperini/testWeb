import { useState } from 'react';
import { api } from '../service/api';
import type { RecipeSummary } from './Spoonacular';

function Home() {
    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Funzioni da passare alla SearchBar tramite Navbar
    // Queste verranno collegate tramite una callback di navigazione
    (window as any).handleSearch = async (query: string) => {
        setLoading(true); setError(null);
        try {
            const results = await api.searchRecipes(query);
            setRecipes(results);
        } catch (e) {
            setError('Errore nella ricerca ricette');
        } finally {
            setLoading(false);
        }
    };
    (window as any).handleFridgeSearch = async (ings: string) => {
        setLoading(true); setError(null);
        try {
            const results = await api.findByIngredients(ings.split(','));
            setRecipes(results);
        } catch (e) {
            setError('Errore nella ricerca ingredienti');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#c8e6c9', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
            <div className="container">
                <div className="mb-5">
                    <h1 className="text-center text-success fw-bold mb-3">🍽️ Le Tue Ricette</h1>
                    <p className="text-center text-muted">Scopri deliziose ricette da preparare</p>
                </div>

                {loading && (
                    <div className="text-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Caricamento...</span>
                        </div>
                        <p className="mt-2 text-success fw-bold">Caricamento ricette...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Errore!</strong> {error}
                    </div>
                )}

                {recipes.length === 0 && !loading && (
                    <div className="text-center text-muted py-5">
                        <p>Nessuna ricetta trovata. Usa la barra di ricerca per iniziare!</p>
                    </div>
                )}

                <div className="row g-4">
                    {recipes.map(r => (
                        <div key={r.id} className="col-lg-3 col-md-4 col-sm-6">
                            <div className="card h-100 border-0 shadow-sm" style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px';
                                }}>
                                <img src={r.image} className="card-img-top" alt={r.title} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-success">{r.title}</h5>
                                    <button className="btn btn-success mt-auto btn-sm">Visualizza ricetta</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;