const generateSeatLayout = (rows, columns) => {
  const seatLayout = [];

  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r); // A,B,C...

    for (let c = 1; c <= columns; c++) {
      seatLayout.push(`${rowLetter}${c}`);
    }
  }

  return seatLayout;
};

module.exports = { generateSeatLayout };
