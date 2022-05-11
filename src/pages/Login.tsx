import { Grid, Paper, TextField, Typography } from "@mui/material";
import { px } from "csx";
import { Form, Formik } from "formik";
import React from "react";
import { style } from "typestyle";
import * as Yup from "yup";
import { ButtonBase } from "../component/Button";

const paperClass = style({
    padding: px(20),
    marginBottom: px(25)
})

interface formLogin {
    login: string,
    motdepasse: string
}

const validationSchema = Yup.object().shape({
    login: Yup.string().email("Saisir un email valide.").required("Veuillez saisir un email."),
    motdepasse: Yup.string().required("Veuillez saisir un mot de passe."),
})

const initialValues : formLogin = {
    login: "",
    motdepasse: ""
}

interface Props {}

interface States {}

export class Login extends React.Component<Props, States> {

    render() {
        return (
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper elevation={2} className={paperClass}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values: formLogin) => {
                                // same shape as initial values
                                console.log(values);
                            }}
                        >
                            {({values, errors, touched, handleBlur, handleChange }) => (
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} style={{textAlign:"center"}}>
                                            <Typography variant="h6">
                                                Connectez-vous
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField 
                                                id="login" 
                                                label="Adresse email" 
                                                variant="outlined" 
                                                fullWidth
                                                value={values.login}
                                                error={touched.login && errors.login !==""}
                                                helperText={touched.login && errors.login !=="" ? errors.login : ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField 
                                                id="motdepasse" 
                                                label="Mot de passe" 
                                                variant="outlined" 
                                                fullWidth
                                                value={values.motdepasse}
                                                error={touched.motdepasse && errors.motdepasse !==""}
                                                helperText={touched.motdepasse && errors.motdepasse !=="" ? errors.motdepasse : ""}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ButtonBase variant="contained" type="submit" fullWidth>Se connecter</ButtonBase>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                    <Paper elevation={2} className={paperClass}>
                        <span>Vous n'avez pas de compte ? <a href="/inscription">S'inscrire</a></span>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}