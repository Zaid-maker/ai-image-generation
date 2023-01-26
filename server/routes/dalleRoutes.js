import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

/* This is creating a new configuration object that will be used to make the API call. */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const router = express.Router();

/* This is a route that is used to test the API. It is not used in the final product. */
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    /* Destructuring the prompt from the request body. */
    const { prompt } = req.body;

    /* This is the API call to OpenAI. It takes in a prompt and returns a photo. */
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    /* Taking the response from the API call and extracting the image from it. */
    const image = aiResponse.data.data[0].b64_json;

    /* Sending the image back to the frontend. */
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    /* This is a ternary operator. It is saying if there is an error, send the error message, otherwise
    send "Something went wrong". */
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

export default router;
