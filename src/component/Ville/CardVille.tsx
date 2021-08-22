import { Button, Card, CardActions, CardContent, Grid} from "@material-ui/core";
import { ButtonBase } from "component/Button";
import { Ville } from "model/Ville";
import { largeTexte, mediumTexte } from "style/text";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
    ville: Ville
    modifier: () => void
    supprimer: () => void
}

export function CardVille({ville, modifier, supprimer} : Props) {

    return (
        <Card variant="outlined">
            <CardContent style={{position: "relative", paddingBottom: 0}}>
                <p className={largeTexte}>{ville.nom} ({ville.codePostal})</p>
                <p className={mediumTexte}>{ville.departement} ({ville.codeDepartement})</p>
                <p className={mediumTexte}>{ville.region}</p>
                <p className={mediumTexte}>{ville.pays}</p>
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