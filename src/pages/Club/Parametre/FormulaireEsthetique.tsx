import { Button, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar } from "@material-ui/core";
import { ButtonBase } from "component/Button";
import { Formik } from "formik";
import { Club } from "model/Club";
import DeleteIcon from '@material-ui/icons/Delete';
import * as Yup from "yup";
import { modifierClub } from "api/ClubService";
import React from "react";
import { style } from "typestyle";
import { px } from "csx";
import { Photo } from "model/Photo";
import { useDropzone } from "react-dropzone";
import { addPhoto, getPhotoById } from "api/PhotoService";
import { PaletteCouleur } from "component/PaletteCouleur";

// Css
const divDepotFichier = style({
    border: "1px dashed black",
    padding: px(10),
    textAlign: "center"
})

interface Props {
    club: Club
    validate: (result: boolean) => void
}

const validation = Yup.object().shape({
    logo: Yup.number().nullable().default(null),
    fond: Yup.number().nullable().default(null)
})

let initialValues: {
    logo: number | null
    fond: number | null
    couleurprincipale: string
    couleursecondaire: string
} = {
    logo: null,
    fond: null,
    couleurprincipale: "",
    couleursecondaire: ""
}

export function FormulaireEsthetique({club, validate} :Props) {
    const [photoFont , setPhotoFont] = React.useState<Photo | null>(null)
    const [isFontLocal , setIsFontLocal] = React.useState<boolean>(false)
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
            setIsFontLocal(true)
            setPhotoFont(fond)
        }
    }
    
    const [photoLogo , setPhotoLogo] = React.useState<Photo | null>(null)
    const [isLogoLocal , setIsLogoLocal] = React.useState<boolean>(false)
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
            setIsLogoLocal(true)
            setPhotoLogo(logo)
        }
    }

    const addImage = (image: any, ancienneImage: any) => {
        return image === null ? Promise.resolve({id: ancienneImage}) : addPhoto(image)
    }

    const modifier = (values : any) => {
        Promise.all([
            addImage(isLogoLocal && acceptedLogo.length > 0 ? acceptedLogo[0] : null, club.logo),
            addImage(isFontLocal && acceptedFont.length > 0 ? acceptedFont[0] : null, club.fond)
        ]).then(res => {
            const logo = res[0]
            const fond = res[1]
            const newClub = {
                ...club,
                logo: logo !== null ? logo.id : null,
                fond: fond !== null ? fond.id : null,
                couleurprincipale: values.couleurprincipale,
                couleursecondaire: values.couleursecondaire
            }
            modifierClub(club.id, newClub).then(res => {
                validate(true)
                setIsFontLocal(false)
                setIsLogoLocal(false)
            }).catch(err => {
                validate(false)
            })
        })
    }

    React.useEffect(() => {
        initClub()
        loadImage()
    }, [club])

    const loadImage = () => {
        const fond = club.fond
        const logo = club.logo
        if( fond && logo) {
            Promise.all([getPhotoById(fond), getPhotoById(logo) ]).then((res: any) =>{
                setPhotoFont(res[0])
                setPhotoLogo(res[1])
            })
        }
    }

    const initClub = () => {
        initialValues = {
            logo: club.logo,
            fond: club.fond,
            couleurprincipale: club.couleurprincipale,
            couleursecondaire: club.couleursecondaire
        }
    }
    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validation}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
                modifier(values)
            }}
        >
        {({ handleSubmit, setFieldValue, values }) => (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <span>Couleur principale</span>
                            </Grid>
                            <Grid item xs={8}>
                                <PaletteCouleur 
                                    titre="Couleur principale"
                                    couleurSelectionner={values.couleurprincipale}
                                    validate={couleur => setFieldValue("couleurprincipale", couleur)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <span>Couleur secondaire</span>
                            </Grid>
                            <Grid item xs={8}>
                                <PaletteCouleur 
                                    titre="Couleur secondaire"
                                    couleurSelectionner={values.couleursecondaire}
                                    validate={couleur => setFieldValue("couleursecondaire", couleur)}
                                />
                            </Grid>
                        </Grid>
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
                                                src={isFontLocal ? photoFont.data : `data:${photoFont.extension};base64,${photoFont.data}`}
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
                                                src={isLogoLocal? photoLogo.data : `data:${photoLogo.extension};base64,${photoLogo.data}`}
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
                            Modifier
                        </ButtonBase>
                    </Grid>
                </Grid>
            </form>
        )}
        </Formik>
    )
}