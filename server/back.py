from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
# import googleApiOverfit
from fastapi.responses import JSONResponse
import lstm
app = FastAPI()

# pour lancer le serveur : uvicorn back:app --reload
HOST = "127.0.0.1"  # The server's hostname or IP address
PORT = 65432  # The port used by the server

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def get_data():
    return "coucou Rahim"


@app.post("/api/processAudio")
async def process_audio(file: UploadFile):
    filename = file.filename
    audio_blob = await file.read()
    # do something with the audio blob, for example saving it to a file:
    with open("test.wav", "wb") as f:
        f.write(audio_blob)
    # process =googleApiOverfit.googleApiOverfit(filename)
    process = lstm.predict(filename)
    print(process)
    return process
    """
    json_object = json.dumps({"data":process})
    return JSONResponse(content=json_object)
    """
if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=5000)
