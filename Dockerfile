# Use Python image as the base image
FROM python:3.9-alpine

# Set working directory in the container
WORKDIR /app

# Copy trained files to the working directory in the container
COPY ./Models/trained /app/Models/trained

# Copy the requirements file to the working directory in the container
COPY ./requirements.txt /app/Models

# Copy the backend files to the working directory in the container
COPY ./server /app/server


# Install required packages
RUN pip install -r ./app/Models/requirements.txt

# Set the command to run the endpoint
CMD ["python", "./server/back.py"]

# Expose ports 5000
EXPOSE 5000
