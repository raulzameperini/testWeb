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
        <div>
            <h2>Benvenuto in Home</h2>
            {loading && <div>Caricamento...</div>}
            {error && <div style={{color:'red'}}>{error}</div>}
            <div className="row mt-4">
                {recipes.map(r => (
                    <div key={r.id} className="col-md-3 mb-4">
                        <div className="card h-100">
                            <img src={r.image} className="card-img-top" alt={r.title} />
                            <div className="card-body">
                                <h5 className="card-title">{r.title}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;