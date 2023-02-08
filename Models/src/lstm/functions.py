import audiofile
import numpy as np
import scipy.signal as sps

def load_from_wav(filePath,sr):
    sig, fs = audiofile.read(filePath)
    dec_factor = fs//sr
    if dec_factor > 1:
        audio = sps.decimate(sig, dec_factor)
    arr = np.array(audio, dtype=float)
    return arr,sr


def load_and_padding(path, n_mfcc):
    with open(path, "rb") as f:
        X = load(f)
        y = load(f)

    max_length = max([len(X[i][0]) for i in range(len(X))])
    x = np.empty((len(X), n_mfcc, max_length))
    for i in range(len(X)):
        for j in range(len(X[i])):
            x[i][j] = np.pad(X[i][j], (0, max_length - len(X[i][j])))
    x = np.array(x).reshape((-1, n_mfcc, max_length))
    
    # Create a mask array to store the length of each padded signal
    X_mask = np.zeros((x.shape[0], max_length), dtype=bool)
    for i in range(x.shape[0]):
        length = len(X[i][0])
        X_mask[i, :length] = True
    
    return x, y, max_length, X_mask