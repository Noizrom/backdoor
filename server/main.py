
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from server.api import extend_api

api_app = FastAPI(title="api")

# place all api routes in api.py
extend_api(api_app)

app = FastAPI()
app.mount("/api", api_app)
app.mount("/", StaticFiles(directory="dist" , html=True), name="dist")

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["GET","POST","PUT","DELETE"],
    allow_headers=["*"]
)
