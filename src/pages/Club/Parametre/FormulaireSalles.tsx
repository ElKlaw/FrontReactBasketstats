import { Grid } from "@mui/material";
import { ButtonBase } from "component/Button";
import { CardSalle } from "component/Salle/CardSalle";
import { Club } from "model/Club";
import React from "react";
import { trierByNom } from "utils/triee";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Salle } from "model/Salle";
import CustomizedDialogs from "component/Dialog";
import { FormulaireSalle } from "pages/Formulaire/FormulaireSalle";
import { supprimerSalle } from "api/SalleService";
import { Adresse } from "model/Adresse";

interface Props {
    club: Club
    validate: (result: boolean) => void
}

let initialValues : {
    id?: number
    nom: string
    adresse?: Adresse
    clubSalle: {
        id?: number
    }
} = {
    id: undefined,
    nom: "",
    adresse: undefined,
    clubSalle: {
        id: undefined
    }
}

export function FormulaireSalles ({club, validate} :Props) {
    const [isOpenModal , setIsOpenModal] = React.useState<boolean>(false)
    const [isModification , setIsModification] = React.useState<boolean>(false)

    const ajouter = () => {
        initialValues= {
            id: undefined,
            nom: "",
            adresse: undefined,
            clubSalle: {
                id: club.id
            }
        }
        setIsModification(false)
        setIsOpenModal(true)
    }

    const modifier = (salle: Salle) => {
        initialValues= {
            id: salle.id,
            nom: salle.nom,
            adresse: {
                id: salle.adresse.id,
                numRue: salle.adresse.numRue,
                nomRue: salle.adresse.nomRue,
                longitude: salle.adresse.longitude,
                latitude: salle.adresse.latitude,
                codePostal: salle.adresse.codePostal,
                ville: salle.adresse.ville
            },
            clubSalle: {
                id: club.id
            }
        }
        setIsOpenModal(true)
    }

    const supprimer = (salle: Salle) => {
        supprimerSalle(salle.id).then(res => {
            validate(true)
        }).catch(err => {
            validate(false)
        })
    }
    
    return(
        <Grid container spacing={2}>
            <Grid item xs={9} />
            <Grid item xs={3}>
                <ButtonBase
                    fullWidth
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={()=> ajouter()}
                >
                    Ajouter une salle
                </ButtonBase>
            </Grid>
            {club.salles.sort(trierByNom).map(salle => (
                <Grid item xs={4}>
                    <CardSalle
                        salle={salle}
                        modifier={() => modifier(salle)}
                        supprimer={() => supprimer(salle)}
                    />
                </Grid>
            ))}
            <CustomizedDialogs 
                handleClose={()=> setIsOpenModal(false)} 
                isOpen={isOpenModal}
                title={
                    <span>{isModification ? "Modifier une salle" : "Ajouter une salle"}</span>
                }
                content={
                    <FormulaireSalle 
                        initialValues={initialValues}
                        onClose={() => setIsOpenModal(false)}
                        validate={(v) => validate(v)}
                    />
                }
            />
        </Grid>
    )
}