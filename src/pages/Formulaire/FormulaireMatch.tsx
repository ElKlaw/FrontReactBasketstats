import { Autocomplete, Button, Checkbox, Grid, TextField } from "@mui/material";
import { Equipe } from "model/Equipe";
import * as Yup from "yup"
import { Formik } from "formik"
import { TextFieldBase } from "component/TextField";
import { Club } from "model/Club";
import { useCallback, useEffect } from "react";
import React from "react";
import { getEquipesByClubId } from "api/EquipeService";
import { OptionFormulaire } from "model/Formulaire";
import { FormControlLabel } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/lab";
import { ButtonBase } from "component/Button";
import { AutocompleteSalle } from "component/AutocompleteSalle";
import { AutocompleteAdresse } from "component/AutocompleteAdresse";
import { addMatch } from "api/MatchService";
import moment from "moment";
import { ajouterAdresse } from "api/AdresseService";

const validation = Yup.object().shape({
    dateMatch: Yup.object().shape({
        label: Yup.string()
    }).default(null).typeError("Veuillez renseigner une date de match."),
    domicile: Yup.boolean(),
    heureRDV: Yup.object().shape({
        label: Yup.string()
    }).default(null).typeError("Veuillez renseigner une heure de rendez-vous."),
    heureMatch: Yup.object().shape({
        label: Yup.string()
    }).default(null).typeError("Veuillez renseigner une heure de match."),
    adversaire: Yup.string().required("Veuillez renseigner un adversaire."),
    scoreEquipe: Yup.number().nullable(),
    scoreAdversaire: Yup.number().nullable(),
    infosSup: Yup.string(),
    equipe: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string()
    }).default(undefined).required("Veuillez renseigner une équipe.")
})

const initialValues = {
    dateMatch: null,
    domicile: true,
    heureMatch: null,
    heureRDV: null,
    lieuRdv: null,
    lieuMatch: null,
    adversaire: "",
    scoreEquipe: null,
    scoreAdversaire: null,
    infosSup: "",
    equipe: undefined
}


interface Props {
    club : Club
    onClose : () => void
    validate: (value: boolean) => void
}

