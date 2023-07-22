const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.static('upload'));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

require("./app/routes/auth.route")(app);
require("./app/routes/file.route")(app);
require("./app/routes/document.route")(app);

app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}`));