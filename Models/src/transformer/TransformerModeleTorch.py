import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torch.utils.data import Dataset
import pandas as pd
import numpy as np
import os


# Import your dataset
import librosa

class SpeechDataset(Dataset):
    def __init__(self, tsv_file, wav_path):
        self.data = pd.read_csv(tsv_file, delimiter='\t')
        self.wav_path = wav_path
        # self.wav_path = os.path.normpath(wav_path)

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        wav_file = self.data['path'][idx]
        wav_file = os.path.join(self.wav_path, wav_file)
        # print("wav_file=",wav_file)
        # wav_file = self.wav_path + '/' + wav_file
        # print("wav_file=",wav_file)
        text = self.data['sentence'][idx]
        wav_data, sr = librosa.load(wav_file) # load wav file
        features = librosa.feature.mfcc(wav_data, sr=sr) # extract mfcc features
        numpy_file_path = wav_file.replace(".mp3",".npy")
        np.save(numpy_file_path, features)
        return numpy_file_path, text

# Define the transformer model
class TransformerModel(nn.Module):
    def __init__(self, input_dim, output_dim, d_model, nhead, num_layers):
        super(TransformerModel, self).__init__()
        self.transformer = nn.Transformer(d_model, nhead, num_layers)
        self.fc = nn.Linear(d_model, output_dim)

    def forward(self, x):
        x = self.transformer(x)
        x = self.fc(x)
        return x

# Define the training function
def train(model, dataloader, criterion, optimizer, device):
    model.train()
    for wav_file, text in dataloader:
        wav_file = np.load(wav_file)
        wav_file = torch.from_numpy(wav_file).float()
        text = torch.from_numpy(text).long()
        optimizer.zero_grad()
        output = model(wav_file)
        loss = criterion(output, text)
        loss.backward()
        optimizer.step()

# Define the validation function
def validate(model, dataloader, criterion, device):
    model.eval()
    total_loss = 0
    with torch.no_grad():
        for wav_file, text in dataloader:
            wav_file = np.load(wav_file)
            wav_file = torch.from_numpy(wav_file).float()
            text = torch.from_numpy(text).long()
            output = model(wav_file)
            loss = criterion(output, text)
            total_loss += loss.item()
    return total_loss / len(dataloader)

# Define the main function
if __name__ == "__main__":
    input_dim = 20 # specify the input dimension
    output_dim = 30 # specify the output dimension
    d_model = 512 # specify the model dimension
    nhead = 8 # specify the number of heads
    num_layers = 6 # specify the number of layers
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # Define the model, criterion, optimizer and dataloader

model = TransformerModel(input_dim, output_dim, d_model, nhead, num_layers).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters())
wav_path_train = "./en_train_full_subset/target_directory"
wav_path_val = "./en_dev_full_subset/target_directory"
train_dataset = SpeechDataset("./tsv_files/filtered_train.tsv", wav_path_train)
train_dataloader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_dataset = SpeechDataset("./tsv_files/filtered_dev.tsv", wav_path_val)
val_dataloader = DataLoader(val_dataset, batch_size=32, shuffle=True)


# Define the number of epochs and start training
num_epochs = 10 # specify the number of epochs
for epoch in range(num_epochs):
    train_loss = train(model, train_dataloader, criterion, optimizer, device)
    val_loss = validate(model, val_dataloader, criterion, device)
    print("Epoch: {}, Train Loss: {}, Val Loss: {}".format(epoch+1, train_loss, val_loss))





