const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');
const Url = require('../models/url');

// @route   POST /api/url/shorten
// @desc    Create short url

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const devURL = config.get('baseURLDev');
    const prodURL = config.get('baseURLProduction')
    const baseUrl = (process.env.NODE_ENV ? prodURL : devURL)
    // Check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    // Create url code
    const urlCode = shortId.generate();
    console.log(longUrl);
    // Check long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url)
                res.json(url);
            else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date(),
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
})

module.exports = router;