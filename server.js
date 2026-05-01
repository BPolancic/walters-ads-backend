const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const TOKEN = 'EAANPqHn6MHgBRb8EmaOOoG71bfStVLGiHsjYcZAqmDjCEJWpmi2ERdX7MmXOFqx1JtUYy7F0BPhtRG7xROPYqgZAV6tZA9qAy75JUiX2AHLzn6Sq2NKd7muLZCi507LMU7pQQYOUFuEY1fyJYPKBgZCSa1hcvQCsUm6ZAeZABSYKBHttTlrggiZANDGwpL8AfvnQ';
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
