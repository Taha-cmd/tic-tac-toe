restart.addEventListener("click", () => end());

sizeSelectors.forEach((selector) => {
	selector.addEventListener('click', (e) => {
		size = parseInt(e.target.attributes.value.value, 10);
		start();
	});
});

function handleClick(e) {
	const cell = e.target;

	if (isFlipped(cell)) return;
	cell.innerText = symbol;
	flipSymbol();

	const winnerLine = playerWon(cell);

	if (typeof winnerLine == "object") {
		animateWinnerLine(winnerLine);
		setTimeout(() => end(), 1000);
		return;
	}

	if (isDraw()) {
		setTimeout(() => {
			alert("No winner");
			end();
		}, 300);
	}
}
