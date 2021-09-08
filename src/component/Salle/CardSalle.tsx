import { Button, Card, CardActions, CardContent, Grid} from "@material-ui/core";
import { ButtonBase } from "component/Button";
import { largeTexte, mediumTexte } from "style/text";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Salle } from "model/Salle";

interface Props {
    salle: Salle
    modifier: () => void
    supprimer: () => void
}

export function CardSalle({salle, modifier, supprimer} : Props) {

    return (
        <Card variant="outlined">
            <CardContent style={{position: "relative", paddingBottom: 0}}>
                <p className={largeTexte}>{salle.nom}</p>
                <p className={mediumTexte}>{salle.adresse.numRue} {salle.adresse.nomRue} - {salle.adresse.ville} ({salle.adresse.codePostal})</p>
            </CardContent>
            <CardActions>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Button 
                            fullWidth
                            variant="outlined" 
                            startIcon={<DeleteIcon />}
                            onClick={() => supprimer()}
                            color="error"
                        >
                            Supprimer
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonBase
                            fullWidth
                            startIcon={<EditIcon />}
                            onClick={() => modifier()}
                        >
                            Modifier
                        </ButtonBase>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}