import * as React from 'react';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/core/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import { getAdresse } from '../api/DataGouvService';
import { CircularProgress } from '@material-ui/core';
import { classes, style } from 'typestyle';
import { px } from 'csx';
import { useDebouncedEffect } from '../utils/CustomHooks';
import { DataGouvAdresse } from '../model/DataGouv';
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
  helperText?: any
  error?: boolean
  handleBlur?: (event: any) => void
}

export function AutocompleteAdresse({value, helperText, error, handleBlur, onChange} : Props) {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<Array<DataGouvAdresse>>([]);
  useDebouncedEffect(() => searchAdresse(), 500, [inputValue])
  
  const searchAdresse = async () => {
    if(inputValue !== "") {
      const result : Array<DataGouvAdresse>  = await getAdresse(inputValue)
      setOptions(result)
      setLoading(false)
    }
  }

  return (
    <Autocomplete
      id="adresse"
      getOptionLabel={(option: DataGouvAdresse) => option.properties.label}
      options={options}
      filterOptions={(x) => x}
      fullWidth
      value={value}
      loading={loading}
      disableClearable
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
          label="Adresse" 
          placeholder="Saisir une adresse"
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
      noOptionsText={inputValue !== "" ? "Aucune adresse ne correspond à votre recherche" : "Veuillez saisir au moins 1 caractères"}
      renderOption={(props, option) => (
        <li {...props} key={option.properties.id}>
          <Grid container alignItems="center">
            <Grid item>
              <Box
                component={LocationOnIcon}
                sx={{ color: 'text.secondary', mr: 2 }}
              />
            </Grid>
            <Grid item xs>
              <p className={classes(textOption,titleTextOption)}>{option.properties.name}</p>
              <p className={textOption}>{option.properties.city} ({option.properties.postcode})</p>
            </Grid>
          </Grid>
        </li>
      )}
    />
  );
}