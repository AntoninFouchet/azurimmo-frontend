import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PageListeAppartements from './pages/PageListeAppartements.jsx';
import PageDetailAppartement from './pages/PageDetailAppartement.jsx';
import PageListeBatiments from './pages/PageListeBatiments.jsx';
import PageAccueil from './pages/PageAccueil.jsx';
import PageDetailBatiment from './pages/PageDetailBatiment.jsx';

function App() {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <Link to="/">Accueil</Link>
                    <Link to="/appartements">Appartements</Link>
                    <Link to="/batiments">Bâtiments</Link>
                </nav>

                <div>
                    <h1>Gestion Azurimmo</h1>
                    <hr />
                </div>

                <div>
                    <Routes>
                        <Route path="/" element={<PageAccueil />} />

                        <Route path="/appartements" element={<PageListeAppartements />} />
                        <Route path="/appartements/:id" element={<PageDetailAppartement />} />
                        <Route path="/batiments" element={<PageListeBatiments />} />
                        <Route path="/batiments/:id" element={<PageDetailBatiment />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;