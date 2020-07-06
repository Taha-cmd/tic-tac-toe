restart.addEventListener("click", (e) => {
	cells.forEach((cell) => (cell.innerText = ""));
	if (symbol == "O") flipSymbol();
});

cells.forEach((cell) => cell.addEventListener("click", handleClick));

function handleClick(e) {
	const cell = e.target;

	if (isFlipped(cell)) return;
	cell.innerText = symbol;
	flipSymbol();

	const winnerLine = playerWon(cell);

	if (typeof winnerLine == "object") {
		animateWinnerLine(winnerLine);
		setTimeout(() => reset(), 1000);
		return;
	}

	if (noWinner()) {
		setTimeout(() => {
			alert("No winner");
			reset();
		}, 300);
	}
}
