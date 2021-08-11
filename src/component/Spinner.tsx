import { CircularProgress } from "@material-ui/core";
import { percent, px } from "csx";
import { style } from "typestyle";


const cssDiv = style({
    textAlign: "center",
    marginTop: px(50),
    width: percent(100)
})


export const Spinner = () => (
    <div className={cssDiv}>
        <CircularProgress size={70} />
    </div>
)