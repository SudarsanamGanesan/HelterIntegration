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
                    templateName: "new_user_utility_template",
                    templateContent: "Hey {{1}} !\n\n🎉 Welcome to Barberaa! 🎉\nGet ready for our Mega Sale from 14th to 16th November! Enjoy FLAT 50% OFF on all salon and spa bookings during this limited-time event. 💇‍♀️💅\n\nWith Barberaa, never wait at the salon again! Enjoy quick, easy, and hassle-free bookings at your favorite salons with the best deals in town. Book Now! ✨ \n\nBarberaa\nOne Makeover Away",
                    templateHeader: "",
                    languageCode: "en",
                    variables: [
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
                    refId: "xc31RybmBcPHrnBe_3-ex"
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
