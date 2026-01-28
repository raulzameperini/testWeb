function Footer() {
    return (
        <footer className="text-white py-5 mt-auto shadow-lg" style={{ backgroundColor: '#2d5016' }}>
            <div className="container">
                <div className="row">
                    {/* Sezione Informazioni */}
                    <div className="col-md-4 mb-4">
                        <h5 style={{ fontFamily: 'Georgia, serif', letterSpacing: '1px', fontSize: '1.3rem' }}>🍽️ Ricettario Zampp</h5>
                        <p style={{ fontFamily: 'Segoe UI, sans-serif', lineHeight: '1.6', color: '#e8f5e9' }}>
                            Scopri le migliori ricette per ogni occasione. Unisciti alla nostra community di appassionati di cucina!
                        </p>
                    </div>

                    {/* Sezione Link Rapidi */}
                    <div className="col-md-4 mb-4">
                        <h5 style={{ fontFamily: 'Georgia, serif', letterSpacing: '1px', fontSize: '1.3rem' }}>Link Rapidi</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="/" className="text-white text-decoration-none" style={{ fontFamily: 'Segoe UI, sans-serif', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#c8e6c9'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Home</a></li>
                            <li className="mb-2"><a href="/Login" className="text-white text-decoration-none" style={{ fontFamily: 'Segoe UI, sans-serif', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#c8e6c9'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Login</a></li>
                            <li className="mb-2"><a href="/about" className="text-white text-decoration-none" style={{ fontFamily: 'Segoe UI, sans-serif', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#c8e6c9'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Chi Siamo</a></li>
                            <li className="mb-2"><a href="/contact" className="text-white text-decoration-none" style={{ fontFamily: 'Segoe UI, sans-serif', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#c8e6c9'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Contatti</a></li>
                        </ul>
                    </div>

                    {/* Sezione Contatti */}
                    <div className="col-md-4 mb-4">
                        <h5 style={{ fontFamily: 'Georgia, serif', letterSpacing: '1px', fontSize: '1.3rem' }}>Contatti</h5>
                        <p style={{ fontFamily: 'Segoe UI, sans-serif', color: '#e8f5e9' }}>Email: zampericettario@gmail.com</p>
                        <p style={{ fontFamily: 'Segoe UI, sans-serif', color: '#e8f5e9' }}>Telefono: +39 123 456 7890</p>
                        <div>
                            <a href="https://facebook.com" className="text-white me-3" style={{ fontSize: '1.3rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#c8e6c9'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://instagram.com" className="text-white me-3" style={{ fontSize: '1.3rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#c8e6c9'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://twitter.com" className="text-white" style={{ fontSize: '1.3rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#c8e6c9'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                                <i className="bi bi-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4 pt-3 border-top" style={{ borderColor: '#1b3a0f !important' }}>
                    <small style={{ fontFamily: 'Segoe UI, sans-serif', color: '#c8e6c9' }}>&copy; 2026 Ricettario Zampp. Tutti i diritti riservati.</small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;