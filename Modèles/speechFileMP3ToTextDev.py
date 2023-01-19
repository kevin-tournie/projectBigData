import os
import pandas as pd
from pydub import AudioSegment
import speech_recognition as sr

def speechFileMP3ToTextDev(MP3FilePathName):
    file_name_without_extension = os.path.splitext(MP3FilePathName)[0]

    current_directory = os.path.basename(os.getcwd()) 
    
    #On peut encore améliorer cette fonction!
    current_directory = "./" + current_directory + "/en_dev_full_subset/"

    normalized_path = os.path.normpath(current_directory)
    directories = normalized_path.split(os.sep)
    last_directory = directories[-1]

    # Initialize a Recognizer object
    r = sr.Recognizer()

    # Read the audio file in MP3 format
    sound = AudioSegment.from_mp3("./" + last_directory + "/" + MP3FilePathName)

    # Convert the MP3 file to WAV format and save it to the "target_directory" directory
    target_directory = last_directory + "/target_directory"

    if not os.path.exists(target_directory):
        os.makedirs(target_directory)
    sound.export(target_directory + "/" + file_name_without_extension + ".wav", format="wav")

    # Open the WAV file
    audio_file_wav = sr.AudioFile(target_directory + "/" + file_name_without_extension + ".wav")
    with audio_file_wav as source:
        audio = r.record(source)

    # Perform speech recognition on the recorded audio
    try:
        return r.recognize_google(audio, language = "en-US",show_all=False)
    except sr.UnknownValueError:
        return sr.UnknownValueError
    except sr.RequestError as e:
        return sr.RequestError
