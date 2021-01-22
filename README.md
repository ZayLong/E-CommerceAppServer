<h2> What is it? </h2>
A server that (suprise, suprise) *serves* a RESTful API for retrieving customer data such as rewards, coupons and store locations

<h2>What does it use?</h2>
<h6>the TIS APP/SERVER uses a modified MEAN Stack comprised of:</h6>
- MongoDB
- Restify
- Node.JS
- Angular.JS / Ionic 

<h2> What does each component of this so called "RAMN" Stack do? </h2>

- *Node*
  - Node is the server that handles request REST requests to the database
- *Restify*
  - Resify is used to write an RESTful API to send requests for information from the client to the server
- *MongoDB*
  - This document based database will house store location and user data which the <a href="https://github.com/TNGWorldwide/tisApp/blob/master/www/js/services.js">app</a> will request
- *Angular*
  - Not at all used by the server, this is a client side component used to display data to the user
- *Ionic*
  - Servers as a tool that can help structure the app in a mobile friendly way, also helps with compiling an app
  
<h2>OK Cool, so how do I install it?</h2>
<h6>Instructions assume running a Debian based linux distro (Such as ubuntu)</h6>
  
- Download the server and <a href="https://github.com/TNGWorldwide/tisApp">client</a> repositories
  
- INSTALL NODE AND NPM
```
  sudo apt-get update
  sudo apt-get install nodejs
  sudo apt-get install npm
  node server.js
```
- INSTALL MONGODB
```
  sudo apt-get install -y mongodb-org
  sudo service mongod start
```
- INSTALL PHP
```
sudo apt-get install php5
```
- IMPORT DATA
  - download rewardsCoupons.csv from prod
  - download RewardsLevel from prod
  - download stores.JSON
  - place them in the same directory of build_db_cron.sh and convertToJSON.php
  ```
  run build_db_cron.sh //set this up as a weekly cronjob
  ```
  
<h2>So what now?</h2>
  
- Navigate inside the server tisAppServer folder
- From here, run ```bower install```
- Didn't work?
  - ```npm init```
  - ```sudo npm install --save mongojs restify bcrypt@0.8 morgan```
    
You can view the database by using the command ```mongod```.
<br>
  ```show dbs;                      //Show all databases``` <br>
  ```use db;                        //Use a particular database```<br>
  ```show collections;              //Show collections/tables within a database```<br>
  ```db.collection.find().pretty(); //show some records in a pretty format.```<br>
  
Now it's time to install the <a href="https://github.com/TNGWorldwide/tisApp">client</a> app

<h2>HELP! I'M NOT READY</h2>

<h4>Fear not, here's a list of resources to familiarize yourself with</h4>

- <a href="https://nodejs.org/en/docs/">Node.JS</a>
- <a href="https://docs.mongodb.org/manual/">MongoDB</a>
- <a href="https://github.com/restify/node-restify">Restify</a>
- <a href="http://ionicframework.com/docs/overview/">Ionic</a>
- <a href="http://www.w3schools.com/angular/">Angular.JS</a>
