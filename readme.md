# Shorterly #

A barebones url shortener in Django 1.10 with a react-redux client.

## Quickstart ##


First create and activate your virtualenv, you can use [virtualenvwrapper](https://virtualenvwrapper.readthedocs.org/en/latest/). Then install Django 1.10 in your virtualenv:

    pip install django==1.10

Then, assuming you have node installed (>=v6.0.0):

1. `pip install -r requirements.txt`
2. `python ./manage.py migrate`
3. `cd shorterly`
4. `sudo npm install`
5. `sudo npm run build`
6. `cd ../ && python ./manage.py runserver`

Now the development server shoudl be running, navigate to: [http://localhost:8000/](http://localhost:8000/)

## How to use it ##

### Create Form `/`

<img width="672" alt="screen shot 2016-11-07 at 10 50 32 am" src="https://cloud.githubusercontent.com/assets/796926/20064288/33552812-a4d8-11e6-9592-ff47502b0d30.png">

### Details Form

From here you can edit redirect urls by device.

<img width="690" alt="screen shot 2016-11-07 at 10 49 11 am" src="https://cloud.githubusercontent.com/assets/796926/20064385/85cdea52-a4d8-11e6-9254-efbbbe8b4c46.png">

### Retrieve All Urls

Just navigate to `/urls/` and you can view all the urls.

### Settings ###

#### For now, settings only work for development, which is the default environment.

## Notes on Implementation

### Server Side

Pretty straightforward data models and leverages django rest for the api.

#### API

For now the api endpoints are prefixed with `/api/` as follows:

    /api/device-urls/:id PUT for updating redirect urls by device id
    /api/urls/           POST for creating Urls and related DeviceUrls
    
The models are serialized with django rest serializers that [decorate the models](https://github.com/daedelus-j/shorterly/blob/master/apps/base/serializers.py) for client usage.

You can retrieve the main shortened url which for now just has a `localhost:8000` as a domain but would obviously be configurable for different environments. This can be retrieved in the details view as shown above.

### Client Side

Right now there is no server side rendering and all javascript/less lives in `./shorterly/src/`. It is currently built with webpack and the javascript uses React/Redux libraries and architecture. The directory structure is similar to react conventions with:

    /componenents       # all react components
    /containers         # main render container
    /stores             # where redux stores live
    /reducers           # application reducers
    /actions            # redux actions
    /general-libs       # general purpose js libraries
    /less               # where less components are stored
    /less/ui-kit        # base styles
