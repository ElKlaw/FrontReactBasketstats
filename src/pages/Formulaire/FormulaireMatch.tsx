import { Grid } from "@material-ui/core";
import { Equipe } from "model/Equipe";
import * as Yup from "yup"
import { Formik } from "formik"
import { TextFieldBase } from "component/TextField";

const validation = Yup.object().shape({
    dateMatch: Yup.string().required("Veuillez renseigner un nom."),
    domicile: Yup.boolean(),
    heureMatch: Yup.string().required("Veuillez renseigner un nom."),
    heureRDV: Yup.string().required("Veuillez renseigner un nom."),
    adversaire: Yup.string().required("Veuillez renseigner un nom."),
    scoreEquipe: Yup.number(),
    scoreAdversaire: Yup.number(),
    infosSup: Yup.string().required("Veuillez renseigner un nom."),
    equipe: Yup.string().required("Veuillez renseigner un nom.")
})

const initialValues = {
    dateMatch: "2017-05-24",
    domicile: "",
    heureMatch: "",
    heureRDV: "",
    adversaire: "",
    scoreEquipe: "",
    scoreAdversaire: "",
    infosSup: "",
    equipe: ""
}


interface Props {
    equipes : Array<Equipe>
}

export function FormulaireMatch({} : Props) {

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
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="dateMatch"
                            type="date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={"dateMatch"}
                            value={values.dateMatch}
                            variant="outlined"
                            helperText={touched.dateMatch ? errors.dateMatch : ""}
                            error={touched.dateMatch && Boolean(errors.dateMatch)}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="domicile"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={"domicile"}
                            value={values.domicile}
                            variant="outlined"
                            helperText={touched.domicile ? errors.domicile : ""}
                            error={touched.domicile && Boolean(errors.domicile)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="heureMatch"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={"heureMatch"}
                            value={values.heureMatch}
                            variant="outlined"
                            helperText={touched.heureMatch ? errors.heureMatch : ""}
                            error={touched.heureMatch && Boolean(errors.heureMatch)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="heureRDV"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={"heureRDV"}
                            value={values.heureRDV}
                            variant="outlined"
                            helperText={touched.heureRDV ? errors.heureRDV : ""}
                            error={touched.heureRDV && Boolean(errors.heureRDV)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="adversaire"
                            type="text"
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
                        <TextFieldBase
                            id="scoreEquipe"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={"scoreEquipe"}
                            value={values.scoreEquipe}
                            variant="outlined"
                            helperText={touched.scoreEquipe ? errors.scoreEquipe : ""}
                            error={touched.scoreEquipe && Boolean(errors.scoreEquipe)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="scoreAdversaire"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={"scoreAdversaire"}
                            value={values.scoreAdversaire}
                            variant="outlined"
                            helperText={touched.scoreAdversaire ? errors.scoreAdversaire : ""}
                            error={touched.scoreAdversaire && Boolean(errors.scoreAdversaire)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="infosSup"
                            type="text"
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
                    <Grid item xs={12}>
                        <TextFieldBase
                            id="equipe"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label={"equipe"}
                            value={values.equipe}
                            variant="outlined"
                            helperText={touched.equipe ? errors.equipe : ""}
                            error={touched.equipe && Boolean(errors.equipe)}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </form>
        )}
        </Formik>
    )
}