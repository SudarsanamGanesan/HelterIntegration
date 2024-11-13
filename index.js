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
        let Name = req.body.Name;

       
        

        const apiBody = {
            messages: [
                {
                    clientWaNumber: myNumber.length === 10 ? "91" + myNumber : myNumber,
                    templateName: "barberaa_utility",
                    templateContent: "🎉 Happy Birthday to Us! 🎉\n\nHi  {{1}},\nWe’re turning 1 and throwing a party YOU don’t want to miss!\n\n✨ Get pampered with a gift from us — *FLAT 50%* off on all salon and spa services across Chennai!\n\n📅 Save the dates: *November 14-16*\n🎟️ Coupon code goes live at 12 AM on Nov 14!\n\nGet ready to RSVP in style:\n\n\t1.\tDownload the Barberaa App \n( https://linktr.ee/barberaa )\n\t2.\tFollow @barberaa_app on Instagram\n\t3.\tTurn on notifications to be the first to snag this treat!\n\nWe can’t wait to celebrate with you! 🎈",
                    templateHeader: "",
                    languageCode: "en",
                    variables: [
                        {
                            type: "header",
                            parameters: [
                                {
                                    type: "image",
                                    image: {
                                        link: "https://heltar-chat-s3.s3.ap-south-1.amazonaws.com/-R7RsFO7ThPtjdpZwSK5bDlP576lPnR2FmaWcBSZ-EIMG_3300.JPG"
                                    }
                                }
                            ]
                        },
                        {
                            type: "body",
                            parameters: [
                                {
                                    type: "text",
                                    text: `${Name}`
                                }
                            ]
                        }
                    ],
                    messageType: "template",
                    refId: "vYkL0vBv5XrIBV0uQGE_N"
                }
            ]
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
