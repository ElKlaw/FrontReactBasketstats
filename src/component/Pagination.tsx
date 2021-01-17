import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";

interface Props {
    nbrePage : number
    page : number
    handleChangePage : (event : any, newPage: number) => void
}
export function PaginationBase({nbrePage, page, handleChangePage}: Props) {
    return (
        <Grid container justify="center">
            <Grid item>
                <Pagination 
                    size="small" 
                    count={nbrePage} 
                    showFirstButton 
                    showLastButton 
                    page={page} 
                    onChange={handleChangePage}
                />
            </Grid>
        </Grid>
    )
}