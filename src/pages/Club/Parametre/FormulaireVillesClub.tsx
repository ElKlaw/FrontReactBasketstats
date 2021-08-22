import { Grid } from "@material-ui/core";
import CustomizedDialogs from "component/Dialog";
import { CardVille } from "component/Ville/CardVille";
import { Club } from "model/Club";
import { FormulaireVille } from "pages/Formulaire/FormulaireVille";
import React from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ButtonBase } from "component/Button";
import { Ville } from "model/Ville";
import { AutocompleteVille } from "component/AutocompleteVille";
import { trierByNom } from "utils/triee";
import { ajouterVille, supprimerVille } from "api/VilleService";

interface Props {
    club: Club
    validate: (result: boolean) => void
}

let initialValues : {
    id: number | undefined
    nom: string
    codeDepartement: string
    departement: string
    region: string
    codePostal: string
    pays: string
    clubVille: {
        id: number | undefined
    }
} = {
    id: undefined,
    nom: "",
    codeDepartement: "",
    departement: "",
    region: "",
    codePostal: "",
    pays: "",
    clubVille: {
        id: undefined
    }
}

export function FormulaireVillesClub({club, validate} :Props) {
    const [isModification , setIsModification] = React.useState<boolean>(true)
    const [isOpenModal , setIsOpenModal] = React.useState<boolean>(false)
    const [villeAjouter , setVilleAjouter] = React.useState<any>(null)

    const modifier = (ville : Ville) => {
        initialValues = {
            id: ville.id,
            nom: ville.nom,
            codeDepartement: ville.codeDepartement,
            departement: ville.departement,
            region: ville.region,
            codePostal: ville.codePostal,
            pays: ville.pays,
            clubVille: {
                id: club.id
            }
        }
        setIsModification(true)
        setIsOpenModal(true)
    }

    const supprimer = (ville : Ville) => {
        supprimerVille(ville.id).then(res => {
            validate(true)
        }).catch(err => {
            validate(false)
        })
    }

    const ajouter = () => {
        if(villeAjouter !== null) {
            const ville = {
                nom: villeAjouter.nom,
                codeDepartement: villeAjouter.departement ? villeAjouter.departement.code : "",
                departement: villeAjouter.departement ? villeAjouter.departement.nom : "",
                region: villeAjouter.region ? villeAjouter.region.nom : "",
                codePostal: villeAjouter.codesPostaux[0],
                pays: "France",
                clubVille: {
                    id: club.id
                }
            }
            ajouterVille(ville).then(res => {
                setVilleAjouter(null)
                validate(true)
            }).catch(err => {
                validate(false)
            })
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={9}>
                <AutocompleteVille
                    value={villeAjouter}
                    onChange={(values : any) => setVilleAjouter(values)}
                    multiple={false}
                />
            </Grid>
            <Grid item xs={3}>
                <ButtonBase
                    fullWidth
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={()=> ajouter()}
                >
                    Ajouter la ville
                </ButtonBase>
            </Grid>
            {club.villes.sort(trierByNom).map(ville => (
                <Grid item xs={4}>
                    <CardVille
                        ville={ville}
                        modifier={() => modifier(ville)}
                        supprimer={() => supprimer(ville)}
                    />
                </Grid>
            ))}
            <CustomizedDialogs 
                handleClose={()=> setIsOpenModal(false)} 
                isOpen={isOpenModal}
                title={
                    <span>{isModification ? "Modifier une ville" : "Ajouter une ville"}</span>
                }
                content={
                    <FormulaireVille 
                        initialValues={initialValues}
                        onClose={() => setIsOpenModal(false)}
                        validate={(v) => validate(v)}
                    />
                }
            />
        </Grid>
    )
}