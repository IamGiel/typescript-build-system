import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for all routes

app.use(express.json());
// Define a route to act as a proxy for the Matchory API
app.post('/matchory', async (req, res) => {
  console.log('req : ', req.body);

  let data = JSON.stringify({
    conditions: [
      {
        type: req.body.type,
        keywords: req.body.terms,
        required: true,
      },
    ],
    filters: [],
    aggregations: ['classifications', 'countries', 'customers', 'continents'],
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://discovery.matchory.com/v0/queries',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${req.body.access_token}`, // Assuming the access token is in the request body
    },
    data: data,
  };

  try {
    // Make a request to the Matchory API
    axios
      .request(config)
      .then((response) => {
        // console.log('================ IM HERE LOGGING RESPONSE.DATA BELOW ================');
        // console.log(JSON.stringify(response.data));
        res.json(response.data); // Return the data from Matchory API back to the client
      })
      .catch((error) => {
        console.log(error);
        res
          .status(error.response?.status || 500)
          .json({ error: 'Failed to fetch data from Matchory API' });
      });
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ error: 'Failed to fetch data from Matchory API' });
  }
});

app.post(`/matchory/list-queries`, async (req, res) => {
  console.log('req.body here: ', req.body);
  // Parse the JSON string to obtain the access token and data
  console.log('access_token:', req.body.tok);

  const id = req.body.id;
  console.log('id:', id);

  // Extract other body parameters from the req.body
  const { page, perPage } = req.body;
  console.log('page:', page);
  console.log('perPage:', perPage);

  // Form your axios request based on the received body parameters and access_token
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://discovery.matchory.com/v0/queries/${id}/results?page=${page}&per_page=${perPage}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${req.body.tok.access_token}`,
    },
  };

  console.log(config);

  try {
    // Make a request to the Matchory API
    axios
      .request(config)
      .then((response) => {
        // console.log('================ IM HERE LOGGING RESPONSE.DATA BELOW ================');
        // console.log(JSON.stringify(response.data));
        res.json(response.data); // Return the data from Matchory API back to the client
      })
      .catch((error) => {
        console.log(error);
        res
          .status(error.response?.status || 500)
          .json({ error: 'Failed to fetch data from Matchory API' });
      });
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ error: 'Failed to fetch data from Matchory API' });
  }
});

// Start the server and listen on a specific port (e.g., 3001)
const port = 3002;
app.listen(port, () => {
  console.log(`Proxy server listening on http://localhost:${port}`);
});
