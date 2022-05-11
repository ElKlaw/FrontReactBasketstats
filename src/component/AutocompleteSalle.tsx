import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import { classes, style } from 'typestyle';
import { px } from 'csx';
import { TextFieldBase } from './TextField';
import { Salle } from 'model/Salle';
import { getSalleByClubId } from 'api/SalleService';
import { Club } from 'model/Club';
import React, { useCallback, useEffect, useState } from 'react';

const titleTextOption = style({
  fontWeight : 700
})

const textOption = style({
  margin: px(0),
  fontSize: px(12)
})

interface Props {
  value: any
  onChange: (values : any) => void
  helperText?: any
  error?: boolean
  handleBlur?: (event: any) => void
  club: Club
  label: string
  placeholder: string
}

export function AutocompleteSalle({label, placeholder, club, value, helperText, error, handleBlur, onChange} : Props) {
  const [loading, setLoading] = useState<boolean>(true)
  const [options, setOptions] = useState<Array<Salle>>([]);
  
  const getSalles = useCallback(() => {
    getSalleByClubId(club.id).then(res => {
      setOptions(res)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    getSalles()
  },[getSalles]);

  return (
    <Autocomplete
      id="salle"
      getOptionLabel={(option: Salle) => option.nom}
      options={options}
      filterOptions={(x) => x}
      fullWidth
      value={value}
      loading={loading}
      disableClearable
      size="small"
      onChange={(event, newValue) => {
        setOptions([])
        onChange(newValue);
      }}
      onBlur={handleBlur}
      renderInput={(params) => (
        <TextFieldBase 
          {...params} 
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={error} 
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          <Grid container alignItems="center">
            <Grid item>
              <Box
                component={LocationOnIcon}
                sx={{ color: 'text.secondary', mr: 2 }}
              />
            </Grid>
            <Grid item xs>
              <p className={classes(textOption,titleTextOption)}>{option.nom}</p>
              <p className={textOption}>{option.adresse.ville} ({option.adresse.codePostal})</p>
            </Grid>
          </Grid>
        </li>
      )}
    />
  );
}