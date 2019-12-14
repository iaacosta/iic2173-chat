FROM python:3.7-slim

WORKDIR /app
COPY . /app

RUN pip install -r requirements.txt
RUN python seed.py

EXPOSE 80
ENV AWS_IAM_ID=AKIAI2XW5HCARB435W5Q
ENV AWS_IAM_SECRET=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
ENV AWS_REGION=us-east-2

CMD ["gunicorn", "-w=1", "-b=0.0.0.0:80", "index:app"]
