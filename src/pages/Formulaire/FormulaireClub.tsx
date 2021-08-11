import { Autocomplete, Button, Grid, IconButton, ImageList, ImageListItemBar, Paper } from "@material-ui/core";
import * as Yup from "yup"
import { Formik } from "formik"
import { TextFieldBase } from "component/TextField";
import React from "react";
import { fetchSports } from "api/SportService";
import { OptionFormulaire } from "model/Formulaire";
import { useDropzone } from "react-dropzone";
import { Photo } from "model/Photo";
import { style } from "typestyle";
import { px } from "csx";
import { ImageListItem } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { ButtonBase } from "component/Button";
import { Sport } from "model/Sport";
import { addPhoto } from "api/PhotoService";
import { addClub } from "api/ClubService";

// Css
const divDepotFichier = style({
    border: "1px dashed black",
    padding: px(10),
    textAlign: "center"
})

// Formulaire
const validation = Yup.object().shape({
    nomcomplet: Yup.string().required("Veuillez renseigner un nom de club."),
    nom: Yup.string().required("Veuillez renseigner un nom.").min(2, "L'acronyme de club doit contenir au moins 2 caractères.").max(10, "L'acronyme de club doit contenir au maximum 10 caractères."),
    url: Yup.string().required("Veuillez renseigner une url."),
    codeClub: Yup.string().required("Veuillez entrer le code du club."),
    sport: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string().required("Veuillez renseigner un sport.")
    })
})

const initialValues = {
    codeClub: "",
    url: "",
    nomcomplet: "",
    nom: "",
    sport: undefined,
    fond: null,
    logo: null,
    equipes: [],
    salles: [],
    joueurs: [],
    villes: []
}


interface Props {
    history: any
}

