const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://localhost:27017/urlshortener",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("db successfully connected");
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ fullUrl: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ ShortUrl: req.params.shortUrl });

  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.Clicks++;
  shortUrl.save();

  res.redirect(shortUrl.fullUrl);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running on port 5000`);
});
