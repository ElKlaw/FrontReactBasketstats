import { Autocomplete, Button, Checkbox, Grid, TextField } from "@material-ui/core";
import { Equipe } from "model/Equipe";
import * as Yup from "yup"
import { Formik } from "formik"
import { TextFieldBase } from "component/TextField";
import { Club } from "model/Club";
import { useEffect } from "react";
import React from "react";
import { getEquipesByClubId } from "api/EquipeService";
import { OptionFormulaire } from "model/Formulaire";
import { FormControlLabel } from "@material-ui/core";
import { DatePicker, TimePicker } from "@material-ui/lab";
import { ButtonBase } from "component/Button";

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
    adversaire: "",
    scoreEquipe: null,
    scoreAdversaire: null,
    infosSup: "",
    equipe: undefined
}


interface Props {
    club : Club
    onClose : () => void
}

export function FormulaireMatch({club, onClose} : Props) {
    const [optionsEquipe, setOptionsEquipe] = React.useState<Array<OptionFormulaire>>([]);
    
    const getEquipes = () => {
        getEquipesByClubId(club.id).then((equipes : Array<Equipe>) => {
            setOptionsEquipe(equipes.map(el =>({value: el.id, label: el.nom})))
        })
    }

    useEffect(() => {
        getEquipes()
    },[club]);
    
    const validate = (values : any) => {
        console.log(values)
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
                <Grid container spacing={2} alignItems="center">
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
                                    onChange={(event) => setFieldValue("domicile", event.target.checked)}
                                />
                            } 
                            label="Domicile" 
                        />
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
                                    label={"Heure du match"}
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
                            label={"infosSup"}
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