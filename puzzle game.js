const cardsContainer = document.getElementById("cards");
const movesDisplay = document.getElementById("moves");
const pairsDisplay = document.getElementById("pairs");
const restartButton = document.getElementById("restart");
const message = document.getElementById("message");

const symbols = [
    "🍎", "🍎",
    "🚀", "🚀",
    "🐱", "🐱",
    "🌟", "🌟",
    "⚽", "⚽",
    "🍕", "🍕",
    "🎮", "🎮",
    "🌈", "🌈"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let pairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createGame() {

    cardsContainer.innerHTML = "";
    message.textContent = "";

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    pairs = 0;

    movesDisplay.textContent = moves;
    pairsDisplay.textContent = pairs;

    const shuffledSymbols = shuffle([...symbols]);

    shuffledSymbols.forEach(symbol => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${symbol}</div>
            </div>
        `;

        card.addEventListener("click", () => flipCard(card, symbol));

        cardsContainer.appendChild(card);
    });
}

function flipCard(card, symbol) {

    if (
        lockBoard ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
    ) {
        return;
    }

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = {
            element: card,
            symbol: symbol
        };

        return;
    }

    secondCard = {
        element: card,
        symbol: symbol
    };

    moves++;
    movesDisplay.textContent = moves;

    checkMatch();
}

function checkMatch() {

    if (firstCard.symbol === secondCard.symbol) {

        firstCard.element.classList.add("matched");
        secondCard.element.classList.add("matched");

        pairs++;
        pairsDisplay.textContent = pairs;

        resetCards();

        if (pairs === 8) {
            message.textContent =
                `🎉 You won in ${moves} moves!`;
        }

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.element.classList.remove("flipped");
            secondCard.element.classList.remove("flipped");

            resetCards();

        }, 900);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

restartButton.addEventListener("click", createGame);

createGame();