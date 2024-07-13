FROM python:3.10

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy requirements.txt
COPY requirements.txt ./

# Install dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the backend application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
