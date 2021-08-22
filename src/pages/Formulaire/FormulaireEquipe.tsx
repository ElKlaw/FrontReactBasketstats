import { Grid, ImageList, ImageListItem, IconButton, ImageListItemBar, Autocomplete } from "@material-ui/core";
import { Formik } from "formik";
import { Club } from "model/Club";
import { Photo } from "model/Photo";
import React from "react";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup"
import DeleteIcon from '@material-ui/icons/Delete';
import { TextFieldBase } from "component/TextField";
import { Button } from "@material-ui/core";
import { ButtonBase } from "component/Button";
import { style } from "typestyle";
import { px } from "csx";
import { OptionFormulaire } from "model/Formulaire";
import { addPhoto } from "api/PhotoService";
import { addEquipe } from "api/EquipeService";

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
    nom: Yup.string().required("Veuillez renseigner un nom d'équipe."),
    sexe: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string()
    }).default(undefined).required("Veuillez renseigner un sexe."),
})

const initialValues = {
    nom: "",
    categorie: "",
    sexe: undefined,
    niveau: "",
    division: "",
    poule: "",
    photo: null
}

export function FormulaireEquipe({club, onClose} : Props) {
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

    const validate = (values : any) => {
        addPhoto(acceptedPhoto.length > 0 ? acceptedPhoto[0] : null).then(photo => {
            const newEquipe = {
                ...values,
                photo: photo !== null ? photo.id : null,
                sexe: values.sexe.label,
                clubEquipe: {
                    id: club.id
                }
            }
            addEquipe(newEquipe).then(res => {
                onClose()
            })
        })
    }

    return(
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
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="nom"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Nom de l'équipe"
                            placeholder="Veuillez entrer un nom d'équipe"
                            value={values.nom}
                            variant="outlined"
                            helperText={touched.nom ? errors.nom : ""}
                            error={touched.nom && Boolean(errors.nom)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldBase
                            id="categorie"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Catégorie de l'équipe"
                            placeholder="Veuillez entrer une catégorie pour l'équipe (exemple: Séniors, U20, ...)"
                            value={values.categorie}
                            variant="outlined"
                            helperText={touched.categorie ? errors.categorie : ""}
                            error={touched.categorie && Boolean(errors.categorie)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                                    label="Sexe de l'équipe"
                                    placeholder="Veuillez entrer le sexe de l'équipe."
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
                        <TextFieldBase
                            id="niveau"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Niveau de l'équipe"
                            placeholder="Veuillez entrer le niveau de l'équipe (exemple: National, Régional, Départemental, ...)"
                            value={values.niveau}
                            variant="outlined"
                            helperText={touched.niveau ? errors.niveau : ""}
                            error={touched.niveau && Boolean(errors.niveau)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="division"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Division de l'équipe"
                            placeholder="Veuillez entrer la division de l'équipe (exemple: 1, 2, ...)"
                            value={values.division}
                            variant="outlined"
                            helperText={touched.division ? errors.division : ""}
                            error={touched.division && Boolean(errors.division)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="poule"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Poule de l'équipe"
                            placeholder="Veuillez entrer la poule de l'équipe (exemple: A, B, ...)"
                            value={values.poule}
                            variant="outlined"
                            helperText={touched.poule ? errors.poule : ""}
                            error={touched.poule && Boolean(errors.poule)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <span>Photo de l'équipe</span>
                            </Grid>
                            <Grid item xs={8}>
                                {photo !== null ?
                                    <ImageList rowHeight={250} cols={1}>
                                        <ImageListItem cols={1}>
                                            <img 
                                                src={photo.data}
                                                style={{maxHeight: 250}}
                                            />
                                            <ImageListItemBar
                                                title={photo.nom}
                                                actionIcon={
                                                    <IconButton
                                                        style={{ color : "white"}}
                                                        onClick={() => setPhoto(null)}
                                                    >
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
    )

}