import { AppBar } from "@mui/material";
import { blueGrey, teal } from "@mui/material/colors";
import { border, important, px } from "csx";
import React from "react";
import { NavLink } from 'react-router-dom'
import { style } from "typestyle";

interface Props {
    history: any
}

const activeNavLink = style({
    display: "block",
    color: important(teal[400]),
    borderBottom: important(border({color: teal[400], style: "solid",width: px(3)})),
    margin: 0,
    cursor: "default",
    textDecoration: "none",
    padding: px(5)
})

const navLink = style({
    display: "block",
    margin: 0,
    textDecoration: "none",
    padding: px(5),
    color: blueGrey[400],
    borderBottom: border({color: "transparent", style: "solid",width: px(3)}),
    $nest: {
        '&:hover': {
            color: important(teal[400]),
            borderBottom: important(border({color: teal[400], style: "solid",width: px(3)})),
            cursor: "pointer"   
        }
    }
})

const menu = style({
    fontWeight: 700,
    textTransform: "uppercase",
    display: "flex",
    flexWrap: "wrap",
    margin: 0,
    listStyle: "none"
})

const menuItem = style({
    flexBasis: 0,
    flexGrow: 1,
    textAlign: "center"
})

export function CustomMenu({history} : Props) {
    return (
        <AppBar position="static" color="default">
            <ul className={menu}>
                <li className={menuItem}>
                    <NavLink exact to="/" className={navLink} activeClassName={activeNavLink}>Accueil</NavLink>
                </li>
                <li className={menuItem}>
                    <NavLink exact to="/clubs" className={navLink} activeClassName={activeNavLink}>Clubs</NavLink>
                </li>
                <li className={menuItem}>
                    <NavLink to="/faq" className={navLink} activeClassName={activeNavLink}>Faq</NavLink>
                </li>
                <li className={menuItem}>
                    <NavLink to="/fonctionnalites" className={navLink} activeClassName={activeNavLink}>Fonctionnalités</NavLink>
                </li>
            </ul>
        </AppBar>
    )
}