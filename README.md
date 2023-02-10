# Big Data Project : Big Neural Quiz <!-- omit in toc -->


This project aims to create an online game to test your general knowledge. <br/>
Using the microphone to answer the questions, you will be able to play alone or with friends.

![alt text](/images/question.gif "Question page")
## Table of contents <!-- omit from toc -->

- [How to play](#how-to-play)
  - [Deployed version](#deployed-version)
  - [Local version](#local-version)
- [Repository](#repository)
- [Technical Stack and Architecture](#technical-stack-and-architecture)
- [Data Collection](#data-collection)
- [Data Preprocessing](#data-preprocessing)
- [Speech Recognition Model](#speech-recognition-model)
- [Final results](#final-results)
- [Quiz Game Application](#quiz-game-application)
- [Possible improvements](#possible-improvements)
- [Authors and acknowledgment](#authors-and-acknowledgment)



## How to play
### Deployed version

You can play the game on this link : 

>https://bigneuralquiz.vercel.app/  
(for as long as the server is running, which might not be for long !)

To play the game, you need to create an account and verify it by clicking on the link sent to your email address. <br/>
Then you can just start playing !

### Local version

If you want to test this in local you need to : <br/>

#### Front-end :  <!-- omit from toc -->

    cd ./appbigdataproject 
    npm install 
    npm run dev
  
#### Back-end : <!-- omit from toc -->
Option 1 (docker): 

    docker build -t back . 
    docker run -p 8080:8080 back
Option 2 (local): 

    cd Modele
    pip install -r requirements.txt
    cd ..\server
    py .\back.py

You will need to create a `.env` file in the `appbigdataproject` folder with the following content: <br/>

    VITE_SUPABASE_URL = your supabase url
    VITE_SUPABASE_KEY = your supabase key
    VITE_BACKEND_BASE_URL = http://localhost:8080

Then you can just start playing by going to `http://localhost:8080/` in your browser. <br/>
Enjoy ! <br/>




## Repository

There are 3 main folders: <br />

**1. Models:** It contains the python functions for training, the models, the visualisations... <br />

**2. appbigdataproject:** Frontend application <br />

**3. server:** Backend REST API<br />

## Technical Stack and Architecture

Frontend : ReactJS and Typescript<br />
Backend : FastAPI <br />
Models : Tensorflow, Keras <br />
Database : Supabase <br />
Deployment : Heroku, Vercel <br />
Questions Database : Open Trivia Database <br />

![alt text](/images/architecture.png "Architecture")

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

## Final results

Yes-No: ~90% Accuracy  
1 - 2 - 3 - 4: ~75% Accuracy
## Quiz Game Application

![alt text](/images/quiz_application_image.png "Connection page")


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

**Backend & Cloud:** <br />
Keven BIHAN <br />
Martial GESSEAUME <br />
Kévin TOURNIE <br />

**Frontend:** <br />
Kévin TOURNIE <br />

