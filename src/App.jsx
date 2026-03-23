import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PageListeAppartements from './pages/PageListeAppartements.jsx';
import PageDetailAppartement from './pages/PageDetailAppartement.jsx';
import PageAccueil from './pages/PageAccueil.jsx';

function App() {
    return (
        <BrowserRouter>
            <div>
                <nav>
                    <Link to="/">Accueil</Link>
                    <Link to="/appartements">Appartements</Link>
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
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;