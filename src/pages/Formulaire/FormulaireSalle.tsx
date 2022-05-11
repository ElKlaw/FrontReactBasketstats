import { Button, Grid } from "@mui/material";
import { ajouterSalle, modifierSalle } from "api/SalleService";
import { AutocompleteAdresse } from "component/AutocompleteAdresse";
import { ButtonBase } from "component/Button";
import { TextFieldBase } from "component/TextField";
import { Formik } from "formik";
import * as Yup from "yup";

// Formulaire
const validation = Yup.object().shape({
    nom: Yup.string().required("Veuillez saisir un nom."),
    adresse: Yup.object().shape({
        numRue: Yup.number(),
        nomRue: Yup.string(),
        longitude: Yup.string(),
        latitude: Yup.string(),
        ville: Yup.string(),
        codePostal: Yup.string()
    }).default(undefined).required("Veuillez renseigner une adresse.")
})

interface Props {
    initialValues: any
    onClose: () => void
    validate: (value: boolean) => void
}

export function FormulaireSalle({initialValues, onClose, validate} :Props) {

    const modifier = (values: any) => {
        const salle = {
            nom: values.nom,
            adresse: values.adresse,
            clubSalle: values.clubSalle
        }
        if(values.id) {
            modifierSalle(values.id, salle).then(res => {
                validate(true)
                onClose()
            }).catch(err => {
                validate(false)
            })
        } else {
            ajouterSalle(salle).then(res => {
                validate(true)
                onClose()
            }).catch(err => {
                validate(false)
            })
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validation}
            onSubmit={(values, { resetForm }) => {
                modifier(values)
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
                            label="Nom de la salle"
                            placeholder="Veuillez entrer le nom de la salle"
                            value={values.nom}
                            variant="outlined"
                            fullWidth
                            helperText={touched.nom ? errors.nom : ""}
                            error={touched.nom && Boolean(errors.nom)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteAdresse
                            value={values.adresse}
                            onChange={(values : any) => {
                                setFieldValue("adresse", values)
                            }}
                            helperText={touched.adresse ? errors.adresse : ""}
                            error={touched.adresse && Boolean(errors.adresse)}
                            label="Adresse"
                            placeholder="Saisir une adresse"
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
                            {values.id ? "Modifier" : "Ajouter"}
                        </ButtonBase>
                    </Grid>
                </Grid>
            </form>
        )}
        </Formik>   
    )
}