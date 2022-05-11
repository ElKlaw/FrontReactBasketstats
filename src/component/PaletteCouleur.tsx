import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { pink, purple, red, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey } from "@mui/material/colors";
import React from "react";
import { ButtonBase } from "./Button";
import CheckIcon from '@mui/icons-material/Check';

interface Props {
    titre: string
    couleurSelectionner: string
    validate : (couleur: string) => void
}

export function PaletteCouleur({titre, couleurSelectionner, validate} :Props) {
    const couleursPrincipale = [red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey]
    const [open, setOpen] = React.useState<boolean>(false)
    const [couleurChoisie, setCouleurChoisie]  = React.useState<string>(couleurSelectionner)
    const couleurs = Array.from(new Set([...couleursPrincipale.flatMap(el => Object.values(el))]))

    return(
        <Grid container>
            <Grid item xs={12}>
                <div
                    style={{ cursor: "pointer", borderRadius: 5, width: 80, height: 30, padding: 2, border : "thick double #bababa"}}
                    onClick={() => setOpen(true)}
                >
                    <div
                        style={{ width: "100%", height: "100%" , backgroundColor: couleurSelectionner !== "" ? couleurSelectionner : "#fff" }}
                    />
                </div>
            </Grid>
            <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth="lg">
                <DialogTitle style={{textAlign: "center"}}>{titre}</DialogTitle>
                <DialogContent>
                    <Grid container>
                        {couleurs.map(couleur => (
                            <Grid item xs={2} key={couleur} style={{height: 45}}>
                                {couleurChoisie === couleur ?
                                    <div
                                        style={{ position: "relative", height: 43, backgroundColor: couleur, border: "2px solid black"}}
                                    >
                                        <CheckIcon style={{color: "black", height: "100%", width : "100%"}}/>
                                    </div>
                                :
                                    <div
                                        style={{ width: "100%", height: "100%", cursor: "pointer" , backgroundColor: couleur}}
                                        onClick={() => setCouleurChoisie(couleur)}
                                    />
                                }
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button 
                                variant="outlined" 
                                color="error"
                                fullWidth
                                onClick={()=> setOpen(false)}
                            >
                                Annuler
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <ButtonBase
                                fullWidth
                                onClick={() => {
                                    setOpen(false)
                                    validate(couleurChoisie)
                                }}
                            >
                                Valider
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}