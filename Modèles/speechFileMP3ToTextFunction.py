# from pydub import AudioSegment
# import speech_recognition as sr
# import os

# #Commande: python .\speechFileMP3ToTextFunction.py
# #Input: Path of the mp3 file
# #Output: String of the transcripted text


import os
from pydub import AudioSegment
import speech_recognition as sr

def speechFileMP3ToTextFunction(MP3FilePath):
    # Extract the filename without the extension to use as the WAV file name
    # file_name = os.path.splitext(os.path.basename(MP3FilePath))[0]
    file_name = os.path.splitext(MP3FilePath)[0]

    # Initialize a Recognizer object
    r = sr.Recognizer()

    # Read the audio file in MP3 format
    sound = AudioSegment.from_mp3(MP3FilePath)

    

    # Convert the MP3 file to WAV format and save it to the "target" directory
    # sound.export(file_name + "test" + ".wav", format="wav")
    sound.export(file_name + ".wav", format="wav")
    # sound.export("./en_test_subset/target/" + file_name + ".wav", format="wav")



    # Open the WAV file
    # audio_file_wav = sr.AudioFile("./target/" + file_name + ".wav")
    audio_file_wav = sr.AudioFile(file_name + ".wav")
    # audio_file_wav = sr.AudioFile("./en_test_subset/target/" + file_name + ".wav")
    print("./en_test_subset/target/" + file_name + ".wav")
    with audio_file_wav as source:
        audio = r.record(source)

    # Perform speech recognition on the recorded audio
    try:
        return r.recognize_google(audio, language = "en-US",show_all=False)
    except sr.UnknownValueError:
        return sr.UnknownValueError
    except sr.RequestError as e:
        return sr.RequestError
