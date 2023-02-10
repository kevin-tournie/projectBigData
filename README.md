# Big Data Project : Big Neural Quiz <!-- omit in toc -->


This project aims to create an online game to test your general knowledge. <br/>
Using the microphone to answer the questions, you will be able to play alone or with friends.

## Table of contents <!-- omit from toc -->

- [How to play](#how-to-play)
  - [Deployed version](#deployed-version)
  - [Local version](#local-version)
    - [Front-end :](#front-end-)
    - [Back-end :](#back-end-)
- [Repository](#repository)
- [Technical Stack](#technical-stack)
- [Data Collection](#data-collection)
- [Data Preprocessing](#data-preprocessing)
- [Speech Recognition Model](#speech-recognition-model)
- [Quiz Game Application](#quiz-game-application)
- [Final results](#final-results)
- [Possible improvements](#possible-improvements)
- [Authors and acknowledgment](#authors-and-acknowledgment)



## How to play
### Deployed version

You can play the game on this link : 

>https://big-neural-quiz.vercel.app/  
(for as long as the server is running, which is unkonwn)

To play the game, you need to create an account and verify it by clicking on the link sent to your email address. <br/>
Then you can just start playing.

### Local version
<br/>
If you want to test this in local you need to :

#### Front-end : 

    cd appbigdataproject 
    npm install 
    npm run dev
  
#### Back-end :
<br/>
Option 1 (docker): 

    - docker build -t back . 
    - docker run -p 8080:8080 back
Option 2 (local): 

    cd Modele
    pip install -r requirements.txt
    cd ..\server
    py .\back.py

You will need to create a `.env` file in the `appbigdataproject` folder with the following content: <br/>

VITE_SUPABASE_URL = your supabase url <br/>
VITE_SUPABASE_KEY = your supabase key <br/>
VITE_BACKEND_BASE_URL = http://localhost:8080 <br/>






## Repository

There are 3 main folders: <br />
**1) Models:** It contains the python functions for training, the models, the visualisations... <br />
**2) appbigdataproject:** Frontend application <br />
**3) server:** Backend REST API<br />

## Technical Stack

Frontend: ReactJS <br />
Backend: FastAPI <br />
Models: Tensorflow, Keras <br />
Database: Supabase <br />
Deployment: Heroku, Vercel <br />
Questions: Open Trivia Database <br />

## Data Collection

The data used for training the models is from the mozilla common voice dataset, the single word segment dataset. <br />

The dataset is available on this link: <br />
>https://commonvoice.mozilla.org/en/datasets <br />

For now we only used the english dataset, but we could use the french dataset as well. <br />
## Data Preprocessing

The data is preprocessed in the following way: <br />

- The audio files are converted to wav format, then resampled to 16kHz and mono. <br />
- The audio files are then tranformed into spectrograms. <br />
- Then the spectrograms are transformed into mel spectrograms. <br />
- Finally the mel spectrograms are transformed into mfccs. <br />
## Speech Recognition Model

The model used for the speech recognition is the following: <br />

![alt text](/images/model.png "Model")

## Quiz Game Application

![alt text](/images/quiz_application_image.png "Connection page")

## Final results

Yes-No: ~90% Accuracy  
1 - 2 - 3 - 4: ~75% Accuracy

## Possible improvements

- Lightening the docker image (currently ~3.5GB)
- Increasing the size of the dataset
- Fine tuning the model
- Dynamic learning: Using the audio recordings of the users to improve the existing models
- Eventually find and training a more fitting model (instead of the LSTM model)
- Adding a new category for the outputs: "Unrecognized"

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
