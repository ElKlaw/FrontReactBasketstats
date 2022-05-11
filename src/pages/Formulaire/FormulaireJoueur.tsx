import { Grid, ImageList, ImageListItem, IconButton, ImageListItemBar, Autocomplete } from "@mui/material";
import { Formik } from "formik";
import { Club } from "model/Club";
import { Photo } from "model/Photo";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup"
import DeleteIcon from '@mui/icons-material/Delete';
import { TextFieldBase } from "component/TextField";
import { Button } from "@mui/material";
import { ButtonBase } from "component/Button";
import { style } from "typestyle";
import { px } from "csx";
import { OptionFormulaire } from "model/Formulaire";
import { addPhoto } from "api/PhotoService";
import { addJoueur } from "api/JoueurService";
import { Equipe } from "model/Equipe";
import { getEquipesByClubId } from "api/EquipeService";

interface Props {
    club: Club
    onClose: () => void
}

// Css
const divDepotFichier = style({
    border: "1px dashed black",
    padding: px(10),
    textAlign: "center"
})

// Formulaire
const validation = Yup.object().shape({
    nom: Yup.string().required("Veuillez renseigner un nom."),
    prenom: Yup.string().required("Veuillez renseigner un prénom."),
    sexe: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string()
    }).default(undefined).required("Veuillez renseigner un sexe."),
})

const initialValues = {
    nom: "",
    prenom: "",
    sexe: undefined,
    photo: null,
    equipes: []
}

export function FormulaireJoueur({club, onClose} : Props) {
  const [equipes, setEquipes] = React.useState<Array<Equipe>>([]);
    const [optionsSexe] = React.useState<Array<OptionFormulaire>>([
        {value: 1, label: "Masculin"},
        {value: 2, label: "Féminin"}
    ])

    const [photo , setPhoto] = React.useState<Photo | null>(null)
    const {acceptedFiles: acceptedPhoto, getRootProps: getRootPhoto, getInputProps : getInputPhoto } = useDropzone({
        maxFiles: 1,
        maxSize: 2000000,
        onDrop: (files) => handlePhotoChange(files),
        accept: "image/*"
    })

    const handlePhotoChange = (files : any) => {
        const selectFile = files[0]
        const reader = new FileReader()
        reader.readAsDataURL(selectFile)
        reader.onload = () => {
            const fond : Photo = {
                nom: selectFile.name,
                extension: selectFile.type,
                data: reader.result
            }
            setPhoto(fond)
        }
    }

    const getEquipes = useCallback(() => {
        getEquipesByClubId(club.id).then(equipes => {
            setEquipes(equipes)
        })
    },[club])

    useEffect(() => {
      getEquipes()
    },[getEquipes]);


    const validate = async (values : any) => {
      let newJoueur = {
        ...values,
        photo: null,
        sexe: values.sexe.label,
        equipes: values.equipes,
        clubs: [
          {id: club.id}
        ]
      }
      if(acceptedPhoto.length > 0) {
        const photo = await addPhoto(acceptedPhoto[0])
        newJoueur = {
          ...newJoueur, 
          photo
        }
      }
      addJoueur(newJoueur).then(res => {
          onClose()
      })
    }

    

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={(values, { resetForm }) => {
                validate(values)
            }}
        >
        {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <TextFieldBase
                            id="prenom"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Prénom *"
                            placeholder="Veuillez entrer un prénom"
                            value={values.prenom}
                            variant="outlined"
                            helperText={touched.prenom ? errors.prenom : ""}
                            error={touched.prenom && Boolean(errors.prenom)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextFieldBase
                            id="nom"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Nom *"
                            placeholder="Veuillez entrer un nom"
                            value={values.nom}
                            variant="outlined"
                            helperText={touched.nom ? errors.nom : ""}
                            error={touched.nom && Boolean(errors.nom)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Autocomplete
                            id="sexe"
                            disableClearable
                            options={optionsSexe}
                            getOptionLabel={(option) => option.label}
                            onChange={(e, value) => {
                                setFieldValue("sexe", value)
                            }}
                            onBlur={handleBlur}
                            value={values.sexe}
                            renderInput={(params) => 
                                <TextFieldBase
                                    {...params}
                                    label="Sexe *"
                                    placeholder="Veuillez entrer le sexe."
                                    variant="outlined"
                                    size="small"
                                    helperText={touched.sexe ? errors.sexe : ""}
                                    error={touched.sexe && Boolean(errors.sexe)}
                                    fullWidth
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <span>Photo du joueur</span>
                            </Grid>
                            <Grid item xs={8}>
                                {photo !== null ?
                                    <ImageList rowHeight={250} cols={1}>
                                        <ImageListItem cols={1}>
                                            <img 
                                                alt=""
                                                src={photo.data}
                                                style={{maxHeight: 250}}
                                            />
                                            <ImageListItemBar
                                                title={photo.nom}
                                                actionIcon={
                                                    <IconButton style={{ color : "white"}} onClick={() => setPhoto(null)} size="large">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    </ImageList>
                                :
                                    <div className={divDepotFichier} {...getRootPhoto()}>
                                        <input {...getInputPhoto()} />
                                        <span>
                                            Déposer la photo ici, ou cliquer pour sélectionner la photo (Taille maximal 2Mo) 
                                        </span>
                                    </div>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="equipes"
                            multiple
                            options={equipes}
                            getOptionLabel={(option) => option.nom}
                            onChange={(e, value) => {
                                setFieldValue("equipes", value)
                            }}
                            onBlur={handleBlur}
                            value={values.equipes}
                            renderInput={(params) => 
                                <TextFieldBase
                                    {...params}
                                    label="Équipes"
                                    placeholder="Veuillez les équipes du joueur"
                                    variant="outlined"
                                    size="small"
                                    helperText={touched.equipes ? errors.equipes : ""}
                                    error={touched.equipes && Boolean(errors.equipes)}
                                    fullWidth
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                            variant="outlined" 
                            color="error"
                            onClick={()=> onClose()}
                            fullWidth
                        >
                            Annuler
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonBase
                            fullWidth
                            type="submit"
                        >
                            Créer
                        </ButtonBase>
                    </Grid>
                </Grid>
            </form>
        )}
        </Formik>
    );

}