if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Returns a JS Promise
const getYelpAPI = async () => {
  return axios.get(
    'https://api.yelp.com/v3/businsses/search?location="2650 NW 5 Ave, Miami, FL 33127"&term="lunch"&radius=300',
    { headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` } }
  );
};

app.get('/api/yelp', async (request, response) => {
  // previously, we had to do this:
  // axios.get(URL).then(axiosResponse => {
  //  // do something
  // }).catch(axiosError => console.error(axiosError));

  try {
    const resp = await getYelpAPI();
    response.json(resp.data.businesses);
  } catch (e) {
    console.error(e);
    response.status(500).send({ error: e.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}...`);
});
