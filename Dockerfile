# Use Python image as the base image
FROM python:3.9.16

# Set working directory in the container
WORKDIR /app

# Copy trained files to the working directory in the container
COPY ./Models/trained /app/Models/trained

# Copy the requirements file to the working directory in the container
COPY ./Models/requirements.txt /app/Models

# Copy the backend files to the working directory in the container
COPY ./server /app/server

RUN apt-get update && apt-get install -y libsndfile1

# Install required packages
RUN pip install -r ./Models/requirements.txt

# Set the command to run the endpoint
CMD ["python", "./server/back.py"]

# Expose ports 5000
EXPOSE 5000
