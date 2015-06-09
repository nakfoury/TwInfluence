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
-
## Credits
#### Code Referenced  
[Wrapping Long Labels](http://bl.ocks.org/mbostock/7555321)
#### Packages Used  
node.js  
express.js  
D3.js  
twit  
jsonfile  
## About
Authors: Neal Kfoury, Neha Rathi, Yasu Saito, Jia You  
Northwestern University  
EECS 395/JOUR 490: Collaborative Innovation in Journalism, Media & Technology  
Professors Zach Wise & Larry Birnbaum  
