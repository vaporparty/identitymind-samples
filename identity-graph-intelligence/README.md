# IdentityMind IdentityLink Graph Sample
A node and client javascript wrapper around the IdentityMind IdentityLink Graph APIs, using [http://sigmajs.org](http://sigmajs.org) and [http://www.chartjs.org/](http://www.chartjs.org/) for visualization.

## Running Locally
Make sure you have [Node.js](https://nodejs.org/en/) installed, then clone our repo and start the node app by running the following commands:

```
$ git clone git@github.com:identitymind/identitymind-samples.git # or clone your own fork
$ cd identitymind-samples/identity-graph-intelligence
$ npm install
$ npm start
```
Your app should now be running on [localhost:3000](http://localhost:3000).

## Deploying to Heroku
-----
Alternatively, to deploy this app to Heroku and test it on a public environment, execute the following commands:

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Configuration
* Go to http://localhost:3000 in your browser
* Configure access to the IdentityMind server via the [configuration link](http://localhost:3000/im/config).

* Access Identity Link Graphs on:
    * [Graph View](http://localhost:3000/graph.html)
    * [Transfer View](http://localhost:3000/transfers.html)
    * [Identity View](http://localhost:3000/identity.html)

## Transaction Data Upload
In order to view the IdentityLink graph you will need to upload transaction data.  The platform supports real time upload of transaction data, but to ease testing you can also upload a CSV file of transactions:

* Go to the Data Upload view [Upload](http://localhost:3000/upload.html)
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
