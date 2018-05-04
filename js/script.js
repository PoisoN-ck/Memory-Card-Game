document.addEventListener('DOMContentLoaded', function () {
    const CARD_HIDE_TIME = 700; //For how long the action is blocked
    const mainGrid = document.getElementById('mainGrid');
    const starsContainers = document.querySelectorAll('.starsContainer');
    const emotionsSet = document.getElementById('emotions');
    const animalsSet = document.getElementById('animals');
    const foodDrinksSet = document.getElementById('foodDrinks');
    let timerFields = document.querySelectorAll('.timer');
    let cardsList = [
        ["happy", "happy", "in-love", "in-love", "too-happy", "too-happy", "sad", "sad", "laugh", "laugh", "ninja", "ninja", "kissing", "kissing", "angry", "angry"],
        ["cake", "cake", "milk", "milk", "coffee", "coffee", "green-tea", "green-tea", "drink", "drink", "ice-cream", "ice-cream", "cookie", "cookie", "latte", "latte"],
        ["elephant", "elephant", "ladybug", "ladybug", "monkey", "monkey", "bear", "bear", "panda", "panda", "fish", "fish", "lion", "lion", "rabbit", "rabbit"]
    ];
    let randomGrid = createRandomGrid(cardsList[Math.round(Math.random() * 2)]); //getting a randomly arranged cards from a random cards set of 3 possible.
    gridBuild(randomGrid);
    let movesFields = document.querySelectorAll('.movesCount');
    let movesCount = 0;
    let timer = 0;
    let revealedCards = 0;
    let savedCard;
    let timerInAction;
    
    let isCardCheckingState = false; // To check the status if we have chosen first and going to choose the second
    let isControlBlocked = false; // Block any actions when cards haven't matched for timeout period
    let isGameStarted = false; //To start the timer
    
    
    function createRandomGrid(array) { // Function to create random array from already existing one
        let arrayElements = array.length,
        temp, 
        index;
        while (arrayElements > 0) {
            // Picks a random index from elements quantity range
            index = Math.floor(Math.random() * arrayElements);
            // Prevents endless cycle
            arrayElements--;
            // Swaps the elemnts
            temp = array[arrayElements];
            array[arrayElements] = array[index];
            array[index] = temp;
        }
        return array;
    }
    
    function gridBuild(array) { //Building an HTML card grid
        array.forEach(function(element) {
            let newWrapElement = document.createElement('div');
            newWrapElement.classList.add('cardContainer');
            let card = document.createElement('div');
            card.classList.add('card');
            let newImage = document.createElement('img');
            newImage.classList.add("cardImage");
            newImage.setAttribute("data-type", element);
            newImage.draggable = false; // To prevent from cheating as 0 opacity gets visible after draggin the object
            let sourceImage = "images/" + element +'.svg'; //Pasting the element name as an image name, because they are named same in the cards array
            newImage.src = sourceImage;
            newWrapElement.appendChild(card);
            card.appendChild(newImage);
            mainGrid.appendChild(newWrapElement);
        });
    }
    
    function gridRemove() { //Clean up the grid to build a new grid
        mainGrid.innerHTML = "";
    }
    
    function openCard(card) { //Animation when card is opened
        card.classList.add('cardImageAppear');
    }
    
    function hideCard(card) { //Animation when card didn't match with the first one
        card.classList.remove('cardImageAppear');
    }

    function setCardPairedStatus(card) { //When both cards matched
        card.setAttribute('data-status', "revealed");
        revealedCards += 1;
        return revealedCards;
    }

    function movesCountAdded() { 
        movesCount += 1;
    }
    
    function movesFieldsUpdated() { //Moves to appear on the page
        movesFields.forEach(function (movesField) {
            movesField.innerHTML = movesCount;
        });
    }
    
    function movesCountReset() {
        movesFields.forEach(function (movesField) {
            movesField.innerHTML = 0;
        });
        movesCount = 0;
    }
    
    function resetTimer() {
        timer = 0;
        timerFields.forEach(function(field){
            field.innerHTML = timer;
        });
    }

    function starRatingCount() {
        if (movesCount > 18) { //when user reached 19 moves 1 star will be left
            starsContainers.forEach(function(container) {
                container.setAttribute('class', 'starsContainer oneStar');
            });
        } else if (movesCount > 13) { //when user reached 14 moves 2 stars will be left
            starsContainers.forEach(function(container) {
                container.setAttribute('class', 'starsContainer twoStars');
            });
        }
    }
    
    function starRatingCountReset() {
        starsContainers.forEach(function(container) {
            container.setAttribute('class', 'starsContainer threeStars');
        });
    }

    function overallReset() { //Includes all reset functions
        isCardCheckingState = false;
        isGameStarted = false;
        gridRemove();
        clearInterval(timerInAction);
        movesCountReset();
        starRatingCountReset();
        resetTimer();
    }
    
    function gameStatusCheck() { //Checks if the game has ended when user opened all 16 cards
        if (randomGrid.length == revealedCards) {
            revealedCards = 0;
            modalToAppear();
            clearInterval(timerInAction);
        }
    }

    function modalToAppear() { //Pop up window to show up when the game ended after 1.5 seconds
        setTimeout(function() {
            document.body.classList.add('modalOpened');
            let modalWindow = document.querySelector('.modalWindow');
            modalWindow.classList.add('modalWindowShow');
        }, 1500);
    }

    function modalDisappear() { //Hide pop up to start a new game
        document.body.classList.remove('modalOpened');
        let modalWindow = document.querySelector('.modalWindow');
        modalWindow.classList.remove('modalWindowShow');
    }


    mainGrid.addEventListener('click', function(event){
        if (isControlBlocked) return; //No clicks when cards are in hidding process
        let target = event.target.closest('img'); //Only images are clickable on the grid
        if (!target) return; //Only images are clickable on the grid
        if (isGameStarted == false) { //When first click is done timer starts to count
            timerInAction = setInterval (function timerCount() {
                timer += 1;
                timerFields.forEach(function(field){
                    field.innerHTML = timer;
                });
            }, 1000);
            isGameStarted = true; 
        }
        if (target.dataset.status == "revealed") return; //Prevent clicks on already opened cards
        openCard(target);//Animation for the hidden card which was clicked
        if (isCardCheckingState == true) { //Clicking second card when the first is opened
            if (savedCard == target) return; //Cannot click on the same just clicked card
            if (savedCard.dataset.type == target.dataset.type) { //If same card type is clicked, they will be locked on the grid and remain opened
                setCardPairedStatus(target);
                setCardPairedStatus(savedCard);
                gameStatusCheck();
            } else {
                isControlBlocked = true; //When cards are hidding, no cards can be clicked for CARD_HIDE_TIME
                setTimeout(function () {
                    hideCard(savedCard);
                    hideCard(target);
                    isControlBlocked = false;
                }, CARD_HIDE_TIME);
            }
            isCardCheckingState = false; //Checked the cards pair, the next click with open the first card of possible matching/non-matching pair
            movesCountAdded();
            movesFieldsUpdated();
            starRatingCount();      
        } else {
            isCardCheckingState = true; //First card of the possible pair is clicked
            savedCard = target;
        }
    });

    const check = document.getElementById('check'); //Made just for test purposes to finish the game right away 

    check.addEventListener("click", function() {
        revealedCards = 0;
        let images = mainGrid.querySelectorAll('img');
        images.forEach(function(element){
            revealedCards += 1;
            openCard(element);
            element.setAttribute('data-status', "revealed");
        });
        gameStatusCheck();
    });


    resetButton.addEventListener('click', function(){ //When New game button in the pop up is clicked to build a new random grid of 3 possible sets
        modalDisappear();
        overallReset();
        randomGrid = cardsList[Math.round(Math.random() * 2)];
        gridBuild(createRandomGrid(randomGrid));
    });

    randomSelection.addEventListener('click', function(){ //When Random game button is clicked to build a new random grid of 3 possible sets 
        overallReset();
        randomGrid = cardsList[Math.round(Math.random() * 2)];
        gridBuild(createRandomGrid(randomGrid));
    });

    emotionsSet.addEventListener('click', function() { //Emotions grid build when emotions button is clicked
        overallReset();
        randomGrid = cardsList[0];
        gridBuild(createRandomGrid(randomGrid));
    });
    
    foodDrinksSet.addEventListener('click', function() { //Food & Drinks grid build when Food & Drinks button is clicked
        overallReset();
        randomGrid = cardsList[1];
        gridBuild(createRandomGrid(randomGrid));
    });

    animalsSet.addEventListener('click', function() { //Animals grid build when Animals button is clicked
        overallReset();
        randomGrid = cardsList[2];
        gridBuild(createRandomGrid(randomGrid));
    });

    
});
