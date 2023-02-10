import numpy as np
import librosa
from keras.models import load_model
import sys
classes = ["one", "two", "three", "four"]
n_mel = 20
n_mfcc = 5
max_length = 581
model = load_model("lstm_20_5_8k_opti_one_four.h5")
model_yes_no = load_model("lstm_10_4_8k_opti_yes_no.h5")
classes_yes_no = ["yes", "no"]
max_length_yes_no = 461


def load_from_wav(filePath):
    """
    Load audio from wav file

    Args:
        filePath (str): path to wav file

    Returns:
        audio (np.array): audio data
        sr (int): sample rate
    """
    audio, sr = librosa.load(filePath)
    return audio, sr


def process_audio(file_path, max_length=max_length, n_mels=20, n_mfcc=5):
    """
    Process audio file to be used in model


    Parameters
    ----------
        file_path (str) : path to audio file
        max_length (int) : max length of audio
        n_mels (int) : number of mel bands
        n_mfcc (int) : number of mfcc bands

    Returns
    -------
        x (np.array): processed audio
    """
    y, sr = load_from_wav(file_path)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc, n_mels=n_mels)
    x = np.empty((1, n_mfcc, max_length))
    for i in range(len(mfcc)):
        x[0][i] = np.pad(mfcc[i], (0, max_length - len(mfcc[i])))
    return x


def predict(filePath, classes=classes, model=model, max_length=max_length, n_mels=20, n_mfcc=5):
    """
    Predict audio file.

    Parameters
    ----------
        filePath (str) : path to audio file
        classes (list) : list of classes
        model (keras.model) : model to use
        max_length (int) : max length of audio
        n_mels (int) : number of mel bands
        n_mfcc (int) : number of mfcc bands

    Returns
    -------
        prediction (str): predicted class. Either "one", "two", "three" or "four"
    """
    res = process_audio(filePath, max_length=max_length, n_mels=20, n_mfcc=5)
    pred = model.predict(res)
    prediction = classes[np.argmax(pred)]
    return prediction


def process_audio_yes_no(file_path, max_length=max_length_yes_no, n_mels=10, n_mfcc=4):
    """
    Process audio file to be used in model

    Parameters
    ----------
        file_path (str): path to audio file
        max_length (int): max length of audio
        n_mels (int): number of mel bands
        n_mfcc (int): number of mfcc bands

    Returns
    -------
        x (np.array): processed audio
    """
    y, sr = load_from_wav(file_path)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc, n_mels=n_mels)
    x = np.empty((1, n_mfcc, max_length))
    for i in range(len(mfcc)):
        x[0][i] = np.pad(mfcc[i], (0, max_length - len(mfcc[i])))
    return x


def predict_yes_no(filePath, classes=classes_yes_no, model=model_yes_no, max_length=max_length_yes_no, n_mels=10, n_mfcc=4):
    """
    Predict audio file

    Parameters
    ----------
        filePath (str): path to audio file
        classes (list): list of classes
        model (keras.model): model to use
        max_length (int): max length of audio
        n_mels (int): number of mel bands
        n_mfcc (int): number of mfcc bands

    Returns
    -------
        prediction (str): predicted class. Either "yes" or "no"
    """
    res = process_audio_yes_no(
        filePath, max_length=max_length, n_mels=10, n_mfcc=4)
    pred = model.predict(res)
    prediction = classes[np.argmax(pred)]
    return prediction


if __name__ == "__main__":
    filepath = sys.argv[1]
    print(predict(filepath))
