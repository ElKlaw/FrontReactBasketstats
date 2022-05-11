import { Autocomplete, Button, Grid} from "@mui/material";
import { isUrlClubExist, modifierClub } from "api/ClubService";
import { fetchSports } from "api/SportService";
import { ButtonBase } from "component/Button";
import { TextFieldBase } from "component/TextField";
import { Formik } from "formik";
import { OptionFormulaire } from "model/Formulaire";
import { Sport } from "model/Sport";
import React from "react";
import { useDebouncedEffect } from "utils/CustomHooks";
import * as Yup from "yup";
import { Club } from "model/Club";
import { Spinner } from "component/Spinner";

// Formulaire
const validation = Yup.object().shape({
    nomcomplet: Yup.string().required("Veuillez renseigner un nom de club."),
    nom: Yup.string().required("Veuillez renseigner un nom.").min(2, "L'acronyme de club doit contenir au moins 2 caractères.").max(10, "L'acronyme de club doit contenir au maximum 10 caractères."),
    url: Yup.string().matches(/^[a-z0-9\-\s]+$/, "Veuillez renseigner une url contenant que des minuscules, chiffres et tirets (-)").required("Veuillez renseigner une url."),
    codeClub: Yup.string().required("Veuillez entrer le code du club."),
    sport: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string()
    }).default(undefined).required("Veuillez renseigner un sport.")
})

let initialValues: {
    codeClub: string
    url: string
    nomcomplet: string
    nom: string
    sport?: OptionFormulaire
} = {
    codeClub: "",
    url: "",
    nomcomplet: "",
    nom: "",
    sport: undefined
}

interface Props {
    club: Club
    validate: (result: boolean) => void
}

export function FormulaireInfosGeneral({club, validate} :Props) {
    const [optionsSports , setOptionsSports] = React.useState<Array<OptionFormulaire>>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [url, setUrl] = React.useState<string>("")
    const [loadingCheckUrl, setLoadingCheckUrl] = React.useState<boolean>(false)
    const [isUrlExist, setIsUrlExist] = React.useState<boolean>(false)
    useDebouncedEffect(() => checkUrlClub(), 500, [url])

    React.useEffect(() => {
        getSports()
    }, [club])

    const getSports = () => {
        fetchSports().then((sports: Array<Sport>) => {
            setOptionsSports(sports.map(el => ({value: el.id, label: el.nom})))
            setIsLoading(false)
        })
    }

    React.useEffect(() => {
        initClub()
    }, [isLoading])

    const initClub = () => {
        initialValues = {
            codeClub: club.codeClub,
            url: club.url,
            nomcomplet: club.nomcomplet,
            nom: club.nom,
            sport: {
                value: club.sport.id,
                label: club.sport.nom
            }
        }
    }

    const checkUrlClub = async () => {
        if(url !== "" && url !== club.url) {
            const res = await isUrlClubExist(url)
            setIsUrlExist(res)
            setLoadingCheckUrl(false)
        } else {
            setIsUrlExist(false)
            setLoadingCheckUrl(false)
        }
    }

    const modifier = (values : any) => {
        const newClub = {
            ...club,
            codeClub: values.codeClub,
            url: values.url,
            nomcomplet: values.nomcomplet,
            nom: values.nom,
            sport: {
                id: values.sport.value
            }
        }
        modifierClub(club.id, newClub).then(res => {
            validate(true)
        }).catch(err => {
            validate(false)
        })
    }
    
    return (
        isLoading ?
            <Spinner /> 
        :
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validation}
                onSubmit={(values, { resetForm }) => {
                    if(!loadingCheckUrl && !isUrlExist) {
                        modifier(values)
                    }
                }}
            >
            {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextFieldBase
                                id="nomcomplet"
                                type="text"
                                size="small"
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
                                size="small"
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
                                size="small"
                                onChange={(event) => {
                                    handleChange(event)
                                    setUrl(event.target.value)
                                    setLoadingCheckUrl(true)
                                }}
                                onBlur={handleBlur}
                                label="Adresse internet du club (URL)"
                                placeholder="Veuillez entrer l'adresse internet du club."
                                value={values.url}
                                variant="outlined"
                                helperText={touched.url ? 
                                    errors.url ? 
                                        errors.url : 
                                        (isUrlExist && !loadingCheckUrl) ? `L'adresse Internet est déjà utilisée veuillez en choisir une nouvelle` : ``
                                : 
                                    ""
                                }
                                error={touched.url && (Boolean(errors.url) || (isUrlExist && !loadingCheckUrl))}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextFieldBase
                                id="codeClub"
                                type="text"
                                size="small"
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
                                        size="small"
                                        helperText={touched.sport ? errors.sport : ""}
                                        error={touched.sport && Boolean(errors.sport)}
                                        fullWidth
                                    />
                                }
                            />
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