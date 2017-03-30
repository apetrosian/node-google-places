# node-google-places
Integration with Google Places API Web Service

TBD


```javascript

const GooglePlaces = require('node-google-places');


GooglePlaces.nearby({
    location: '50.060708, 19.937660',
    radius: 200,
    type: 'restaurant'
  })
  .then((data) => {
    // ...
  })
  .catch((err) => {
    // ...
  });

```
