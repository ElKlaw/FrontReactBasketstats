import { UpdateScoreDialog } from "component/Score/UpdateScoreDialog"
import { important, percent, px } from "csx"
import { Match } from "model/Match"
import moment from "moment"
import React from "react"
import { Colors } from "style/colors"
import { classes, style } from "typestyle"

const table = style({
  width: percent(100)
})

const headerTable = style({
  backgroundColor: "#9e9e9e",
  color: "#FFF",
  height: px(26),
  textAlign: "left"
})

const cellHeader = style({
  paddingLeft: px(10),
  paddingTop: px(7),
  paddingBottom: px(7),
  fontWeight: 500,
})

const cellHeaderMois = style({
  backgroundColor: "#dadada"
})

const cellBody = style({
  paddingLeft: px(10),
  fontWeight: 500
})

const cellCenter = style({
  textAlign: "center"
})

const moisLigne = style({
  backgroundColor: "#dadada",
  color: "#444"
})

const linkScore = style({
  cursor: "pointer",
  textDecoration: "underline"
})

const textVictoire = style({
    fontWeight: 700
})

const textDefaite = style({
    fontWeight: "normal"
})

const colorVictoire = style({
    color: Colors.victoire,
    fontWeight: important(700)
})

const colorDefaite = style({
    color: Colors.defaite,
    fontWeight: important(700)
})

let initialValuesScore : any = {
  id: undefined
}

interface Props {
  matchs: Map<string, Array<Match>>
  validate: (value: boolean) => void
}

export function TableauMatchFutur({matchs, validate} : Props){
  const [isOpenModalScore, setIsOpenModalScore] = React.useState<boolean>(false);

  const keys = Array.from(matchs.keys())
  return(
    <>
      <table className={table} cellSpacing={0}>
          <thead className={headerTable}>
              <tr>
                  <th className={cellHeader}>Date</th>
                  <th className={cellHeader}>Heure</th>
                  <th className={cellHeader}>Lieu</th>
                  <th className={cellHeader}>Equipe</th>
                  <th className={cellHeader}>Adversaire</th>
              </tr>
          </thead>
          <tbody>
              {keys.length > 0 ?
                  keys.map((mois : any) =>(
                      <React.Fragment key={mois}>
                          <tr>
                              <td colSpan={5} className={classes(cellHeader, cellHeaderMois)}>{mois}</td>
                          </tr>
                          {matchs.get(mois)?.map((match:any) =>(
                              <tr>
                                  <td className={cellBody}>{moment(match.dateMatch).format('DD/MM/YY')}</td>
                                  <td className={cellBody}>{match.heureMatch}</td>
                                  <td className={cellBody}>
                                      {match.domicile ? match.salleMatch?.nom : match.adresseMatch?.ville }
                                  </td>
                                  <td className={cellBody}>{match.equipe.nom}</td>
                                  <td className={cellBody}>{match.adversaire}</td>
                              </tr>
                          ))}
                      </React.Fragment>
                  ))
              :
                  <tr>
                      <td colSpan={5} className={cellHeader}>Aucun match à venir</td>
                  </tr>
              }
          </tbody>
      </table>
      <UpdateScoreDialog
        open={isOpenModalScore}
        setOpen={setIsOpenModalScore}
        initialValue={initialValuesScore}
        validate={validate}
      />
    </>
  )
}

export function TableauMatchPasse({matchs, validate} : Props){
  const [isOpenModalScore, setIsOpenModalScore] = React.useState<boolean>(false);

  const changerScore = (match : Match) => {
    initialValuesScore = match
    setIsOpenModalScore(true)
  }

  const keys = Array.from(matchs.keys())
  return(
    <>
      <table className={table} cellSpacing={0}>
          <thead className={headerTable}>
              <tr>
                  <th className={cellHeader}>Date</th>
                  <th className={cellHeader}>Heure</th>
                  <th className={cellHeader}>Lieu</th>
                  <th className={cellHeader}>Equipe</th>
                  <th className={classes(cellBody, cellCenter)}>Score</th>
                  <th className={cellHeader}>Adversaire</th>
              </tr>
          </thead>
          <tbody>
              {keys.length > 0 ?
                  keys.map((mois : any) =>(
                      <React.Fragment>
                          <tr className={moisLigne} >
                              <td colSpan={6} className={cellHeader}>{mois}</td>
                          </tr>
                          {matchs.get(mois)?.map(match => (
                              <tr>
                                  <td className={cellBody}>{moment(match.dateMatch).format('DD/MM/YY')}</td>
                                  <td className={cellBody}>{match.heureMatch}</td>
                                  <td className={cellBody}>
                                      {match.domicile ? match.salleMatch?.nom : match.adresseMatch?.ville }
                                  </td>
                                  {match.scoreEquipe !== null && match.scoreAdversaire !== null ?
                                      <>
                                          <td className={match.scoreEquipe > match.scoreAdversaire ? classes(cellBody, colorVictoire) : classes(cellBody, colorDefaite) }>{match.equipe.nom}</td>
                                          <td className={classes(cellBody, cellCenter)}>
                                              <span className={match.scoreEquipe > match.scoreAdversaire ? textVictoire : textDefaite }>{match.scoreEquipe}</span>
                                              <span> - </span>
                                              <span className={match.scoreEquipe > match.scoreAdversaire ? textDefaite : textVictoire }>{match.scoreAdversaire}</span>
                                          </td>
                                      </>
                                  :
                                      <>
                                          <td className={cellBody}>{match.equipe.nom}</td>
                                          <td className={classes(cellBody, linkScore, cellCenter)} onClick={() => changerScore(match)}>Ajouter un score</td>
                                      </>
                                  }
                                  <td className={cellBody}>{match.adversaire}</td>
                                  
                              </tr>
                          ))}
                      </React.Fragment>
                  ))
              :
                  <tr>
                      <td colSpan={6} className={cellHeader}>Aucun match à venir</td>
                  </tr>
              }
          </tbody>
      </table>
      <UpdateScoreDialog
        open={isOpenModalScore}
        setOpen={setIsOpenModalScore}
        initialValue={initialValuesScore}
        validate={validate}
      />
    </>
  )
}


