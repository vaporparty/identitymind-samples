# Identitymind KYC plugin - Django Example
A Django example for showing a full data flow/communication of the Identitymind KYC plugin by mocking a ICO website, with [Heroku](https://www.heroku.com/) support for quick deploy and test.

**NOTE: To prevent clickjacking attacks you must set X-Frame-Options header to SAMEORIGIN or DENY where the plugin will load.**

## Running Locally

#### Cloning repo
Clone the repository and move into the project folder.
```
$ git clone git@github.com:identitymind/identitymind-samples.git # or clone your own fork
$ cd identitymind-samples/kyc-plugin-django
```

#### Virtual Environment
Make sure you have [virtualenvs](https://python-guide-pt-br.readthedocs.io/en/latest/dev/virtualenvs/) installed and you are in and active virtualenv. You can accomplish this by running:

```
pip install virtualenv
virtualenv my_project
```


#### Install dependencies
Run this command in your local directory to install the dependencies locally.
```
(my_project)$ pip install -r requirements.txt
```

#### Running the app
To run the application locally ([http://localhost:8000](http://localhost:8000)), you can do it using django local developement server by running:
```
(my_project)$ python manage.py runserver 8000
```

Or you can use [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to run a local heroku instance, like so:
```
(my_project)$ heroku local web
```
Your app should now be running on [http://localhost:5000](http://localhost:5000).

## Deploying to Heroku
To deploy this app (named kyc-demo) to Heroku and test it on a public environment, execute the following commands:

```
$ heroku create kyc-demo --buildpack heroku/python
$ heroku git:remote -a kyc-demo # For existing repo we need to add the heroku remote
$ git subtree push --prefix kyc-plugin-django heroku master # Make sure you are on the top level directory of the repo
$ heroku open
```

## Configuration
Once django project is setup and running, you need to set environment variables for the plugin to load and also for validating the plugin response.

Name | Description
--------- | -------
AUTH_URL | Authentication endpoint for recieving plugin_token
PUBLIC_KEY | Public key provided by IDM team (In this example the public key line breaks where replaced by `//` but you can remove that format.)
DJANGO_SETTINGS_MODULE | ico_demo.settings
API_KEY | Key provided by IDM team to make request to AUTH_URL

## Documentation
For more information about KYC plugin configuration and workflow, you can visit our following documentation pages:
* [http://documentation.identitymindglobal.com/kyc-plugin/](http://documentation.identitymindglobal.com/kyc-plugin/)