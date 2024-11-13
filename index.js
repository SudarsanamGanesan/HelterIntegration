const express = require("express");
const axios = require("axios");
require('dotenv').config();
const cors=require('cors')



const app = express();
const port = 3001;

app.use(cors())

// Access variables from .env file
const sendBulkCampaignAPI = process.env.SEND_BULK_CAMPAIGN_API;
const secretKey = process.env.SECRET_KEY;

app.use(express.json());

app.post("/send-campaign", async (req, res) => {
    try {
        let myNumber = req.body.phoneNo;

        const apiBody = {
            campaignName: "Barberaa_Mega_Sale",
            campaignDesc: "campaignDesc",
            templateName: "barberaa_utility",
            languageCode: "en",
            messages: [{
                clientWaNumber: myNumber.startsWith("91") ? myNumber : "91" + myNumber,
                variables: []
            }]
        };

        const response = await axios.post(sendBulkCampaignAPI, apiBody, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${secretKey}`
            }
        });

        res.status(200).json({
            message: "Campaign sent successfully!",
            data: response.data
        });

    } catch (error) {
        console.error("Error sending campaign:", error);
        res.status(500).json({ error: "Failed to send campaign" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
