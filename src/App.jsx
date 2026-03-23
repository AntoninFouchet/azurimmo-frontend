import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PageListeAppartements from './pages/PageListeAppartements.jsx';
import PageAccueil from './pages/PageAccueil.jsx';

function App() {
    return (
        <BrowserRouter>
            <div>
                {/* BARRE DE NAVIGATION */}
                <nav>
                    <Link to="/">Accueil</Link>
                    <Link to="/appartements">Appartements</Link>
                </nav>

                {/* EN-TÊTE GLOBAL */}
                <div>
                    <h1 style={{ color: '#2c3e50' }}>Gestion AzurImmo</h1>
                    <hr />
                </div>

                {/* ZONE DYNAMIQUE (Change selon l'URL) */}
                <div>
                    <Routes>
                        <Route path="/" element={<PageAccueil />} />
                        <Route path="/appartements" element={<PageListeAppartements />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;