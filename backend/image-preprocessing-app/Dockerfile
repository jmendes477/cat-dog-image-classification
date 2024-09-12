#Python
FROM python:3.9-slim

#working dir
WORKDIR /usr/src/app

COPY . .

EXPOSE 5000

#requirements
RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python3", "./app.py" ]