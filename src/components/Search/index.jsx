import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { Autocomplete, Grid, Box, TextField, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import parse from 'autosuggest-highlight/parse';
import { useEffect, useState } from 'react';

const Search = ({ onChangeInputs, register, errors }) => {
  const [options, setOptions] = useState([]);

  const {
    value,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 400,
    requestOptions: {
      location: { lat: () => 50.446506, lng: () => 30.534732 },
      radius: 100,
    },
  });

  const onGetLocation = (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      getGeocode({ address })
        .then((res) => getLatLng(res[0]))
        .then(({ lat, lng }) => {
          onChangeInputs('location', {
            latitude: lat.toString(),
            longitude: lng.toString(),
          });
        });
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  };

  useEffect(() => {
    setOptions(data);
  }, [data]);

  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      isOptionEqualToValue={(optionEq, valueEq) =>
        optionEq.description === valueEq
      }
      onChange={(e, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        newValue && onGetLocation(newValue.description);
      }}
      onInputChange={(e, newInputValue) => {
        setValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          error={Boolean(errors.autocomplete?.message)}
          helperText={errors.autocomplete?.message}
          {...register('autocomplete', {
            required: "Поле обов'язкове",
          })}
          {...params}
          label="Адреса"
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        try {
          const matches =
            option.structured_formatting?.main_text_matched_substrings;

          const parts = parse(
            option.structured_formatting.main_text,
            matches?.map((match) => [
              match.offset,
              match.offset + match.length,
            ]),
          );

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    component={LocationOnIcon}
                    sx={{ color: 'text.secondary', mr: 2 }}
                  />
                </Grid>
                <Grid item xs>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}

                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        } catch (error) {
          console.log(error);
          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box
                    component={LocationOnIcon}
                    sx={{ color: 'text.secondary', mr: 2 }}
                  />
                </Grid>
                <Grid item xs>
                  <span>{option.structured_formatting.main_text}</span>

                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }
      }}
    />
  );
};

export default Search;
