import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppartementService from '../services/appartementService';

const PageListeAppartements = () => {
    const [appartements, setAppartements] = useState([]);
    const [batimentId, setBatimentId] = useState("");
    const [ville, setVille] = useState("");
    const [surface, setSurface] = useState("");

    const [newNumero, setNewNumero] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newSurface, setNewSurface] = useState("");
    const [newBatimentId, setNewBatimentId] = useState("");
    const [newNbPieces, setNewNbPieces] = useState("");

    useEffect(() => {
        chargerTousLesAppartements();
    }, []);

    const chargerTousLesAppartements = () => {
        AppartementService.getAllAppartements()
            .then(response => setAppartements(response.data))
            .catch(error => console.error("Erreur de chargement:", error));
    };

    const rechercherAppartements = () => {
        if (!batimentId) return chargerTousLesAppartements();
        AppartementService.getAppartementsParBatiment(batimentId).then(response => setAppartements(response.data));
    };

    const rechercherAppartementsParVille = () => {
        if (!ville) return chargerTousLesAppartements();
        AppartementService.findByVille(ville).then(response => setAppartements(response.data));
    };

    const rechercherAppartementsParSurface = () => {
        if (!surface) return chargerTousLesAppartements();
        AppartementService.findAppartementsBySurfaceGreaterThan(surface).then(response => setAppartements(response.data));
    };

    const createAppartement = () => {
        const newAppartement = {
            numero: parseInt(newNumero),
            description: newDescription,
            surface: parseFloat(newSurface),
            nbPieces: parseInt(newNbPieces),
            batiment: { id: parseInt(newBatimentId) }
        };

        AppartementService.createAppartement(newAppartement)
            .then(response => {
                setAppartements([...appartements, response.data]);
                setNewNumero(""); setNewDescription(""); setNewSurface(""); setNewBatimentId(""); setNewNbPieces("");
                alert("Appartement créé avec succès !");
            })
            .catch(error => alert("Erreur lors de la création."));
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Patrimoine Immobilier</h1>
                <p>Gérez vos actifs avec précision et élégance.</p>
            </header>

            {/* BARRE DE RECHERCHE (BENTO STYLE) */}
            <div className="creation-box search-section">
                <div className="search-group">
                    <input type="number" placeholder="ID Bâtiment" value={batimentId} onChange={(e) => setBatimentId(e.target.value)} />
                    <button onClick={rechercherAppartements}>Chercher</button>
                </div>
                <div className="search-group">
                    <input type="text" placeholder="Ville" value={ville} onChange={(e) => setVille(e.target.value)} />
                    <button onClick={rechercherAppartementsParVille}>Chercher</button>
                </div>
                <div className="search-group">
                    <input type="number" placeholder="Surface min." value={surface} onChange={(e) => setSurface(e.target.value)} />
                    <button onClick={rechercherAppartementsParSurface}>Chercher</button>
                </div>
                <button className="btn-secondary" onClick={chargerTousLesAppartements}>Réinitialiser</button>
            </div>

            {/* ZONE D'AJOUT */}
            <div className="creation-box">
                <h3>Ajouter un Appartement</h3>
                <div className="form-grid">
                    <input type="number" placeholder="Numéro" value={newNumero} onChange={(e) => setNewNumero(e.target.value)} />
                    <input type="text" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    <input type="number" placeholder="Surface (m²)" value={newSurface} onChange={(e) => setNewSurface(e.target.value)} />
                    <input type="number" placeholder="Nb Pièces" value={newNbPieces} onChange={(e) => setNewNbPieces(e.target.value)} />
                    <input type="number" placeholder="ID Bâtiment" value={newBatimentId} onChange={(e) => setNewBatimentId(e.target.value)} />
                    <button onClick={createAppartement}>Sauvegarder</button>
                </div>
            </div>

            {/* GRILLE APPARTEMENTS */}
            {appartements.length > 0 ? (
                <div className="apartment-grid">
                    {appartements.map((app) => (
                        <div key={app.id} className="apartment-card">
                            <div className="card-header">
                                <span className="card-number">App. #{app.numero}</span>
                                <span className="badge badge-pieces">{app.nbPieces} Pièces</span>
                            </div>
                            <p className="card-description">{app.description || "Résidence de prestige AzurImmo."}</p>
                            <div className="card-stats">
                                <span className="badge badge-surface">{app.surface} m²</span>
                            </div>
                            <div className="card-footer">
                                <Link to={`/appartements/${app.id}`} style={{ width: '100%' }}>
                                    <button className="btn-secondary" style={{ width: '100%' }}>Détails du bien</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="creation-box" style={{ textAlign: 'center', padding: '50px' }}>
                    <p className="text-muted">Aucun bien ne correspond à vos critères.</p>
                </div>
            )}
        </div>
    );
};

export default PageListeAppartements;