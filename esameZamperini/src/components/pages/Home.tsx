import { useState } from 'react';
import { api } from '../service/api';
import type { RecipeSummary, RecipeDetail } from './Spoonacular';

function Home() {
    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
    const [recipeDetail, setRecipeDetail] = useState<RecipeDetail | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    // Funzione ricerca ricette per nome
    (window as any).handleSearch = async (query: string) => {
        setLoading(true); 
        setError(null);
        setRecipeDetail(null);
        try {
            const results = await api.searchRecipes(query);
            setRecipes(results);
        } catch (e) {
            setError('Errore nella ricerca ricette');
        } finally {
            setLoading(false);
        }
    };

    // Funzione ricerca ricette per ingredienti
    (window as any).handleFridgeSearch = async (ings: string) => {
        setLoading(true); 
        setError(null);
        setRecipeDetail(null);
        try {
            const ingredients = ings.split(',').map(i => i.trim()).filter(i => i);
            const results = await api.findByIngredients(ingredients);
            setRecipes(results);
        } catch (e) {
            setError('Errore nella ricerca ingredienti');
        } finally {
            setLoading(false);
        }
    };

    // Funzione per visualizzare dettagli ricetta
    const handleViewRecipe = async (recipeId: number) => {
        setDetailLoading(true);
        setError(null);
        try {
            const detail = await api.getRecipeDetail(recipeId);
            setRecipeDetail(detail);
            setSelectedRecipeId(recipeId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) {
            setError('Errore nel caricamento dei dettagli della ricetta');
        } finally {
            setDetailLoading(false);
        }
    };

    // Funzione per aggiungere ai preferiti
    const handleAddFavorite = async (recipeId: number) => {
        try {
            const userId = 'user_' + new Date().getTime(); // Simple user ID
            await api.saveFavoriteRecipe(recipeId, userId);
            setFavorites([...favorites, recipeId]);
        } catch (e) {
            setError('Errore nel salvataggio preferito');
        }
    };

    return (
        <div style={{ backgroundColor: '#c8e6c9', minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px' }}>
            <div className="container">
                <div className="mb-5">
                    <h1 className="text-center text-success fw-bold mb-3">🍽️ Le Tue Ricette</h1>
                    <p className="text-center text-muted">Scopri deliziose ricette da preparare</p>
                </div>

                {/* SEZIONE DETTAGLI RICETTA */}
                {recipeDetail && (
                    <div className="alert alert-info mb-4" role="alert">
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => { setRecipeDetail(null); setSelectedRecipeId(null); }}
                        ></button>
                        <div className="row">
                            <div className="col-md-4">
                                <img 
                                    src={recipeDetail.image} 
                                    alt={recipeDetail.title}
                                    className="img-fluid rounded"
                                    style={{ height: '300px', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="col-md-8">
                                <h2 className="text-success mb-3">{recipeDetail.title}</h2>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <p><strong>⏱️ Tempo di preparazione:</strong> {recipeDetail.readyInMinutes} minuti</p>
                                        <p><strong>👥 Porzioni:</strong> {recipeDetail.servings}</p>
                                        <p><strong>� Prezzo per porzione:</strong> €{recipeDetail.pricePerServing?.toFixed(2) || '0.00'}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>👍 Popolarità:</strong> {recipeDetail.aggregateLikes || 0} likes</p>
                                        <p><strong>🔗 Fonte:</strong> <a href={recipeDetail.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-success">Visualizza ricetta originale</a></p>
                                    </div>
                                </div>

                                {/* INGREDIENTI */}
                                {recipeDetail.extendedIngredients && recipeDetail.extendedIngredients.length > 0 && (
                                    <div className="mb-3">
                                        <h5 className="text-success">📋 Ingredienti</h5>
                                        <ul className="list-group">
                                            {recipeDetail.extendedIngredients.map((ing: any, idx: number) => (
                                                <li key={idx} className="list-group-item">
                                                    {ing.original}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* ISTRUZIONI */}
                                {recipeDetail.sourceUrl && (
                                    <div className="mb-3">
                                        <h5 className="text-success">📖 Leggi la ricetta completa</h5>
                                        <p>Accedi alla fonte originale per le istruzioni dettagliate passo dopo passo</p>
                                        <a href={recipeDetail.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success">
                                            📄 Apri ricetta completa
                                        </a>
                                    </div>
                                )}

                                {/* INFORMAZIONI NUTRIZIONALI */}
                                {recipeDetail.nutrition && (
                                    <div className="mb-3">
                                        <h5 className="text-success">🥗 Informazioni Nutrizionali (per porzione)</h5>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <p><strong>Calorie:</strong> {Math.round(recipeDetail.nutrition.nutrients?.[0]?.amount || 0)} kcal</p>
                                            </div>
                                            <div className="col-md-3">
                                                <p><strong>Proteine:</strong> {Math.round(recipeDetail.nutrition.nutrients?.[5]?.amount || 0)}g</p>
                                            </div>
                                            <div className="col-md-3">
                                                <p><strong>Carboidrati:</strong> {Math.round(recipeDetail.nutrition.nutrients?.[3]?.amount || 0)}g</p>
                                            </div>
                                            <div className="col-md-3">
                                                <p><strong>Grassi:</strong> {Math.round(recipeDetail.nutrition.nutrients?.[1]?.amount || 0)}g</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button 
                                    className="btn btn-success"
                                    onClick={() => { setRecipeDetail(null); setSelectedRecipeId(null); }}
                                >
                                    ✕ Chiudi
                                </button>
                                {!favorites.includes(selectedRecipeId!) && (
                                    <button 
                                        className="btn btn-outline-success ms-2"
                                        onClick={() => handleAddFavorite(selectedRecipeId!)}
                                    >
                                        ❤️ Aggiungi ai preferiti
                                    </button>
                                )}
                                {favorites.includes(selectedRecipeId!) && (
                                    <button 
                                        className="btn btn-success ms-2"
                                        disabled
                                    >
                                        ❤️ Aggiunto ai preferiti
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* INDICATORI DI STATO */}
                {loading && (
                    <div className="text-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Caricamento...</span>
                        </div>
                        <p className="mt-2 text-success fw-bold">Caricamento ricette...</p>
                    </div>
                )}

                {detailLoading && (
                    <div className="text-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Caricamento...</span>
                        </div>
                        <p className="mt-2 text-success fw-bold">Caricamento dettagli...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Errore!</strong> {error}
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => setError(null)}
                        ></button>
                    </div>
                )}

                {recipes.length === 0 && !loading && !recipeDetail && (
                    <div className="text-center text-muted py-5">
                        <p>Nessuna ricetta trovata. Usa la barra di ricerca per iniziare!</p>
                    </div>
                )}

                {/* GRIGLIA RICETTE */}
                {recipes.length > 0 && (
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
                                        <div className="mt-auto">
                                            <button 
                                                className="btn btn-success btn-sm w-100"
                                                onClick={() => handleViewRecipe(r.id)}
                                                disabled={detailLoading}
                                            >
                                                👁️ Visualizza ricetta
                                            </button>
                                            <button 
                                                className={`btn btn-sm w-100 mt-2 ${favorites.includes(r.id) ? 'btn-success' : 'btn-outline-success'}`}
                                                onClick={() => !favorites.includes(r.id) && handleAddFavorite(r.id)}
                                                disabled={favorites.includes(r.id)}
                                            >
                                                {favorites.includes(r.id) ? '❤️ Preferito' : '🤍 Preferito'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;