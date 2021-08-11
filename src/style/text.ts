import { px } from "csx";
import { style } from "typestyle";

export const smallTexte = style({
    fontSize: px(11),
    fontWeight: 500,
    margin: px(0)
})

export const mediumTexte = style({
    fontSize: px(14),
    fontWeight: 500,
    margin: px(0)
})

export const largeTexte = style({
    fontSize: px(16),
    fontWeight: 500,
    margin: px(0)
})


export const texteGras = style({
    fontWeight: 800
})

export const texteCenter = style({
    textAlign: "center"
})