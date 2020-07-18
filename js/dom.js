const restart = document.querySelector("#restart");
const restartContainer = document.getElementById('restart-container')
const grid = document.querySelector('#box');
const sizeSelectorsContainer = document.getElementById('size-selectors-container');
const sizeSelectors = Array.from(document.querySelectorAll('.size-selector'));

let symbol = "X";
let cells;

function flipSymbol() {
	symbol = symbol == "X" ? "O" : "X";
	document.querySelector("#current-symbol").innerText = symbol;
}

function isFlipped(cell) {
	return cell.innerText != "";
}

function start(size) {
	hideUsingBootstrapClasses(sizeSelectorsContainer);
	showUsingBootstrapClasses(restartContainer);
	makeGrid(size);
	cells = Array.from(document.querySelectorAll('.cell'));
	cells.forEach((cell) => cell.addEventListener("click", handleClick));
	if (symbol == "O") flipSymbol();
	
}

function end(){
	showUsingBootstrapClasses(sizeSelectorsContainer);
	hideUsingBootstrapClasses(restartContainer);
	deleteGrid();
}

function makeGrid(size){
	const col = 12 / size;  // 12 for using bootstrap grid

	let div;
	for(var i = 1; i <= size ** 2; i++){
		div = document.createElement('div');
		div.setAttribute('class', 
			`d-flex justify-content-center align-items-center col-${col} cell`
		);
		div.setAttribute('id', `cell${i}`);
		grid.append(div);
	}

}

function deleteGrid(){
	if(!Boolean(cells)) return;
	cells.forEach(cell => cell.remove());
}

function hideUsingBootstrapClasses(el){
	el.classList.add('d-none');
	el.classList.remove('d-flex');
}

function showUsingBootstrapClasses(el){
	el.classList.add('d-flex');
	el.classList.remove('d-none');	
}

function animateWinnerLine(line) {
	line.forEach((el) =>
		document.querySelector(`#cell${el.idx}`).classList.add("winner")
	);
}