import speech_recognition as sr

def speechFileWAVToTextFunction(WAVFilePath):
    #On extrait le nom de fichier sans l'extension pour utiliser comme nom de fichier wav
    r = sr.Recognizer()

    audio_file_wav = sr.AudioFile(WAVFilePath)
    with audio_file_wav as source:
        audio = r.record(source)


    # print(r.recognize_google(audio, language = "en-US"))
    try:
        return r.recognize_google(audio, language = "en-US")
    except sr.UnknownValueError:
        return sr.UnknownValueError
    except sr.RequestError as e:
        return sr.RequestError
    
print(speechFileWAVToTextFunction("./test.wav"));