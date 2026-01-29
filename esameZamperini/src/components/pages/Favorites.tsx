import { useEffect, useState } from 'react';
import { api } from '../service/api';
import type { RecipeDetail } from './Spoonacular';

function Favorites() {
    const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
        try {
            const raw = localStorage.getItem('favorites');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });
    const [recipes, setRecipes] = useState<RecipeDetail[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (!favoriteIds || favoriteIds.length === 0) {
                setRecipes([]);
                return;
            }
            setLoading(true);
            try {
                const details = await Promise.all(favoriteIds.map(id => api.getRecipeDetail(id)));
                setRecipes(details);
            } catch (e) {
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [favoriteIds]);

    const removeFavorite = (id: number) => {
        const next = favoriteIds.filter(x => x !== id);
        setFavoriteIds(next);
        localStorage.setItem('favorites', JSON.stringify(next));
    };

    return (
        <div style={{ backgroundColor: '#c8e6c9', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
            <div className="container">
                <div className="mb-5 text-center">
                    <h1 className="text-success fw-bold">❤️ I Miei Preferiti</h1>
                    <p className="text-muted">Qui trovi le ricette che hai salvato</p>
                </div>

                {loading && (
                    <div className="text-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Caricamento...</span>
                        </div>
                    </div>
                )}

                {!loading && recipes.length === 0 && (
                    <div className="text-center text-muted py-5">Nessun preferito salvato.</div>
                )}

                <div className="row g-4">
                    {recipes.map(r => (
                        <div key={r.id} className="col-lg-3 col-md-4 col-sm-6">
                            <div className="card h-100 border-0 shadow-sm">
                                <img src={r.image} className="card-img-top" alt={r.title} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-success">{r.title}</h5>
                                    <div className="mt-auto">
                                        <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success w-100">Apri ricetta</a>
                                        <button className="btn btn-sm btn-danger w-100 mt-2" onClick={() => removeFavorite(r.id)}>Rimuovi dai preferiti</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Favorites;
