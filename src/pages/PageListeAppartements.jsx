import { useState } from 'react';
import AppartementService from '../services/appartementService';

const PageListeAppartements = () => {
    // Variables d'état
    const [appartements, setAppartements] = useState([]);
    const [batimentId, setBatimentId] = useState("");
    const [ville, setVille] = useState("");
    const [surface, setSurface] = useState("");

    const [newNumero, setNewNumero] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newSurface, setNewSurface] = useState("");
    const [newBatimentId, setNewBatimentId] = useState("");
    const [newNbPieces, setNewNbPieces] = useState("");

    const rechercherAppartements = () => {
        if (!batimentId) return; // Si le champ est vide, on n'affiche rien

        AppartementService.getAppartementsParBatiment(batimentId)
            .then(response => {
                setAppartements(response.data);
            })
    };

    const rechercherAppartementsParVille = () => {
        AppartementService.findByVille(ville)
            .then(response => {
                setAppartements(response.data);
            })
    };

    const rechercherAppartementsParSurface = () => {
        AppartementService.findAppartementsBySurfaceGreaterThan(surface)
            .then(response => {
                setAppartements(response.data);
            })
    };

    // Création d'un nouvel appartement
    const createAppartement = () => {
        const newAppartement = {
            numero: parseInt(newNumero),
            description: newDescription,
            surface: parseFloat(newSurface),
            nbPieces: parseInt(newNbPieces),
            batiment: {
                id: parseInt(newBatimentId)
            }
        };

        AppartementService.createAppartement(newAppartement)
            .then(response => {
                setAppartements([...appartements, response.data]);

                setNewNumero("");
                setNewDescription("");
                setNewSurface("");
                setNewBatimentId("");
                setNewNbPieces("");

                alert("Appartement créé avec succès !");
            })
            .catch(error => {
                console.error("Erreur de création :", error);
                alert("Erreur lors de la création. Vérifiez l'ID du bâtiment.");
            });
    };

    return (
        <div>
            <h2>Gestion des appartements par Bâtiment</h2>

            <div>
                <input
                    type="number"
                    placeholder="Saisir l'ID du bâtiment"
                    value={batimentId}
                    onChange={(e) => setBatimentId(e.target.value)}
                />
                <button onClick={rechercherAppartements}>
                    Rechercher
                </button>
            </div>

            <br />

            <div>
                <input
                    type="text"
                    placeholder="Saisir la ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                />
                <button onClick={rechercherAppartementsParVille}>
                    Rechercher par Ville
                </button>
            </div>

            <br />

            <div>
                <input
                    type="number"
                    placeholder="Saisir la surface minimale"
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                />
                <button onClick={rechercherAppartementsParSurface}>
                    Rechercher par Surface
                </button>
            </div>

            <br />

            {/* Création d'un nouvel appartement avec la classe CSS globale */}
            <div className="creation-box">
                <h3>➕ Créer un Appartement</h3>
                <input
                    type="number"
                    placeholder="Numéro"
                    value={newNumero}
                    onChange={(e) => setNewNumero(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Surface (m²)"
                    value={newSurface}
                    onChange={(e) => setNewSurface(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="ID du Bâtiment"
                    value={newBatimentId}
                    onChange={(e) => setNewBatimentId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Nb Pièces"
                    value={newNbPieces}
                    onChange={(e) => setNewNbPieces(e.target.value)}
                />
                <button onClick={createAppartement}>
                    Sauvegarder
                </button>
            </div>

            {/* Tableau */}
            <table>
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Description</th>
                    <th>Surface (m²)</th>
                    <th>Nb Pièces</th>
                </tr>
                </thead>
                <tbody>
                {appartements.length > 0 ? (
                    appartements.map((app, index) => (
                        <tr key={index}>
                            <td>{app.numero}</td>
                            <td>{app.description}</td>
                            <td>{app.surface}</td>
                            <td>{app.nbPieces}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}>
                            Aucun appartement à afficher pour ce bâtiment.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default PageListeAppartements;