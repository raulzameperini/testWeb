# Zampericettario

Un'applicazione web realizzata con **React + Vite** che usa l'API di Spoonacular per cercare e visualizzare ricette, trovare ricette a partire dagli ingredienti disponibili e salva nei i preferiti.

## Descrizione e scopo del progetto

Lo scopo del progetto è semplificare la ricerca e la gestione delle ricette quotidiane offrendo funzionalità utili in cucina: ricerca libera (semantica ), ricerca per ingredienti ("What's in my fridge?"), visualizzazione dettagliata con informazioni nutrizionali e una lista di preferiti.



## Istruzioni per Installazione ed Esecuzione

1.  **Clonare il repository:**
    git clone [https://github.com/raulzameperini/testWeb.git]

2.  **Installazione dipendenze:**
    npm install

3. **Installazione React:**
    npm create vite@latest esameZamperini

4.  **Avviare il progetto:**
    npm run dev

5. **Installazione Tailwind**
    npm install bootstrap

6. **Installazione react-router-dom**
    npm i react-router-dom

7. **Configurare le credenziali**
    Creazione file api.env dove ho messo la chiave api:
    VITE_SPOONACULAR_API_KEY = chiave

## Descrizione dell'API utilizzata

L'app usa l'API Spoonacular (https://spoonacular.com/food-api).

Endpoint principali usati nel progetto:
- `GET /complexSearch` — ricerca ricette per query testuale (usato in `api.searchRecipes`).
- `GET /findByIngredients` — trova ricette fornendo una lista di ingredienti (usato in `api.findByIngredients`).
- `GET /{id}/information` — ottiene i dettagli completi di una ricetta, inclusa la nutrizione (usato in `api.getRecipeDetail`).
- `POST /favorites` — chiamata presente nel client (`api.saveFavoriteRecipe`), non funziona del tutto.


## Eventuali credenziali / mock

- Imposta la variabile `VITE_SPOONACULAR_API_KEY` nel file `.env` (cartella `esameZamperini`).
- l'app salva i preferiti su `localStorage` . 

## Struttura del progetto (parti principali)

- `esameZamperini/`
  - `index.html` 
  - `src/` 
    - `main.tsx` 
    - `App.tsx` – router e layout globale
    - `App.css`, `index.css` 
    - `components/`
      - `Navbar.tsx`, `Footer.tsx` – elementi UI comuni
      - `pages/`
        - `Home.tsx` – pagina principale (ricerca, griglia, dettagli, preferiti)
        - `Favorites.tsx` – pagina che mostra i preferiti (legge da `localStorage`)
        - `SearchBar.tsx`, `Login.tsx`, `Notfound.tsx` – altre pagine/componenti
      - `service/`
        - `api.tsx` – wrapper axios per chiamate a Spoonacular e funzioni utili

## Elenco funzionalità completate

- Ricerca ricette per nome/keyword (`searchRecipes`).
- Ricerca ricette per ingredienti (`findByIngredients`, "What's in my fridge").
- Visualizzazione dettagli ricetta con nutrizione e ingredienti (`getRecipeDetail`).
- Salvataggio preferiti lato client (`localStorage`) e pagina `Preferiti` per visualizzarli.
- Interfaccia responsive con card delle ricette, navbar e routing (`react-router-dom`).
- Componente `SearchBar` che invoca le ricerche nella `Home`.
