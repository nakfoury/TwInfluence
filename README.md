# \#Influence
\#Influence is a web app for visualizing major influencers on Twitter. Users may enter a hashtag query to generate models of popular tweets with that hashtag.

## Usage
\#Influence is currently deployed on Amazon Elastic Compute Cloud. It can be accessed [here](http://52.24.28.184).  
  
  To use \#Influence, enter a popular hashtag into the search bar and press the "Go!" button. After a brief moment, you will be redirected to a result page bearing a stunning visualization of the top 5 most popular tweets with that hashtag. Clicking on any of them will reveal the top retweeters of that tweet, selected and sized by follower number.


## Future Work
Should you want to continue developing #Influence, here are some instructions to guide you:
#### Download and Installation
  1. Download the [source code](https://github.com/nakfoury/TwInfluence/archive/master.zip).  
  2. Extract the code to your desired directory.  
  3. Open the command line in the same directory and run:  
  ```npm install --save```
  4. You will be able to start the server locally by running:
  ```node bin/www```  
from the same directory. Press Control-C to stop the server.
  5. You will be able to reach #Influence by pointing your browser at: localhost:3000  
  
#### Code Tour
-[public/index.html](https://github.com/nakfoury/TwInfluence/blob/master/public/index.html): App homepage with initial search bar.  
-[public/result.html](https://github.com/nakfoury/TwInfluence/blob/master/public/result.html): Result page displaying D3.js visualization.  
-[public/javascripts/](https://github.com/nakfoury/TwInfluence/tree/master/public/javascripts): Currently contains JavaScript for D3.js visualization. Add new JavaScripts here.  
-[public/stylesheets/](https://github.com/nakfoury/TwInfluence/tree/master/public/javascripts): Currently contains CSS for index.html and result.html. Add new StyleSheets here.  -[bin/www](https://github.com/nakfoury/TwInfluence/blob/master/bin/www): Run this file with node to open an HTTP server on port 3000.  
-[routes/index.js](https://github.com/nakfoury/TwInfluence/blob/master/routes/index.js): Express router that handles page requests, Twitter API OAuth, and queries to the Twitter API.  
## Credits
#### Code Referenced  
[Wrapping Long Labels](http://bl.ocks.org/mbostock/7555321)  
[Zoomable Circle Packing](http://bl.ocks.org/mbostock/7607535)
#### Packages Used  
Node.js  
Express  
D3.js  
twit  
jsonfile  
## About
Authors: Neal Kfoury, Neha Rathi, Yasu Saito, Jia You  
Northwestern University  
EECS 395/JOUR 490: Collaborative Innovation in Journalism, Media & Technology  
Professors Zach Wise & Larry Birnbaum  
