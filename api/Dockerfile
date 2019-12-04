FROM python:3.7-slim

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

RUN python seed.py

CMD ["gunicorn", "-w=4", "-b=0.0.0.0:80", "index:app"]
