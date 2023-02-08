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
