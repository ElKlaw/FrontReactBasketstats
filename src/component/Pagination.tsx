import { Grid } from "@mui/material";
import { Pagination } from '@mui/material';
import React from "react";

interface Props {
    nbrePage : number
    page : number
    handleChangePage : (event : any, newPage: number) => void
}
export function PaginationBase({nbrePage, page, handleChangePage}: Props) {
    return (
        <Grid container justifyContent="center">
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