FROM python:3.10

# .pyc
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /api

COPY . /api/

COPY ./staticfiles .

COPY ./requirements.txt .

RUN pip install -U pip

RUN pip install -r requirements.txt


# RUN python ./manage.py collectstatic

# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]