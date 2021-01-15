const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const request = require('request');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const {
    body: { client_id, client_secret },
  } = req;

  if (client_id && client_secret) {
    const authOptions = {
      url: `https://accounts.spotify.com/api/token`,
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      form: {
        grant_type: "client_credentials",
      },
      json: true,
    };

    request.post(authOptions, (err, httpResponse, body) => {
      if (err) {
        return resp.status(400).json({
          error: true,
          mensaje: "No se pudo obtener el token",
          err,
        });
      }
      res.json(body);
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
