const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const TOKEN = EAANPqHn6MHgBRZA0oHZApj9nwB7z4ZAnaK8qu7uHZAWPBops6VgDZB6DgaxMN2ILXIbx0h0GzBKSp4YsYskwTOJYf8FaB5Xw0EDkH5QGQMQZAEZCMOzZCpNcFS6VVEjZCLubRnqB175KxrULntxDrXqiWsZBeOmMrMW3ICRApqo3jMgiiBr8bXATPesehtINXdbMDM
const AD_ACCOUNT = 'act_812951570871410';

app.get('/insights', async (req, res) => {
  try {
    const preset = req.query.preset || 'yesterday';
    const fields = 'spend,impressions,reach,clicks,ctr,cpc,frequency,actions,cost_per_action_type,ad_id,ad_name';
    const url = `https://graph.facebook.com/v19.0/${AD_ACCOUNT}/insights?level=ad&date_preset=${preset}&fields=${fields}&limit=50&access_token=${TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
