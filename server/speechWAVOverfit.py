import speech_recognition as sr
import sys
#Input: Path of the wav file
#Output: String of the transcripted text

#Si l'un des résultats possibles est dans la liste des fréquence, on va renvoyer le résultat possible trouver même s'il n'a pas la fréquence la plus élevée
def googleApiOverfit(WAVFilePath):
    r = sr.Recognizer()

    audio_file_wav = sr.AudioFile(WAVFilePath)
    with audio_file_wav as source:
        audio = r.record(source)

    possible_answers = ["yes", "no", "one", "two", "three", "four"]
    #Reconnaissance de la parole
    # Raises a ``speech_recognition.UnknownValueError`` exception if the speech is unintelligible. Raises a ``speech_recognition.RequestError`` exception if the speech recognition operation failed, if the key isn't valid, or if there is no internet connection.
    try:
        result = r.recognize_google(audio, language = "en-US", show_all=True)
        if result: 
            for row in result["alternative"]:
                if row["transcript"] in possible_answers:
                    return row["transcript"]
            return "Unrecognised"
    except sr.UnknownValueError:
        return "Unrecognised"
    except sr.RequestError:
        return "Unrecognised"

print(googleApiOverfit("test.wav"))
