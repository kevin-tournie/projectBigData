# projectBigData

Développement d’un quiz multi utilisateurs.rices contrôlé par la voix

## Getting started

There are 3 repositories: <br />
**1) Models:** It contains the python functions for training, the models, the visualisations... <br />
**2) appbigdataproject:** Frontend application <br />
**3) server:** Backend <br />

## Name

Project Big Data : Big Neural Quiz

## Description

This project aims to create a website to have a game to test your general knowledge.
Using the microphone to answer the questions, the player will be able to play alone or with friends.

## Architecture

Frontend: ReactJS <br />
Backend: FastAPI <br />
Models: Tensorflow, Keras <br />
Database: Supabase <br />
Deployment: Heroku, Vercel <br />
Questions: Open Trivia Database <br />

## Data Collection

The data used for training the models is the mozilla common voice dataset. <br />

## Data Preprocessing

The data is preprocessed in the following way: <br />

- The audio files are converted to wav format, then resampled to 16kHz and mono. <br />
- The audio files are then tranformed into spectrograms. <br />

## Speech Recognition Models

## Quiz Game Application

![alt text](https://github.com/kevin-tournie/projectBigData/blob/main/quiz_application_image.png)
>>>>>>> 78b845f (readme)

## Deployment

## Conclusion

# Final results
Yes-No: ~90% Accuracy  
1 - 2 - 3 - 4: ~75% Accuracy  
## Areas for improvement

- Lightening the docker image
- Increasing the size of the dataset
- Fine tuning the model
- Dynamic learning: Using the audio recordings of the users to improve the existing models
- Eventually find and training a more fitting model (instead of the LSTM model)
- Adding a new category for the outputs: "Unrecognized"
## Requirements

## Installation

If you want to test this in local you need to :

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

## Reference

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
