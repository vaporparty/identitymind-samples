# Identity Mind Graph Intelligence Sample
A node and client javascript wrapper around the IdentityMind Identity Link Graph APIs, using [http://sigmajs.org](http://sigmajs.org) and [http://www.chartjs.org/](http://www.chartjs.org/) for visualization.

## Running Locally
Make sure you have [Node.js](https://nodejs.org/en/) installed, then clone our repo and start the node app by running the following commands:

```
$ git clone git@github.com:identitymind/identitymind-samples.git # or clone your own fork
$ cd identitymind-samples/identity-graph-intelligence
$ npm install
$ npm start
```
Your app should now be running on [localhost:3000](http://localhost:3000).

### Deploying to Heroku
-----
To deploy this app to Heroku and test it on a public environment, execute the following commands:

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
To upload transaction information for the graph functions to work properly you'll have to:

* Go to the Data Upload view [Identity View](http://localhost:3000/upload.html)
* Upload csv file with transaction information (for detailed explanation of arguments and csv file format please refer to: [http://documentation.identitymindglobal.com/api/#payment-transaction](http://documentation.identitymindglobal.com/api/#payment-transaction))
    
    Example csv file format:
    ```
    amt,bc,bco,bfn,bln,bz,bs,bsn,dft,dfp,pccn,pcct,tea,aph,ip,sc,sco,sfn,sln,sz,ss,ssn,tid
    40,Palo Alto,US,James,Dinh,55555,CA,123 anystreet,AU,1872ABCD129E…,4513bfe30439b317d3a504ecac74858965a89ce7,411111XXXXXX1111,james@gmail.com,555555555,69.181.162.146,Palo Alto,US,James,Dinh,55555,CA,123 anystreet,89
    ```

## Documentation
For more information about Identity Link API endpoints you can visit our following documentation pages:
* [https://sandbox.identitymind.com/api/](https://sandbox.identitymind.com/api/)
* [http://documentation.identitymindglobal.com/api/](http://documentation.identitymindglobal.com/api/)