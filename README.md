# projectBigData


## Getting started

There are 3 repositories: <br />
**1) Models:** It contains the python functions for training, the models, the visualisations... <br />
**2) appbigdataproject:** Frontend application <br />
**3) server:** Backend <br />

## Name
Project Big Data

## Description
This project aim to create a website to have a game to test your general knowledge using the microphone to answer. To do this we mainly used ReactJS, TensorFlow. To get the questions we used Trivia database API. We used some ML in order to recognise the answer of the player. 

## Installation
If you wan to test this in local you need to :

	Front :
		- cd appbigdataproject
		- npm install
		- npm run dev
	Back :
		Option 1 (docker):
			- docker pull @keven/back
			- docker run -p 8080:8080 back
		Option 2 (local):
			- cd Modele
			- pip install -r requirements.txt
			- cd ..
			- cd server
			- py .\back.py

Now go to : http://127.0.0.1:5713 <br />
Create an account and verify it before playing <br />

Enjoy :)<br />


## Authors and acknowledgment
**Modèles:** <br />
Simon HUANG <br />
Abdel-Rahim MEZIDI <br />

**Cloud:** <br />
Keven BIHAN <br />
Martial GESSEAUME <br />
Kévin TOURNIE <br />

**Frontend:** <br />
Kévin TOURNIE <br />
