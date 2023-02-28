# FaceChat
![avatar](https://user-images.githubusercontent.com/60605574/221733913-3df8a86b-275a-40dd-abd3-209b8d8bc1eb.png)

FaceChat: Real-Time Face-to-Face Conversational System

## Installation

```bash
pip install -r requirements.txt 
```

## Run

You need to register for the OpenAI key to use the GPT3 services.
https://platform.openai.com/docs/api-reference?lang=python

```
export OPENAI_API_KEY='yourkey'
python app.py
```

It needs https to access the camera and microphone. 
You can use self-signed certificate for Flask by running:

```
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

Then, you can access the webpage with:

https://localhost:55009
