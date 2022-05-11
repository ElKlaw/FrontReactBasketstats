import { Link } from "@mui/material"
import { style } from "typestyle"


const cssLienDefault = style({
  color: "black",
  fontWeight: 700,
  fontSize: 18
})

interface Props {
  history: any
  label: string
}

export function Lien ({history, label}: Props) {
  return (
    <Link
      component="button"
      onClick={() => {
        history.goBack()
      }}
      underline="none"
      className={cssLienDefault}
    >
      {label}
    </Link>
  )
} 