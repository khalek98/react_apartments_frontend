import { Form, ListGroup } from 'react-bootstrap';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

const Search = ({ setFormLocation }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 50.446506, lng: () => 30.534732 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setFormLocation({ latitude: lat.toString(), longitude: lng.toString() });
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  };

  return (
    <div className="search">
      <Form.Group className="mb-3">
        <Form.Label>Адреса</Form.Label>
        <Form.Control
          required
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ListGroup>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ListGroup.Item
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelect(description)}
                key={place_id}
              >
                {description}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Form.Group>
    </div>
  );
};

export default Search;
