import { Match } from "model/Match"
import moment from "moment"

export function isDomicileVictoire(match: Match) {
    let isVictoire = false
    const {scoreAdversaire, scoreEquipe} = match
    if (scoreAdversaire !== null && scoreEquipe !== null) {
        if(match.domicile) {
            isVictoire = scoreEquipe > scoreAdversaire
        } else {
            isVictoire = scoreAdversaire > scoreEquipe
        }
    }
    return isVictoire
}

export function isScoreSaisie(match: Match) {
    const {scoreAdversaire, scoreEquipe} = match
    return scoreAdversaire !== null && scoreEquipe !== null ? true : false
}

export function groupMatchsByMonth(matchs : Array<Match>){
    let listMatchByMonth = new Map();
    matchs.map((match : Match) =>{
        const monthMatch = moment(match.dateMatch,'YYYY-MM-DD').format('MMMM');
        if(listMatchByMonth.get(monthMatch)){
            let eventsOfMonth = listMatchByMonth.get(monthMatch);
            eventsOfMonth.push(match);
            listMatchByMonth.set(monthMatch,eventsOfMonth)
        } else {
            let eventsOfMonth = [];
            eventsOfMonth.push(match);
            listMatchByMonth.set(monthMatch,eventsOfMonth);
        }
    })
    return listMatchByMonth;
  }


