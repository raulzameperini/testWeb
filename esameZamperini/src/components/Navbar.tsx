import { Link } from "react-router-dom";
import { SearchBar } from "./pages/SearchBar";

function Navbar() {
    // Array di configurazione per le pagine
    const pages = [
        { name: "Home", path: "/" },
        { name: "Preferiti", path: "/favorites" },
        { name: "Login", path: "/Login" },
    ];

    return (
        <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: '#2d5016' }}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fs-2 me-5 text-decoration-none text-white fw-bold" style={{ fontFamily: 'Georgia, serif', letterSpacing: '1px' }}>
                    🍽️ Zampericettario
                </Link>
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ filter: 'invert(1)' }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5 fs-5 gap-4">
                        {pages.map((page, index) => (
                            <li key={index} className="nav-item">
                                <Link to={page.path} className="text-decoration-none text-white fw-semibold" style={{ transition: 'color 0.3s', fontSize: '1.1rem', fontFamily: 'Segoe UI, sans-serif' }}>
                                    {page.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <span className="navbar-text">
                        <SearchBar
                            onSearch={(query) => {
                                if ((window as any).handleSearch) (window as any).handleSearch(query);
                            }}
                            onFridgeSearch={(ings) => {
                                if ((window as any).handleFridgeSearch) (window as any).handleFridgeSearch(ings);
                            }}
                        />
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;