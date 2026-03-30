import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import batimentService from '../services/batimentService';
import AppartementService from '../services/appartementService';

const PageDetailBatiment = () => {
    const { id } = useParams();

    const [batiment, setBatiment] = useState(null);
    const [appartements, setAppartements] = useState([]);

    useEffect(() => {
        batimentService.getBatimentById(id)
            .then(response => setBatiment(response.data))
            .catch(error => console.error("Erreur de chargement du bâtiment:", error));

        AppartementService.getAppartementsParBatiment(id)
            .then(response => setAppartements(response.data))
            .catch(error => console.error("Erreur de chargement des appartements:", error));
    }, [id]);

    if (!batiment) {
        return (
            <div className="page-container">
                <div className="creation-box" style={{ textAlign: 'center' }}>
                    <p className="text-muted">⏳ Chargement des informations du bâtiment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Détails du Bâtiment #{batiment.id}</h1>
                <p>{batiment.adresse}, {batiment.ville}</p>
            </header>

            {/* ENCART D'INFORMATIONS DU BÂTIMENT */}
            <div className="creation-box">
                <h3>Informations Générales</h3>
                <hr />
                <p><strong>Adresse complète :</strong> {batiment.adresse}</p>
                <p><strong>Ville :</strong> <span className="badge badge-surface">{batiment.ville}</span></p>
                <p className="text-muted" style={{ marginTop: '10px' }}><strong>ID Base de données :</strong> {batiment.id}</p>
            </div>

            {/* LISTE DES APPARTEMENTS DANS LE BÂTIMENT */}
            <div style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>
                <h3>Appartements dans ce bâtiment ({appartements.length})</h3>
            </div>

            {appartements.length > 0 ? (
                <div className="apartment-grid">
                    {appartements.map((app) => (
                        <div key={app.id} className="apartment-card">
                            <div className="card-header">
                                <span className="card-number">App. #{app.numero}</span>
                                <span className="badge badge-pieces">{app.nbPieces} Pièces</span>
                            </div>

                            <p className="card-description">
                                {app.description || "Aucune description fournie pour ce bien."}
                            </p>

                            <div className="card-stats">
                                <span className="badge badge-surface">{app.surface} m²</span>
                            </div>

                            <div className="card-footer">
                                <Link to={`/appartements/${app.id}`} style={{ width: '100%' }}>
                                    <button className="btn-secondary" style={{ width: '100%' }}>Voir l'appartement</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="creation-box" style={{ textAlign: 'center', padding: '50px' }}>
                    <p className="text-muted">Aucun appartement n'est encore rattaché à ce bâtiment.</p>
                </div>
            )}

            {/* BOUTON RETOUR */}
            <div style={{ marginTop: '3rem' }}>
                <Link to="/batiments">
                    <button className="btn-secondary">⬅ Retour à la liste des bâtiments</button>
                </Link>
            </div>
        </div>
    );
};

export default PageDetailBatiment;