export function FormulaireClub({history} : Props) {
    const [optionsSports , setOptionsSports] = React.useState<Array<OptionFormulaire>>([])
    
    const [photoFont , setPhotoFont] = React.useState<Photo | null>(null)
    const {acceptedFiles: acceptedFont, getRootProps: getRootFont, getInputProps : getInputFont } = useDropzone({
        maxFiles: 1,
        maxSize: 2000000,
        onDrop: (files) => handleFontChange(files),
        accept: "image/*"
    })

    const handleFontChange = (files : any) => {
        const selectFile = files[0]
        const reader = new FileReader()
        reader.readAsDataURL(selectFile)
        reader.onload = () => {
            const fond : Photo = {
                nom: selectFile.name,
                extension: selectFile.type,
                data: reader.result
            }
            setPhotoFont(fond)
        }
    }
    
    const [photoLogo , setPhotoLogo] = React.useState<Photo | null>(null)
    const {acceptedFiles: acceptedLogo, getRootProps: getRootLogo, getInputProps : getInputLogo } = useDropzone({
        maxFiles: 1,
        maxSize: 2000000,
        onDrop: (files) => handleLogoChange(files),
        accept: "image/*"
    })

    const handleLogoChange = (files : any) => {
        const selectFile = files[0]
        const reader = new FileReader()
        reader.readAsDataURL(selectFile)
        reader.onload = () => {
            const logo : Photo = {
                nom: selectFile.name,
                extension: selectFile.type,
                data: reader.result
            }
            setPhotoLogo(logo)
        }
    }



    React.useEffect(() => {
        getSports()
    }, [])

    const getSports = () => {
        fetchSports().then((sports: Array<Sport>) => {
            setOptionsSports(sports.map(el => ({value: el.id, label: el.nom})))
        })
    }

    const addImage = (image: any) => {
        return image === null ? Promise.resolve(null) : addPhoto(image)
    }

    const validate = (values : any) => {
        Promise.all([
            addImage(acceptedLogo.length > 0 ? acceptedLogo[0] : null), 
            addImage(acceptedFont.length > 0 ? acceptedFont[0] : null)
        ]).then(res => {
            const logo = res[0]
            const fond = res[1]
            const newClub = {
                ...values,
                sport: {
                    id: values.sport.value
                },
                fond: fond !== null ? fond.id : null,
                logo: logo !== null ? logo.id : null
            }
            console.log(newClub)
            addClub(newClub).then(res => {
                console.log(res)
                history.push(`/club/${res.url}`)
            })
        })
    }

    return (
        <Grid container justifyContent="center" style={{marginTop : 50, marginBottom: 50}}>
            <Grid item xs={6}>
                <Paper elevation={5} style={{padding: 15}}>
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
                                    <h1>Créer votre club</h1>    
                                </Grid>
                                <Grid item xs={8}>
                                    <TextFieldBase
                                        id="nomcomplet"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Nom du club"
                                        placeholder="Veuillez entrer un nom de club"
                                        value={values.nomcomplet}
                                        variant="outlined"
                                        helperText={touched.nomcomplet ? errors.nomcomplet : ""}
                                        error={touched.nomcomplet && Boolean(errors.nomcomplet)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextFieldBase
                                        id="nom"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Acronyme du club"
                                        placeholder="Veuillez entrer un acronyme de club (ex: PSG)."
                                        value={values.nom}
                                        variant="outlined"
                                        helperText={touched.nom ? errors.nom : ""}
                                        error={touched.nom && Boolean(errors.nom)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldBase
                                        id="url"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Adresse internet du club (URL)"
                                        placeholder="Veuillez entrer l'adresse internet du club."
                                        value={values.url}
                                        variant="outlined"
                                        helperText={touched.url ? errors.url : ""}
                                        error={touched.url && Boolean(errors.url)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextFieldBase
                                        id="codeClub"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Code du club"
                                        placeholder="Veuillez entrer le code du club."
                                        value={values.codeClub}
                                        variant="outlined"
                                        helperText={touched.codeClub ? errors.codeClub : ""}
                                        error={touched.codeClub && Boolean(errors.codeClub)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="sport"
                                        disableClearable
                                        options={optionsSports}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(e, value) => {
                                            setFieldValue("sport", value)
                                        }}
                                        onBlur={handleBlur}
                                        value={values.sport}
                                        renderInput={(params) => 
                                            <TextFieldBase
                                                {...params}
                                                label="Sport du club"
                                                placeholder="Veuillez sélectionner le sport du club."
                                                variant="outlined"
                                                helperText={touched.sport ? errors.sport : ""}
                                                error={touched.sport && Boolean(errors.sport)}
                                                fullWidth
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Image de font du club</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            {photoFont !== null ?
                                                <ImageList rowHeight={250} cols={1}>
                                                    <ImageListItem cols={1}>
                                                        <img 
                                                            src={photoFont.data}
                                                            style={{maxHeight: 250}}
                                                        />
                                                        <ImageListItemBar
                                                            title={photoFont.nom}
                                                            actionIcon={
                                                                <IconButton
                                                                    style={{ color : "white"}}
                                                                    onClick={() => setPhotoFont(null)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            }
                                                        />
                                                    </ImageListItem>
                                                </ImageList>
                                            :
                                                <div className={divDepotFichier} {...getRootFont()}>
                                                    <input {...getInputFont()} />
                                                    <span>
                                                        Déposer l'image ici, ou cliquer pour sélectionner l'image (Taille maximal 2Mo) 
                                                    </span>
                                                </div>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={4}>
                                            <span>Logo du club</span>
                                        </Grid>
                                        <Grid item xs={8}>
                                            {photoLogo !== null ?
                                                <ImageList rowHeight={250} cols={2}>
                                                    <ImageListItem cols={1}>
                                                        <img 
                                                            src={photoLogo.data}
                                                            style={{maxHeight: 250}}
                                                        />
                                                        <ImageListItemBar
                                                            title={photoLogo.nom}
                                                            actionIcon={
                                                                <IconButton
                                                                    style={{ color : "white"}}
                                                                    onClick={() => setPhotoLogo(null)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            }
                                                        />
                                                    </ImageListItem>
                                                </ImageList>
                                            :
                                                <div className={divDepotFichier} {...getRootLogo()}>
                                                    <input {...getInputLogo()} />
                                                    <span>
                                                        Déposer le logo ici, ou cliquer pour sélectionner l'image (Taille maximal 2Mo) 
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
                                        onClick={()=> history.push(`/clubs`)}
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
                </Paper>
            </Grid>
        </Grid>
    )

}