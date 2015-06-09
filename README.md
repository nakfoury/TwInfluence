# \#Influence
\#Influence is a web app for visualizing major influencers on Twitter. Users may enter a hashtag query to generate models of popular tweets with that hashtag. Read more about \#Influence on [Medium](https://medium.com/@jiayoumedill/70c3dc0bcd65).

## Usage
\#Influence is currently deployed on Amazon Elastic Compute Cloud. It can be accessed [here](http://52.24.28.184).  
  
  To use \#Influence, enter a popular hashtag into the search bar and press the "Go!" button. After a brief moment, you will be redirected to a result page bearing a stunning visualization of the top 5 most popular tweets with that hashtag. Clicking on any of them will reveal the top retweeters of that tweet, selected and sized by relative number of followers.


## Future Work
Should you want to continue developing #Influence, here is some information to guide you:
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
- [public/index.html](https://github.com/nakfoury/TwInfluence/blob/master/public/index.html): App homepage with initial search bar.  
- [public/result.html](https://github.com/nakfoury/TwInfluence/blob/master/public/result.html): Result page displaying D3.js visualization.  
- [public/javascripts/](https://github.com/nakfoury/TwInfluence/tree/master/public/javascripts): Currently contains JavaScript for D3.js visualization. Add new JavaScripts here.  
- [public/stylesheets/](https://github.com/nakfoury/TwInfluence/tree/master/public/javascripts): Currently contains CSS for index.html and result.html. Add new StyleSheets here. 
- [bin/www](https://github.com/nakfoury/TwInfluence/blob/master/bin/www): Run this file with node to open an HTTP server on port 3000.  
- [routes/index.js](https://github.com/nakfoury/TwInfluence/blob/master/routes/index.js): Express router that handles page requests, Twitter API OAuth, and queries to the Twitter API.  

#### Known Issues/Missing Features
- \#Influence currently supports only 1 user at a time due to resource contention over the twitter_data.json file. To support multiple simultaneous users, Twitter data would need to be returned to the frontend as a response from the Express router. It would need to be added to result.js, perhaps using [Angluar.js](https://angularjs.org/).  
- The backend currently calls multiple queries to the Twitter API iteratively, causing the termination of all callbacks to complete at an indeterminate time. The current solution is to wait a fixed amount of time before redirecting the page. A better solution would be to call the Twitter queries in order, recursively.  
- \#Influence could be more more useful by displaying more information about each Twitter user. It could derive this information by parsing Twitter account descriptions and classifying users by their predicted areas of expertise.  
- The current visualization packs retweeter circles into the entire tweet circle (upon clicking to expand a tweet). A more intuitive display might pack retweeter circles into the lower portion of the original tweet circle, reserving the upper portion for information about the original tweet/tweeter and links to relevant pages on Twitter. One solution in development involves packing the retweeter circles into a zoomable rectangular canvas contained in the lower portions of the original tweet circles.

## Credits
#### Code Referenced  
[Wrapping Long Labels](http://bl.ocks.org/mbostock/7555321)  
[Zoomable Circle Packing](http://bl.ocks.org/mbostock/7607535)
#### Packages Used  
[Node.js](https://nodejs.org/)  
[Express](http://expressjs.com/)  
[D3.js](http://d3js.org/)  
[twit](https://github.com/ttezel/twit)  
[jsonfile](https://www.npmjs.com/package/jsonfile)  
## About
Authors: Neal Kfoury, Neha Rathi, Yasu Saito, Jia You  
Northwestern University  
EECS 395/JOUR 490: Collaborative Innovation in Journalism, Media & Technology  
Professors Zach Wise & Larry Birnbaum  
