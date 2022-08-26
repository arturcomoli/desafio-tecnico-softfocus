FROM python:3.10

# .pyc
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt ./api/

RUN pip install -U pip

RUN pip install -r requirements.txt

WORKDIR /api

COPY . /api/

# RUN python ./manage.py collectstatic

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]