export function FormulaireMatch({club, onClose, validate} : Props) {
    const [optionsEquipe, setOptionsEquipe] = React.useState<Array<OptionFormulaire>>([]);
    
    const getEquipes = useCallback(() => {
        getEquipesByClubId(club.id).then((equipes : Array<Equipe>) => {
            setOptionsEquipe(equipes.map(el =>({value: el.id, label: el.nom})))
        })
    }, [club])

    useEffect(() => {
        getEquipes()
    },[getEquipes]);
    
    const ajouterMatch = (values : any) => {
        if(values.domicile) {
            const matchs : any = {
                dateMatch: values.dateMatch,
                domicile: values.domicile,
                heureMatch: moment(values.heureMatch).format('HH:mm'),
                heureRDV: moment(values.heureRDV).format('HH:mm'),
                adversaire: values.adversaire,
                scoreEquipe: null,
                scoreAdversaire: null,
                infosSup: values.infosSup,
                equipe: {
                    id: values.equipe.value
                },
                adresseRdv: null,
                salleMatch: {
                   id: values.lieuMatch.id
                },
                adresseMatch: null
            }
            addMatch(matchs).then(res => {
                validate(true)
                onClose()
            }).catch(err => {
                validate(false)
            })
        } else {
            const promisesAdresse = []
            promisesAdresse.push(values.lieuRdv !== null ? ajouterAdresse(values.lieuRdv) : Promise.resolve(null))
            promisesAdresse.push(values.lieuMatch !== null ? ajouterAdresse(values.lieuMatch) : Promise.resolve(null))
            Promise.all(promisesAdresse).then(res => {
                const matchs : any = {
                    dateMatch: values.dateMatch,
                    domicile: values.domicile,
                    heureMatch: moment(values.heureMatch).format('HH:mm'),
                    heureRDV: moment(values.heureRDV).format('HH:mm'),
                    adversaire: values.adversaire,
                    scoreEquipe: null,
                    scoreAdversaire: null,
                    infosSup: values.infosSup,
                    equipe: {
                        id: values.equipe.value
                    },
                    adresseRdv: res[0] !== null ? res[0].id : null,
                    salleMatch: null, 
                    adresseMatch: res[1] !== null ? res[1].id :null
                }
                addMatch(matchs).then(res => {
                    validate(true)
                    onClose()
                }).catch(err => {
                    validate(false)
                })
            }).catch(err => {
                validate(false)
            })
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={(values, { resetForm }) => {
                ajouterMatch(values)
            }}
        >
        {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="self-start">
                    <Grid item xs={5}>
                        <Autocomplete
                            id="equipe"
                            disableClearable
                            options={optionsEquipe}
                            getOptionLabel={(option) => option.label}
                            onChange={(e, value) => {
                                setFieldValue("equipe", value)
                            }}
                            onBlur={handleBlur}
                            value={values.equipe}
                            renderInput={(params) => 
                                <TextFieldBase
                                    {...params}
                                    label="Équipe"
                                    placeholder="Veuillez sélectionner l'équipe."
                                    variant="outlined"
                                    size="small"
                                    helperText={touched.equipe ? errors.equipe : ""}
                                    error={touched.equipe && Boolean(errors.equipe)}
                                    fullWidth
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={2} style={{textAlign: "center"}}>
                        <span>CONTRE</span>
                    </Grid>
                    <Grid item xs={5}>
                        <TextFieldBase
                            id="adversaire"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={"adversaire"}
                            value={values.adversaire}
                            variant="outlined"
                            helperText={touched.adversaire ? errors.adversaire : ""}
                            error={touched.adversaire && Boolean(errors.adversaire)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    defaultChecked 
                                    checked={values.domicile}
                                    onChange={(event) => {
                                        setFieldValue("lieu", null)
                                        setFieldValue("domicile", event.target.checked)
                                    }}
                                />
                            } 
                            label="Domicile" 
                        />
                    </Grid>
                    {!values.domicile &&
                        <Grid item xs={12}>
                            <AutocompleteAdresse
                                value={values.lieuRdv}
                                onChange={(values : any) => {
                                    setFieldValue("lieuRdv", values)
                                }}
                                helperText={touched.lieuRdv ? errors.lieuRdv : ""}
                                error={touched.lieuRdv && Boolean(errors.lieuRdv)}
                                label="Lieu de rendez-vous"
                                placeholder="Saisir une adresse"
                            />
                        </Grid>
                    }
                    <Grid item xs={12}>
                        {values.domicile ?
                            <AutocompleteSalle
                                club={club}
                                value={values.lieuMatch}
                                onChange={(values : any) => {
                                    setFieldValue("lieuMatch", values)
                                }}
                                label="Lieu de match"
                                placeholder="Saisir une salle"
                                helperText={touched.lieuMatch ? errors.lieuMatch : ""}
                                error={touched.lieuMatch && Boolean(errors.lieuMatch)}
                            />
                        :
                            <AutocompleteAdresse
                                value={values.lieuMatch}
                                onChange={(values : any) => {
                                    setFieldValue("lieuMatch", values)
                                }}
                                helperText={touched.lieuMatch ? errors.lieuMatch : ""}
                                error={touched.lieuMatch && Boolean(errors.lieuMatch)}
                                label="Lieu de match"
                                placeholder="Saisir une adresse"
                            />
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <DatePicker
                            label="Date du match"
                            value={values.dateMatch}
                            onChange={(newValue) => setFieldValue("dateMatch", newValue)}
                            renderInput={(params) => 
                                <TextField 
                                    {...params} 
                                    id="dateMatch"
                                    onBlur={handleBlur}
                                    variant="outlined"
                                    size="small"
                                    helperText={touched.dateMatch ? errors.dateMatch : ""}
                                    error={touched.dateMatch && Boolean(errors.dateMatch)}
                                    fullWidth
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TimePicker
                            value={values.heureRDV}
                            onChange={(newValue) => setFieldValue("heureRDV", newValue)}
                            renderInput={(params) => 
                                <TextField 
                                    id="heureRDV"
                                    {...params} 
                                    onBlur={handleBlur}
                                    label={"Heure de rendez-vous"}
                                    variant="outlined"
                                    size="small"
                                    helperText={touched.heureRDV ? errors.heureRDV : ""}
                                    error={touched.heureRDV && Boolean(errors.heureRDV)}
                                    fullWidth
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TimePicker
                            value={values.heureMatch}
                            onChange={(newValue) => setFieldValue("heureMatch", newValue)}
                            renderInput={(params) => 
                                <TextField 
                                    id="heureMatch"
                                    {...params} 
                                    onBlur={handleBlur}
                                    label={"Heure du match"}
                                    variant="outlined"
                                    size="small"
                                    helperText={touched.heureMatch ? errors.heureMatch : ""}
                                    error={touched.heureMatch && Boolean(errors.heureMatch)}
                                    fullWidth
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="infosSup"
                            type="text"
                            multiline
                            rows={4}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={"Informations supplémentaires"}
                            value={values.infosSup}
                            variant="outlined"
                            helperText={touched.infosSup ? errors.infosSup : ""}
                            error={touched.infosSup && Boolean(errors.infosSup)}
                            fullWidth
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
    )
}