import { Button, Grid } from "@mui/material";
import { ButtonBase } from "component/Button";
import { TextFieldBase } from "component/TextField";
import { Formik } from "formik"
import * as Yup from "yup";
import moment from "moment";
import { style } from "typestyle";
import { modifierScoreMatch } from "api/MatchService";

const textEquipe = style({
    fontWeight: 600
})

const infosMatch = style({
    fontWeight: 600,
    fontSize: 18
})

// Formulaire
const validation = Yup.object().shape({
  scoreEquipe: Yup.number().typeError("Veuillez saisir un nombre").required("Veuillez saisir le score de l'équipe."),
  scoreAdversaire: Yup.number().typeError("Veuillez saisir un nombre").required("Veuillez saisir le score de l'équipe adverse.")
})

interface Props {
  initialValues: any
  onClose: () => void
  validate: (value: boolean) => void
}

export function FormulaireScore({initialValues, onClose, validate} :Props) {
  const modifier = (values: any) => {
    modifierScoreMatch(values.id, values).then(res => {
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
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <span className={infosMatch}>Match du {moment(initialValues.dateMatch).format('DD/MM/YYYY')} {initialValues.heureMatch}</span>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6} style={{textAlign: "right"}}>
                            <span className={textEquipe}>{initialValues.equipe.nom}</span>
                        </Grid>
                        <Grid item xs={6}>
                            <TextFieldBase
                                id="scoreEquipe"
                                type="text"
                                size="small"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Score de l'équipe"
                                placeholder="Veuillez saisir le score de l'équipe"
                                value={values.scoreEquipe}
                                variant="outlined"
                                fullWidth
                                helperText={touched.scoreEquipe ? errors.scoreEquipe : ""}
                                error={touched.scoreEquipe && Boolean(errors.scoreEquipe)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <TextFieldBase
                                id="scoreAdversaire"
                                type="text"
                                size="small"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Score de l'équipe adverse"
                                placeholder="Veuillez saisir le score de l'équipe adverse"
                                value={values.scoreAdversaire}
                                variant="outlined"
                                fullWidth
                                helperText={touched.scoreAdversaire ? errors.scoreAdversaire : ""}
                                error={touched.scoreAdversaire && Boolean(errors.scoreAdversaire)}
                            />
                        </Grid>
                        <Grid item xs={6} style={{textAlign: "left"}}>
                            <span className={textEquipe}>{initialValues.adversaire}</span>
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
                      Ajouter
                    </ButtonBase>
                </Grid>
            </Grid>
        </form>
    )}
    </Formik>   
  )
}