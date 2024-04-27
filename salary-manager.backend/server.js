const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require("path");
const route = require("./routes/routes");
const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(express());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", route);



app.listen(port, () => {
    console.log(`le serveur utilise le port ${port}`);
});