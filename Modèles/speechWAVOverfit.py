import speech_recognition as sr
import os

#Commande: python .\speechFileMP3ToTextFunction.py
#Input: Path of the mp3 file
#Output: String of the transcripted text

#Si l'un des résultats possibles est dans la liste des fréquence, on va renvoyer le résultat possible trouver même s'il n'a pas la fréquence la plus élevée
def speechWAVOverfit(WAVFilePath):
    #On extrait le nom de fichier sans l'extension pour utiliser comme nom de fichier wav
    file_name = os.path.splitext(WAVFilePath)[0]
    r = sr.Recognizer()

    audio_file_wav = sr.AudioFile(WAVFilePath)
    with audio_file_wav as source:
        audio = r.record(source)

    possible_answers = ["yes", "no", "one", "two", "three", "four"]
    #Reconnaissance de la parole
    # Raises a ``speech_recognition.UnknownValueError`` exception if the speech is unintelligible. Raises a ``speech_recognition.RequestError`` exception if the speech recognition operation failed, if the key isn't valid, or if there is no internet connection.
    # try:
        # result = r.recognize_google(audio, language = "en-US", show_all=True)
        # if result: 
        #     for row in result["alternative"]:
        #         if row["transcript"] in possible_answers:
        #             return row["transcript"]
        #     return result["alternative"][0]["transcript"]
        # return result
    # except sr.UnknownValueError:
    #     return sr.UnknownValueError
    # except sr.RequestError as e:
    #     return sr.RequestError

    # Perform speech recognition on the recorded audio
    try:
        r.recognize_google(audio, language = "en-US",show_all=False)
    except sr.UnknownValueError:
        return sr.UnknownValueError
    except sr.RequestError as e:
        return sr.RequestError

    result = r.recognize_google(audio, language = "en-US", show_all=True)
    if result: 
        for row in result["alternative"]:
            if row["transcript"] in possible_answers:
                return row["transcript"]
        return result["alternative"][0]["transcript"]
   


    


# print(speechFileWAVToTextFunction("common_voice_en_21875751.wav"))
