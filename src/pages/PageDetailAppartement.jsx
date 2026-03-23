import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppartementService from '../services/appartementService';

const PageDetailAppartement = () => {
    const { id } = useParams();

    const [appartement, setAppartement] = useState(null);

    useEffect(() => {
        AppartementService.getAppartementById(id)
            .then(response => {
                setAppartement(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération :", error);
            });
    }, [id]);

    if (!appartement) {
        return <div>⏳ Chargement des informations de l'appartement...</div>;
    }

    return (
        <div>
            <h2>Fiche de l'Appartement</h2>

            <div className="creation-box">
                <h3>Appartement n°{appartement.numero}</h3>
                <hr />

                <p><strong>Description :</strong> {appartement.description}</p>
                <p><strong>Surface :</strong> {appartement.surface} m²</p>
                <p><strong>Nombre de pièces :</strong> {appartement.nbPieces}</p>
                <p className="text-muted"><strong>Identifiant base de données :</strong> {appartement.id}</p>
            </div>

            <Link to="/appartements">
                <button className="btn-secondary">Retour à la liste</button>
            </Link>
        </div>
    );
};

export default PageDetailAppartement;