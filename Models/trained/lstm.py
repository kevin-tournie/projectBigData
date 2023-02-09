import numpy as np
import librosa
from keras.models import load_model
import sys
classes = ["yes", "no", "one", "two", "three", "four"]
n_mel = 20
n_mfcc = 5
max_length = 581
model = load_model("lstm_20_5_16k_basic.h5")
model_yes_no = load_model("model_lstm_16k_yes_no.h5")
classes_yes_no = ["yes", "no"]
max_length_yes_no = 461


def load_from_wav(filePath):
    audio, sr = librosa.load(filePath)
    arr = np.array(audio, dtype=float)
    return arr, sr


def process_audio(file_path, max_length=max_length, n_mels=20, n_mfcc=5):
    y, sr = load_from_wav(file_path)
    S = librosa.power_to_db(
        librosa.feature.melspectrogram(y=y, sr=sr, n_mels=n_mels))
    mfcc = librosa.feature.mfcc(S=S, n_mfcc=n_mfcc)
    x = np.empty((1, n_mfcc, max_length))
    for i in range(len(mfcc)):
        x[0][i] = np.pad(mfcc[i], (0, max_length - len(mfcc[i])))
    return x


def predict(filePath, classes=classes, model=model, max_length=max_length, n_mels=20, n_mfcc=5):
    res = process_audio(filePath, max_length=max_length, n_mels=n_mels, n_mfcc=n_mfcc)
    pred = model.predict(res)
    prediction = classes[np.argmax(pred)]
    return prediction


def predict_yes_no(filePath, classes=classes_yes_no, model=model_yes_no, max_length=max_length_yes_no, n_mels=20, n_mfcc=5):
    res = process_audio(filePath, max_length=max_length, n_mels=n_mels, n_mfcc=n_mfcc)
    pred = model.predict(res)
    prediction = classes[np.argmax(pred)]
    return prediction


if __name__ == "__main__":
    filepath = sys.argv[1]
    print(predict(filepath))
