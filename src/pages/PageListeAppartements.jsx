import { useState } from 'react';
import AppartementService from '../services/appartementService';

const PageListeAppartements = () => {
    // Variables d'état
    const [appartements, setAppartements] = useState([]);
    const [batimentId, setBatimentId] = useState("");
    const [ville , setVille] = useState("");
    const [surface , setSurface] = useState("");

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
    // Création d'un nouvel appartement fonctionnant avec les champs de saisie
    const createAppartement = () => {
        // On fabrique l'objet juste au moment du clic
        const newAppartement = {
            numero: parseInt(newNumero),
            description: newDescription,
            surface: parseFloat(newSurface),
            nbPieces: parseInt(newNbPieces), // <-- Ajout du nombre de pièces ici
            batiment: {
                id: parseInt(newBatimentId)
            }
        };

        // 2. On l'envoie via Axios
        AppartementService.createAppartement(newAppartement)
            .then(response => {
                // On ajoute le nouveau à la liste existante
                setAppartements([...appartements, response.data]);

                // On vide les champs du formulaire après succès
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

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="number"
                    placeholder="Saisir l'ID du bâtiment"
                    value={batimentId}
                    onChange={(e) => setBatimentId(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <button onClick={rechercherAppartements} style={{ padding: '5px 10px' }}>
                    Rechercher
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Saisir la ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <button onClick={rechercherAppartementsParVille} style={{ padding: '5px 10px' }}>
                    Rechercher par Ville
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="number"
                    placeholder="Saisir la surface minimale"
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <button onClick={rechercherAppartementsParSurface} style={{ padding: '5px 10px' }}>
                    Rechercher par Surface
                </button>
            </div>


            {/* Création d'un nouvel appartement */}
            <div style={{ marginBottom: '20px', padding: '10px', border: '2px solid #4CAF50' }}>
                <h3>➕ Créer un Appartement</h3>
                <input
                    type="number"
                    placeholder="Numéro"
                    value={newNumero}
                    onChange={(e) => setNewNumero(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Surface (m²)"
                    value={newSurface}
                    onChange={(e) => setNewSurface(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="ID du Bâtiment"
                    value={newBatimentId}
                    onChange={(e) => setNewBatimentId(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Nb Pièces"
                    value={newNbPieces}
                    onChange={(e) => setNewNbPieces(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                />
                <button onClick={createAppartement} style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Sauvegarder
                </button>
            </div>

            {/* Tableau */}
            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Description</th>
                    <th>Surface (m²)</th>
                </tr>
                </thead>
                <tbody>
                {appartements.length > 0 ? (
                    appartements.map((app, index) => (
                        <tr key={index}>
                            <td>{app.numero}</td>
                            <td>{app.description}</td>
                            <td>{app.surface}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" style={{ textAlign: 'center' }}>
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