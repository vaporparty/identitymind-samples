# Identitymind KYC plugin - Node Example
A Node.js example for showing a full data flow/communication of the Identitymind KYC plugin by mocking a ICO website.

**NOTE: To prevent clickjacking attacks you must set X-Frame-Options header to SAMEORIGIN or DENY where the plugin will load.**

## Running Locally

#### Cloning repo
Clone the repository and move into the project folder.
```
$ git clone git@github.com:identitymind/identitymind-samples.git # or clone your own fork
$ cd identitymind-samples/kyc-plugin-node
```

#### Install dependencies
Run this command in your local directory to install the dependencies locally.
```
$ npm install
```

### Configuration
Once node dependencies are installed, you need to set environment variables for the plugin to load and also for validating the plugin response.

#### Environment Variables
Name | Description
--------- | -------
AUTH_URL | Authentication endpoint for recieving plugin_token provided by IDM team
API_KEY | Key provided by IDM team to make request to AUTH_URL provided by IDM team

#### Public Key file

After creating environment variables, you need to create a text file named `idmpublickey.txt` on the project root with the public key provided by IDM team.

#### Running the app
To run the application locally ([http://localhost:8080](http://localhost:8080)), you can do it by executing:
```
$ node index
```


## Documentation
For more information about KYC plugin configuration and workflow, you can visit our following documentation pages:
* [http://documentation.identitymindglobal.com/kyc-plugin/](http://documentation.identitymindglobal.com/kyc-plugin/)