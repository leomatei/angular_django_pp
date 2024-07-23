# Management System for complaints

## Description

App to create complaints, assign complaints. Project built using angular and django.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

## NEW Docker

Run `docker-compose up --build` for the first time  
Run `docker-compose up` to start the app  
Run `docker-compose watch` to start the app and detect changes and sync your local files to containers files

Run `docker-compose exec backend python manage.py seed` to seed the db while docker is running.

## OLD without Docker

### BackEnd

Create virtual environment ( https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/).

use
`python manage.py makemigrations`  
`python manage.py migrate`  
to make migrations(you can use it after creating anew model)

Commands to start:  
` venv\Scripts\activate (replace venv with your virtual env name)`  
`python manage.py runserver`

#### Prerequisites

install python3.12, django, django rest framework, rest farmework simple jwt and cors for django

### FrontEnd

Run `npm install` to install depencies then use `ng serve` to run client.

#### Prerequisites

Use Node 16 or 18, you might need nvm

if you get this error  
 opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
library: 'digital envelope routines',
reason: 'unsupported',
code: 'ERR_OSSL_EVP_UNSUPPORTED'

use node 18 and run `$env:NODE_OPTIONS="--openssl-legacy-provider"`, then retry `ng serve`
