# Image Wordy - MERN Stack Chatbot for Image and Text Analysis

Build with React+TypeScipt.js , Node+Express.js, Tesseract.js and OpenAI api

_Image Wordy is a simple chat bot that can take an image and text as input, and analyse the text using
OCR to recognise and extract the content from image and have analysis using it._

### Landing Page:

### Signup Page:

### Login Page:

### Home Page:

### Not Found Page:

## Run Locally

clone the repo:

`git clone https://github.com/Adithej/image-wordy.git`

Go to Project Directory:

`cd image-wordy`

Install dependencies for both client and server:

client :

```
cd client
npm install

```

server :

`cd server`

Create`.env`file at root of server directory
Copy the contents from`.env.example`to`.env`Add your secrect values to`.env` , OPEN-AI api key , MONGO_DB Atlas url and password, your own secrect
Cookie and JWT random string values.

`npm install`

Start both client and and server:

.image-wordy/client :

`npm run dev`

.image-wordy/server :

`npm run dev`

Use the testImages at `TestImages` directory on root level, or use your own english texual images to try out and get insights.
