import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import batimentService from "../services/batimentService.js";

const PageListeBatiments = () => {
    const [batiments, setBatiments] = useState([]);

    const [batimentId, setBatimentId] = useState("");

    const [newAdresse, setNewAdresse] = useState("");
    const [newVille, setNewVille] = useState("");

    useEffect(() => {
        chargerTousLesBatiments();
    }, []);

    const chargerTousLesBatiments = () => {
        batimentService.getAllBatiments()
            .then(response => setBatiments(response.data))
            .catch(error => console.error("Erreur de chargement:", error));
    };

    const rechercherBatiment = () => {
        if (!batimentId) return chargerTousLesBatiments();

        batimentService.getBatimentById(batimentId)
            .then(response => {
                // Si on trouve le bâtiment, on le met dans un tableau pour l'affichage
                setBatiments([response.data]);
            })
            .catch(error => {
                console.error("Bâtiment introuvable :", error);
                setBatiments([]); // On vide la liste si rien n'est trouvé
            });
    };

    const createBatiment = () => {
        const newBatiment = {
            adresse: newAdresse,
            ville: newVille
        };

        // Attention à la minuscule ici aussi !
        batimentService.createBatiment(newBatiment)
            .then(response => {
                // On met à jour la liste avec le nouveau bâtiment
                setBatiments([...batiments, response.data]);

                // On vide le formulaire
                setNewAdresse("");
                setNewVille("");
                alert("Bâtiment créé avec succès !");
            })
            .catch(error => alert("Erreur lors de la création."));
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Patrimoine Immobilier</h1>
                <p>Gérez vos bâtiments et résidences.</p>
            </header>

            {/* BARRE DE RECHERCHE */}
            <div className="creation-box search-section">
                <div className="search-group">
                    <input type="number" placeholder="ID Bâtiment" value={batimentId} onChange={(e) => setBatimentId(e.target.value)} />
                    <button onClick={rechercherBatiment}>Chercher</button>
                </div>
                <button className="btn-secondary" onClick={chargerTousLesBatiments}>Tout afficher</button>
            </div>

            {/* ZONE D'AJOUT POUR BATIMENT */}
            <div className="creation-box">
                <h3>Ajouter un Bâtiment</h3>
                <div className="form-grid">
                    <input type="text" placeholder="Adresse" value={newAdresse} onChange={(e) => setNewAdresse(e.target.value)} />
                    <input type="text" placeholder="Ville" value={newVille} onChange={(e) => setNewVille(e.target.value)} />
                    <button onClick={createBatiment}>Sauvegarder</button>
                </div>
            </div>

            {/* GRILLE DES BATIMENTS */}
            {batiments.length > 0 ? (
                <div className="apartment-grid">
                    {batiments.map((batiment) => (
                        <div key={batiment.id} className="apartment-card">
                            <div className="card-header">
                                <span className="card-number">Bâtiment #{batiment.id}</span>
                                <span className="badge badge-surface">{batiment.ville}</span>
                            </div>

                            <p className="card-description">
                                {batiment.adresse}
                            </p>

                            <div className="card-footer">
                                <Link to={`/batiments/${batiment.id}`} style={{ width: '100%' }}>
                                    <button className="btn-secondary" style={{ width: '100%' }}>Détails du Bâtiment</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="creation-box" style={{ textAlign: 'center', padding: '50px' }}>
                    <p className="text-muted">Aucun bâtiment ne correspond à vos critères.</p>
                </div>
            )}
        </div>
    );
};

export default PageListeBatiments;