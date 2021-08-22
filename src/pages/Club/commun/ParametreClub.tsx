import { Accordion, AccordionDetails, AccordionSummary, Alert, Grid, Snackbar } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Club } from "model/Club";
import React from "react";
import { FormulaireEsthetique } from "../Parametre/FormulaireEsthetique";
import { FormulaireInfosGeneral } from "../Parametre/FormulaireInfosGeneral";
import { FormulaireVillesClub } from "../Parametre/FormulaireVillesClub";

interface Props {
    club: Club
    refresh: () => void
}

export function ParametreClub({club, refresh}: Props) {
    const [expanded, setExpanded] = React.useState<number | undefined>(undefined);
    const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
    const [erreurSnackbar, setErreurSnackbar] = React.useState<string>("");

    const handleChangeAccordion = (index: number) => {
        setExpanded(index === expanded ? undefined : index );
    };
    
    const handleModification = (res: boolean) => {
        setOpenSnackbar(true)
        setErreurSnackbar(res ? "" : "Oups une erreur est survenue. Veuillez réessayer plus tard.")
        refresh()
    }

    return(
        <Grid container spacing={2} style={{marginTop: 30}}>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{vertical :'bottom', horizontal: 'center'}}>
                {erreurSnackbar !== "" ?
                    <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                        {erreurSnackbar}
                    </Alert>
                :
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                        Votre modification a été pris en compte.
                    </Alert>
                }
            </Snackbar>
            <Grid item xs={12}>
                <Accordion
                    expanded={expanded === 0}
                    onChange={(event: React.SyntheticEvent, expanded: boolean) => handleChangeAccordion(0)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel0a-content"
                        id="panel0a-header"
                    >
                        <span>Informations générales</span>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormulaireInfosGeneral
                            club={club}
                            validate={handleModification}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 1}
                    onChange={(event: React.SyntheticEvent, expanded: boolean) => handleChangeAccordion(1)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <span>Esthétique</span>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormulaireEsthetique
                            club={club}
                            validate={handleModification}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 2}
                    onChange={(event: React.SyntheticEvent, expanded: boolean) => handleChangeAccordion(2)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <span>Villes du club</span>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormulaireVillesClub
                            club={club}
                            validate={handleModification}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expanded === 3}
                    onChange={(event: React.SyntheticEvent, expanded: boolean) => handleChangeAccordion(3)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <span>Salles du club</span>
                    </AccordionSummary>
                    <AccordionDetails>
                        
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}

