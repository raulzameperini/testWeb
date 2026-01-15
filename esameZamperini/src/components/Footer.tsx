function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <div className="container">
                <div className="row">
                    {/* Sezione Informazioni */}
                    <div className="col-md-4">
                        <h5>Ricettario Zampp</h5>
                        <p>
                            Scopri le migliori ricette per ogni occasione. Unisciti alla nostra community di appassionati di cucina!
                        </p>
                    </div>

                    {/* Sezione Link Rapidi */}
                    <div className="col-md-4">
                        <h5>Link Rapidi</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="/Login" className="text-white text-decoration-none">Login</a></li>
                            <li><a href="/about" className="text-white text-decoration-none">Chi Siamo</a></li>
                            <li><a href="/contact" className="text-white text-decoration-none">Contatti</a></li>
                        </ul>
                    </div>

                    {/* Sezione Contatti */}
                    <div className="col-md-4">
                        <h5>Contatti</h5>
                        <p>Email: info@ricettariozamp.com</p>
                        <p>Telefono: +39 123 456 7890</p>
                        <div>
                            <a href="https://facebook.com" className="text-white me-3">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://instagram.com" className="text-white me-3">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://twitter.com" className="text-white">
                                <i className="bi bi-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <small>&copy; 2026 Ricettario Zampp. Tutti i diritti riservati.</small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;