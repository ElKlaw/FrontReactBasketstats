import { Box, Grid, Paper } from "@mui/material";
import { SmallTab, SmallTabs } from "component/Tabs";
import { Match } from "model/Match";
import React from "react";
import { mediumTexte, texteCenter } from "style/text";
import { BlockMatchPasseTab, BlockFuturMatchTab } from "./BlockMatch";

interface PropsTab {
    matchs: Array<Match>
    value: number
    index: number
}

function TabPanelMatchPasse({value, index, matchs} : PropsTab) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{padding : 10}}
      >
        {value === index && (
            <Grid container spacing={1}>
                {matchs.length >0 ?
                    matchs.map((match: Match) => (
                        <Grid item xs={12}>
                            <BlockMatchPasseTab match={match} />
                        </Grid>
                    ))
                :
                    <Grid item xs={12} className={texteCenter}>
                        <span className={mediumTexte}>Aucun matchs</span>
                    </Grid>
                }
            </Grid>
        )}
      </div>
    );
}

function TabPanelMatchFutur({value, index, matchs} : PropsTab) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{padding : 10}}
      >
        {value === index && (
            <Grid container spacing={1}>
                {matchs.length >0 ?
                    matchs.map((match: Match) => (
                        <Grid item xs={12} key={match.id}>
                            <BlockFuturMatchTab match={match} />
                        </Grid>
                    ))
                :
                    <Grid item xs={12} className={texteCenter}>
                        <span className={mediumTexte}>Aucun match à venir</span>
                    </Grid>
                }
            </Grid>
        )}
      </div>
    );
}



function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
interface Props {
    matchsPasse: Array<Match>
    matchsFutur: Array<Match>
}

export function BlockMatchs({matchsPasse, matchsFutur} : Props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };
    
    return (
        <Paper elevation={3}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <SmallTabs
                    value={value}
                    onChange={handleChange}
                >
                    <SmallTab label="Prochains Matchs" {...a11yProps(0)} />
                    <SmallTab label="Derniers Matchs" {...a11yProps(1)} />
                </SmallTabs>
            </Box>
            <TabPanelMatchFutur value={value} index={0} matchs={matchsFutur}/>
            <TabPanelMatchPasse value={value} index={1} matchs={matchsPasse}/>
        </Paper>
    )
}