import { Grid, Input, InputLabel, Paper, TextField, Typography } from "@material-ui/core";
import { px } from "csx";
import { Form, Formik } from "formik";
import React from "react";
import { style } from "typestyle";
import * as Yup from "yup";
import { ButtonBase } from "../../component/Button";

interface Props {}

interface States {}

const paperClass = style({
    padding: px(20),
    marginBottom: px(25)
})

const validationSchema = Yup.object().shape({
    nomClub: Yup.string().required("Veuillez entrer un nom de club."),
    acronyme: Yup.string().required("Veuillez entrer un acronyme de club."),
    url: Yup.string().required("Veuillez entrer l'adresse internet du club."),
    code: Yup.string().required("Veuillez entrer le code du club."),
    sport: Yup.string().required("Veuillez choisir un sport pour votre club.")
})

const initialValues = {
    nomClub: "",
    acronyme: "",
    url: "",
    code: "",
    sport: ""
}


export class CreerClub extends React.Component<Props, States> {

    render () {
        return (
            <Grid container justify="center" style={{marginTop: 15}}>
                <Grid item xs={6}>
                    <Paper elevation={4} className={paperClass}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values: any) => {
                                // same shape as initial values
                                console.log(values);
                            }}
                        >
                            {({values, errors, touched, handleBlur, handleChange }) => (
                                <Form>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} style={{textAlign:"center"}}>
                                            <Typography variant="h6">
                                                Créer votre club
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField 
                                                id="nomClub" 
                                                label="Nom du club *" 
                                                variant="outlined" 
                                                fullWidth
                                                value={values.nomClub}
                                                error={touched.nomClub && errors.nomClub !==""}
                                                helperText={touched.nomClub && errors.nomClub !=="" ? errors.nomClub : ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField 
                                                id="acronyme" 
                                                label="Acronyme du club *" 
                                                variant="outlined" 
                                                fullWidth
                                                value={values.acronyme}
                                                error={touched.acronyme && errors.acronyme !==""}
                                                helperText={touched.acronyme && errors.acronyme !=="" ? errors.acronyme : ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField 
                                                id="url" 
                                                label="Adresse internet du club (URL) *" 
                                                variant="outlined" 
                                                fullWidth
                                                value={values.url}
                                                error={touched.url && errors.url !==""}
                                                helperText={touched.url && errors.url !=="" ? errors.url : ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField 
                                                id="code" 
                                                label="Code du club *" 
                                                variant="outlined" 
                                                fullWidth
                                                value={values.code}
                                                error={touched.code && errors.code !==""}
                                                helperText={touched.code && errors.code !=="" ? errors.code : ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputLabel htmlFor="input-logo">Logo du club</InputLabel>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Input id="input-logo" type="file" inputProps={{'accept': 'image/*'}} style={{width: "100%"}}/>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <InputLabel htmlFor="input-fond">Image de fond du club</InputLabel>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Input id="input-fond" type="file" inputProps={{'accept': 'image/*'}} style={{width: "100%"}}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ButtonBase 
                                                variant="contained" 
                                                type="submit" 
                                                fullWidth
                                            >
                                                Créer un club
                                            </ButtonBase>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}