# Memory Card Game

A funny game/application to find matching cards.

# Running a game

Simply open index.html file in your browser. Works even for mobiles ;)

# Application specifics

There are **3 sets** of cards *Animals, Emotions, Food & Drinks* which build the card grid of 16 cards.

There are 4 buttons to diverse the gameplay:

* Random (with question mark);
* Animal (lion);
* Emotions (smile);
* Food & Drinks (coffee).

Every time you open the application it will give you *Random* card set with randomly arranged hidden cards inside. Each button has it is own functionality: Animals - gives you the opportunity to play with *Animals* card set, *Emotions* with emojis etc. Random button gives you a *Random* card set of 3 possible ones.

Every time user opens a pair of cards, **1 move** will be added to the total count of moves. 

**Timer** starts counting as soon as **user clicked on any card** for the first time. Timer will stop when all cards will be **revealed**.

**Star rating** is also implemented. No timer impact on the start rating, however the more moves you have the less stars you will get. Up to **13 moves**, user will have **2 stars** left, after **19 moves** user will have **1 star** left.

After user guessed all the cards, a **pop up window** with Congratulations message will appear. There user will see how many **moves** have been done, how much **time** it took to guess all cards and **Star rating** accordingly. Also, user can start a **New game** (Play button) with the **Random set** of cards.

**New game** button resets all the statistics for a new game such as moves, timer, star rating. New game will be arranged with a **Random** card set.


# Gameplay

Main game tool to play here is your mouse or for mobile devices it is your finger.

Simply **click** once on the hidden empty field in the grid and the **first card** will become *visible*. Card will remain *opened* until you open a **second** card. Open a **second** card, it will become opened as well. If **both** cards matched, they will remain opened. Opened cards remain inactive. If one of the cards doesn't match, they will **both disappear**. Cards' location is not changed for the current game. As soon as user refreshes the page, clicks on one of the buttons to change the cards set accordingly.

User cannot click anywhere when both cards didn't match and are in disappearing process. After they disappeared actions become unblocked and user can try his luck further.

Guessed all cards? Congratulations! You can start a New game once again by clicking a New game button which will give you **Random** set of cards.

# Game dependencies

The game was built on pure JavaScript and CSS to increase the performance and load time.


