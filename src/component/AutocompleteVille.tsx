import * as React from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import { getVille } from '../api/DataGouvService';
import { CircularProgress } from '@mui/material';
import { classes, style } from 'typestyle';
import { px } from 'csx';
import { useDebouncedEffect } from '../utils/CustomHooks';
import { DataGouvVille } from '../model/DataGouv';
import { TextFieldBase } from './TextField';

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
  helperText?: string | string[]
  error?: boolean
  handleBlur?: (event: any) => void
  multiple: boolean
}

export function AutocompleteVille({value, helperText, error, handleBlur, onChange, multiple} : Props) {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<Array<DataGouvVille>>([]);
  useDebouncedEffect(() => searchVille(), 500, [inputValue])
  
  const searchVille = async () => {
    if(inputValue !== "") {
      const result : Array<DataGouvVille>  = await getVille(inputValue)
      setOptions(result)
      setLoading(false)
    }
  }

  return (
    <Autocomplete
      id="villes"
      getOptionLabel={(option: DataGouvVille) => option.departement ? `${option.nom} (${option.departement.code})` : option.nom}
      options={options}
      filterOptions={(x) => x}
      multiple={multiple}
      fullWidth
      value={value}
      loading={loading}
      size="small"
      onChange={(event, newValue) => {
        setInputValue("")
        setOptions([])
        setLoading(false)
        onChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
        setLoading(newInputValue !== "" ? true : false)
      }}
      onBlur={handleBlur}
      renderInput={(params) => (
        <TextFieldBase 
          {...params} 
          label="Villes" 
          placeholder="Saisir une ville"
          helperText={helperText}
          error={error} 
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      noOptionsText={inputValue !== "" ? "Aucune ville ne correspond à votre recherche" : "Veuillez saisir au moins 1 caractères"}
      renderOption={(props, option) => (
        <li {...props} key={option.code}>
          <Grid container alignItems="center">
            <Grid item>
              <Box
                component={LocationOnIcon}
                sx={{ color: 'text.secondary', mr: 2 }}
              />
            </Grid>
            <Grid item xs>
              <p className={classes(textOption,titleTextOption)}>{option.nom}</p>
              {(option.departement && option.region) &&
                <p className={textOption}>{option.departement.code}, {option.departement.nom}, {option.region.nom}</p>
              }
            </Grid>
          </Grid>
        </li>
      )}
    />
  );
}