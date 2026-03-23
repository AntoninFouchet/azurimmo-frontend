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
            .then(response => {
                setAppartements(response.data);
            })
            .catch(error => console.error("Erreur de chargement:", error));
    };

    const rechercherAppartements = () => {
        if (!batimentId) return chargerTousLesAppartements();
        AppartementService.getAppartementsParBatiment(batimentId)
            .then(response => setAppartements(response.data));
    };

    const rechercherAppartementsParVille = () => {
        if (!ville) return chargerTousLesAppartements();
        AppartementService.findByVille(ville)
            .then(response => setAppartements(response.data));
    };

    const rechercherAppartementsParSurface = () => {
        if (!surface) return chargerTousLesAppartements();
        AppartementService.findAppartementsBySurfaceGreaterThan(surface)
            .then(response => setAppartements(response.data));
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

                // On vide les champs
                setNewNumero("");
                setNewDescription("");
                setNewSurface("");
                setNewBatimentId("");
                setNewNbPieces("");
                alert("Appartement créé avec succès !");
            })
            .catch(error => {
                console.error("Erreur de création :", error);
                alert("Erreur lors de la création.");
            });
    };


    return (
        <div>
            <h2>Tous les Appartements</h2>

            <div>
                <div>
                    <input type="number" placeholder="ID Bâtiment" value={batimentId} onChange={(e) => setBatimentId(e.target.value)} />
                    <button onClick={rechercherAppartements}>Chercher</button>
                </div>
                <div>
                    <input type="text" placeholder="Ville" value={ville} onChange={(e) => setVille(e.target.value)} />
                    <button onClick={rechercherAppartementsParVille}>Chercher</button>
                </div>
                <div>
                    <input type="number" placeholder="Surface min." value={surface} onChange={(e) => setSurface(e.target.value)} />
                    <button onClick={rechercherAppartementsParSurface}>Chercher</button>
                </div>
                <button onClick={chargerTousLesAppartements} >Tout afficher</button>
            </div>

            {/*  ZONE D'AJOUT */}
            <div className="creation-box">
                <h3>➕ Créer un Appartement</h3>
                <input type="number" placeholder="Numéro" value={newNumero} onChange={(e) => setNewNumero(e.target.value)} />
                <input type="text" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                <input type="number" placeholder="Surface (m²)" value={newSurface} onChange={(e) => setNewSurface(e.target.value)} />
                <input type="number" placeholder="Nb Pièces" value={newNbPieces} onChange={(e) => setNewNbPieces(e.target.value)} />
                <input type="number" placeholder="ID Bâtiment" value={newBatimentId} onChange={(e) => setNewBatimentId(e.target.value)} />
                <button onClick={createAppartement}>Sauvegarder</button>
            </div>

            {/* TABLEAU */}
            <table>
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Description</th>
                    <th>Surface (m²)</th>
                    <th>Nb Pièces</th>
                    <th>Action</th>
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
                            <td>
                                {/*  LE BOUTON POUR ALLER SUR LA PAGE DÉTAIL */}
                                <Link to={`/appartements/${app.id}`}>
                                    <button>Détails</button>
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>
                            Aucun appartement trouvé.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default PageListeAppartements;