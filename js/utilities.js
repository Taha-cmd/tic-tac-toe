 function playerWon(cell) {
	const id = cell.attributes.id.value;
	const idx = parseInt(id.match(/[0-9]+/)[0], 10);

	let row = [{ idx: idx, value: valueAtIdx(idx) }];
	let column = [{ idx: idx, value: valueAtIdx(idx) }];
	let diagonalLeft = [{ idx: idx, value: valueAtIdx(idx) }];
	let diagonalRight = [{ idx: idx, value: valueAtIdx(idx) }];

	for (var i = 1; i < size; i++) {
		row.push({
			idx: nextRowIdx(row[i - 1].idx),
			value: valueAtIdx(nextRowIdx(row[i - 1].idx)),
		});
		column.push({
			idx: nextColumnIdx(column[i - 1].idx),
			value: valueAtIdx(nextColumnIdx(column[i - 1].idx)),
		});
		diagonalLeft.push({
			idx: nextDiagonalIdxLeft(diagonalLeft[i - 1].idx),
			value: valueAtIdx(nextDiagonalIdxLeft(diagonalLeft[i - 1].idx)),
		});
		diagonalRight.push({
			idx: nextDiagonalIdxRight(diagonalRight[i - 1].idx),
			value: valueAtIdx(nextDiagonalIdxRight(diagonalRight[i - 1].idx)),
		});
	}

	if (allEqual(valueAtIdx(idx), row)) 			return row;
	if (allEqual(valueAtIdx(idx), column)) 			return column;
	if (allEqual(valueAtIdx(idx), diagonalLeft)) 	return diagonalLeft;
	if (allEqual(valueAtIdx(idx), diagonalRight)) 	return diagonalRight;

	return false;
}

function isDraw() {
	return cells.every((cell) => { return cell.innerText !== '' });
}

function valueAtIdx(idx) {
	if (idx == null) return null;
	return document.querySelector(`#cell${idx}`).innerText;
}

function nextRowIdx(idx) {
	if (idx % size == 0) return idx - (size - 1); // 3 => 1, 6 => 4, 9 => 7
	return idx + 1; // 1 => 2, 2 => 3, 4 => 5, 5 => 6, 7 => 8, 8 => 9
}

function nextColumnIdx(idx) {
	//if(idx <= 3 * 3 - 3 (6)) return idx + 3;
	if (idx <= size ** 2 - size) return idx + size;
	return idx - (size ** 2 - size);
}

function nextDiagonalIdxLeft(idx) {
	let newIdx = idx + size + 1; // 1 -> 5, 5 -> 9, 9 -> 13 -> 1

	if (newIdx % (size + 1) == 1) {
		if (newIdx > size ** 2) {
			newIdx = 1;
		}
		return newIdx;
	}
	return null;
}

function nextDiagonalIdxRight(idx) {
	if (idx == 1 || idx == size ** 2) return null; // first or last element
	let newIdx = idx + (size - 1);

	if (newIdx % (size - 1) == 1) {
		if (newIdx >= size ** 2) {
			newIdx = size;
		}
		return newIdx;
	}
	return null;
}

function allEqual(value, args) {
	if(args.some((arg) => {return arg.value === null || arg.value === ''})) return false;
	return args.every((arg) => {return arg.value === value});
}

