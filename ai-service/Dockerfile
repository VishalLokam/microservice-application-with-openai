FROM python:3.11.2-slim-buster

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

ENV FLASK_APP = openai_generate_description.py

CMD ["flask", "--app=openai_generate_description", "run", "--host=0.0.0.0"]