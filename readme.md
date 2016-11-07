# django-starter-template #

An easy to use project template for Django 1.10 that follows best practices.

## Features ##

- Compatible with python 2.7 and 3.4
- [Django compressor](http://django-compressor.readthedocs.org/en/latest/) to compress JS and CSS and compile LESS/SASS files.
- [Django debug toolbar](http://django-debug-toolbar.readthedocs.org/) enabled for superusers.
- [Argon2](https://docs.djangoproject.com/en/1.10/topics/auth/passwords/#using-argon2-with-django) to hash the passwords
- A [fabfile](http://www.fabfile.org/) to ease the deployment.

## Quickstart ##


First create and activate your virtualenv, you can use [virtualenvwrapper](https://virtualenvwrapper.readthedocs.org/en/latest/). Then install Django 1.10 in your virtualenv:

    pip install django==1.10

Then download and tar unzip file and cd into the project:

Then, assuming you have node installed (>=v6.0.0):

1. `pip install -r requirements.txt`
2. `python ./manage.py migrate`
3. `cd shorterly`
4. `sudo npm install`
5. `sudo npm run build`
6. `cd ../ && python ./manage.py runserver`

Now the development server shoudl be running, navigate to: [http://localhost:8000/](http://localhost:8000/)

## How to use it ##

Accessing `http://localhost:8000/` will display a form. You can create a
url there and be navigated to a details view.

To see the list of urls with their stats, navigate to `http://localhost:8000/urls/`.


### Settings ###

# For now, settings only work for development, which is the default
environment.
