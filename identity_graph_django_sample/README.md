# Identity Mind Graph Intelligence Sample
A django and javascript wrapper around the IdentityMind Identity Link Graph APIs, using [http://sigmajs.org](http://sigmajs.org) and [http://www.chartjs.org/](http://www.chartjs.org/) for visualization with heroku support for quick deploy and test.

## Running Locally

#### Cloning repo
Clone the repository and move into the project folder.
```
$ git clone git@github.com:identitymind/identitymind-samples.git # or clone your own fork
$ cd identitymind-samples/identity_graph_django_sample
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
To deploy this app to Heroku and test it on a public environment, execute the following commands:

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Configuration
* Go to http://localhost:5000 in your browser
* Configure access to the IdentityMind server via the [configuration link](http://localhost:5000/im/config).

* Access Identity Link Graphs on:
    * [Graph View](http://localhost:5000/graph.html)
    * [Transfer View](http://localhost:5000/transfers.html)
    * [Identity View](http://localhost:5000/identity.html)

Note: localhost port might change depending on which method you used to run the application.

## Transaction Data Upload
In order to view the IdentityLink graph you will need to upload transaction data.  The platform supports real time upload of transaction data, but to ease testing you can also upload a CSV file of transactions:

* Go to the Data Upload view [Upload](http://localhost:5000/upload.html)
* Upload csv file with transaction information (for detailed explanation of arguments and csv file format please refer to: [http://documentation.identitymindglobal.com/api/#payment-transaction](http://documentation.identitymindglobal.com/api/#payment-transaction))
    
    Example csv file format:
    ```
    amt,bc,bco,bfn,bln,bz,bs,bsn,dft,dfp,pccn,pcct,tea,aph,ip,sc,sco,sfn,sln,sz,ss,ssn,tid
    40,Palo Alto,US,James,Doe,55555,CA,123 any st,AU,1872-ABCD-129E,4513bfe30439b317d3a504ecac74858965a89ce7,411111XXXXXX1111,j1234@mail.com,6505551234,10.1.2.3,Palo Alto,US,James,Doe,55555,CA,123 any st,89
    ```

## Documentation
For more information about IdentityLink API endpoints you can visit our following documentation pages:
* [https://sandbox.identitymind.com/api/](https://sandbox.identitymind.com/api/)
* [http://documentation.identitymindglobal.com/api/](http://documentation.identitymindglobal.com/api/)
