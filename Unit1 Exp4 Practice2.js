// Import Express module
const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store playing cards
let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" },
  { id: 3, suit: "Diamonds", value: "Queen" }
];

app.get("/cards", (req, res) => {
  res.status(200).json(cards);
});

app.get("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const card = cards.find(c => c.id === id);

  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  res.status(200).json(card);
});

app.post("/cards", (req, res) => {
  const { suit, value } = req.body;

  // Validation check
  if (!suit || !value) {
    return res.status(400).json({ message: "Both suit and value are required" });
  }

  // Create a new card object
  const newCard = {
    id: cards.length > 0 ? cards[cards.length - 1].id + 1 : 1,
    suit,
    value
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

app.delete("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Card not found" });
  }

  const deletedCard = cards.splice(index, 1)[0];
  res.status(200).json({
    message: `Card with ID ${id} removed`,
    card: deletedCard
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Playing Card Collection API!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

