import { Button, Grid } from "@mui/material";
import { modifierVille } from "api/VilleService";
import { ButtonBase } from "component/Button";
import { TextFieldBase } from "component/TextField";
import { Formik } from "formik";
import * as Yup from "yup";

// Formulaire
const validation = Yup.object().shape({
    nom: Yup.string().required("Veuillez saisir un nom."),
    codeDepartement: Yup.string().required("Veuillez saisir un code département."),
    departement: Yup.string().required("Veuillez saisir un departement."),
    region: Yup.string().required("Veuillez saisir une région."),
    codePostal: Yup.string().required("Veuillez saisir un code postal."),
    pays: Yup.string().required("Veuillez saisir un pays.")
})

interface Props {
    initialValues: any
    onClose: () => void
    validate: (value: boolean) => void
}

export function FormulaireVille({initialValues, onClose, validate} :Props) {

    const modifier = (values: any) => {
        modifierVille(values.id, values).then(res => {
            validate(true)
            onClose()
        }).catch(err => {
            validate(false)
        })
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
                            label="Nom de la ville"
                            placeholder="Veuillez entrer le nom de la ville"
                            value={values.nom}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="codeDepartement"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Numéro de département"
                            placeholder="Veuillez entrer le numéro de département de la ville"
                            value={values.codeDepartement}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="departement"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Nom du département"
                            placeholder="Veuillez entrer le nom du département"
                            value={values.departement}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="region"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Nom de la région"
                            placeholder="Veuillez entrer le nom de la région"
                            value={values.region}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="codePostal"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Code postal de la ville"
                            placeholder="Veuillez entrer le nom de la ville"
                            value={values.codePostal}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="pays"
                            type="text"
                            size="small"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Pays de la ville"
                            placeholder="Veuillez le nom du pays"
                            value={values.pays}
                            variant="outlined"
                            fullWidth
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