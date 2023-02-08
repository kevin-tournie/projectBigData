#Creating en_test_full_subset (Yes/No 1-4)
import pandas as pd
import os
from shutil import copyfile


# Exemple de path1
# path1 = "C:/Users/Simon/OneDrive/Documents/FISE3/Semestre 9/Spe-Info2-Big Data/Big Data Project/en/clips/"
# C'est le path où se trouve l'ensemble des fichiers audio

def creating_train_files_subset(path1):
    # Charger le fichier filtered_test.tsv en utilisant pandas
    filtered_train_df = pd.read_csv('./tsv_files/filtered_train.tsv', sep='\t')
    # Définir le path3
    path3 = './en_train_full_subset/'

    # Vérifier si le path3 existe, sinon le créer
    if not os.path.exists(path3):
        os.makedirs(path3)

    # Pour chaque ligne du fichier filtered_test.tsv
    for index, row in filtered_train_df.iterrows():
        # Récupérer le nom du fichier audio
        audio_file_name = row['path']
        # Construire le chemin complet du fichier audio dans path1
        source_path = os.path.join(path1, audio_file_name)
        # Construire le chemin complet où le fichier audio sera copié dans path3
        destination_path = os.path.join(path3, audio_file_name)
        # Vérifier si le fichier audio existe dans path1
        if os.path.exists(source_path):
            # Copier le fichier audio de path1 à path3
            copyfile(source_path, destination_path)
        else:
            print(f"Le fichier {audio_file_name} n'existe pas dans {path1}")
    return filtered_train_df