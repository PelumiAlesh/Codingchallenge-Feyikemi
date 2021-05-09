
// Question 1

/**
 * The approach to be used for solving this is thus.
 * Considerations:
 *  1. Since the tic tac toe game as a defined structure, we can manually create a static array 
 *     containing the number of step required to move by direction using a 1d array to connote the game
 *      * Moving Linearly horizontally involve moving 1 step
 *      * Moving Linearly vertically involve moving 3 steps
 *      * Moving diagonally to the right involve moving 4 steps
 *      * Moving diagonally to the left involve moving 2 steps
 *  2. For each step iteration, move through board positions and check the number of moves required to complete
 *  3. Return the move whose sequence requires the least number of movement (i.e 1,2,3)
 *  
 *  For example:
 *    input at point in time: ['O', 'O', null, 'X', 'X', 'O', null, 'X', null]
 *    Possible positions are 8, 6, 2 but 2 takes precedence inorder to block opponent's movement
 */

const TicTacToe = () => {
  const movingSteps = [1,2,3,4];
  const gameBoard = Array(9).fill(null);

  gameBoard[4] = 'X' // first play by the bot

  const getPossibleBlocks = (pathSequence) => {

    return {
      botPossibleBlocks: pathSequence.filter(([_, b]) => b !== 'X' && b !== undefined),
      opponentPossibleBlocks: pathSequence.filter(([_, b]) => b != 'O' && b !== undefined)
    }
  }

  const getPlayLocation = () => {
    let fallbackPlay = null;

    for (const step of movingSteps) {
      for (const i in gameBoard) {
        const board = gameBoard[i]
        
        const secondStep = Number(i) + step
        const thirdStep = secondStep + step

        const secondBlock = gameBoard[secondStep];
        const thirdBlock = gameBoard[thirdStep]

        if (secondBlock === undefined) continue;

        const { botPossibleBlocks, opponentPossibleBlocks } = getPossibleBlocks([[i, board], [secondStep, secondBlock], [thirdStep, thirdBlock]])

        if (botPossibleBlocks.length === 1 && opponentPossibleBlocks[0][1] == null){
          return botPossibleBlocks[0][0]
        } else if (opponentPossibleBlocks.length === 1 && opponentPossibleBlocks[0][1] == null){
          return opponentPossibleBlocks[0][0]
        }
        
        const emptyPossibleBlocks = botPossibleBlocks.filter(([, b]) => b === null)[0] || opponentPossibleBlocks.filter(([, b]) => b === null)[0]

        fallbackPlay = emptyPossibleBlocks && emptyPossibleBlocks[0]
      }
    }

    return fallbackPlay
  } 

  const botPlay = () => {
    const play = getPlayLocation()

    if (play) gameBoard[play] = 'X'
  }

  return (position) => {
    const location = position - 1 // convert to zero index

    if (gameBoard[location] !== null) {
      // handles case if the user tries playing a non empty cell
      console.log("Position not empty, try another position")
      return
    }

    gameBoard[location] = 'O'

    botPlay()
  }
}

const play = TicTacToe()

play(9)
play(1)
play(3)

// Question 2
/**
 * Since the order in which the number are choosen is not specified, 
 * the posisible values of the last final number is the sum of all the series with the sum of the products
 * For example, for series a, b, c, d, e, the final number would be SUM(a,b,c...e) + PRODUCT(a,b,c...e)
 * 
 * Solution to the above is highlighted as follows
 * 1. Determine the number of items(n) in the series
 * 2. Determine the common ratio in the series
 * 3. Using formular (a(1 – r^n)/(1 – r)) for the sum of geometric series, determine the sum of the series, let the result be 
 * 4. using the formular (SQRT((a1 * an) ^ n)) for the product of a geometric series, determine the product of the series
 * 5. The sum of the Product and sum of the series would be the final number
 */
 

