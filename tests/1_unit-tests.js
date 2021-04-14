const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver  = new Solver();

let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

suite('UnitTests', () => {
  suite('Solver tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', (done) => {
      let solvedPuzzle = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      assert.equal(solver.solve(validPuzzle), solvedPuzzle);
      done();
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', (done) => {
      let invalidPuzzle = '1.5..2.84..63.12.7.2..5g....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.solve(invalidPuzzle), false);
      done();
    });

    test('Logic handles a puzzle string that is not 81 characters in length', (done) => {
      let invalidPuzzle = '1.5..2.84..63.12.7.2..5..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.solve(invalidPuzzle), false);
      done();
    });

    test('Logic handles a valid row placement', (done) => {
      assert.equal(solver.checkRowPlacement(validPuzzle, 'A', '2', 9), true);
      done();
    });

    test('Logic handles an invalid row placement', (done) => {
      assert.equal(solver.checkRowPlacement(validPuzzle, 'A', '2', 1), false);
      done();
    });

    test('Logic handles a valid column placement', (done) => {
      assert.equal(solver.checkColPlacement(validPuzzle, 'A', '2', 8), true);
      done();
    });

    test('Logic handles an invalid column placement', (done) => {
      assert.equal(solver.checkColPlacement(validPuzzle, 'A', '2', 9), false);
      done();
    });

    test('Logic handles a valid region (3x3 grid) placement', (done) => {
      assert.equal(solver.checkRegionPlacement(validPuzzle, 'A', '2', 3), true);
      done();
    });

    test('Logic handles an invalid region (3x3 grid) placement', (done) => {
      assert.equal(solver.checkRegionPlacement(validPuzzle, 'A', '2', 1), false);
      done();
    });

    test('Valid puzzle strings fail the solver', (done) => {
      assert.equal(solver.solve(validPuzzle), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
      done();
    });

    test('Invalid puzzle strings fail the solver', (done) => {
      let invalidPuzzle = '11.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.solve(invalidPuzzle), false);
      done();
    });

    test('Solver returns the the expected solution for an incomplete puzzle', (done) => {
      assert.equal(solver.solve('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'), '568913724342687519197254386685479231219538467734162895926345178473891652851726943');
      done();
    });
  });
});
