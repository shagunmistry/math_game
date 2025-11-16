'use client'

import { useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
  TrophyIcon,
  ArrowPathIcon,
  LightBulbIcon,
  ChartBarIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon as MultiplyIcon,
  SparklesIcon,
  FireIcon,
  StarIcon,
} from '@heroicons/react/24/outline'

type Operation = '+' | '-' | '*' | '/'
type Move = {
  fromNumber: number
  operation: Operation
  operand: number
  toNumber: number
  distance: number
}

type OperationHint = {
  operation: Operation
  operand: number
  result: number
  works: boolean
}

const encouragementMessages = [
  "You're doing great! Keep going!",
  "Awesome try! You can do it!",
  "Super job! Try another number!",
  "You're a math star!",
  "Keep it up, champion!",
  "That's the spirit!",
  "You're so close!",
  "Amazing effort!",
]

const winMessages = [
  "YOU'RE A MATH WIZARD!",
  "INCREDIBLE! YOU DID IT!",
  "WOW! YOU'RE AMAZING!",
  "SUPER STAR MATHEMATICIAN!",
  "FANTASTIC JOB, CHAMP!",
  "YOU'RE BRILLIANT!",
]

export default function Home() {
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const [currentNumber, setCurrentNumber] = useState<number>(0)
  const [startNumber, setStartNumber] = useState<number>(0)
  const [moveHistory, setMoveHistory] = useState<Move[]>([])
  const [gameWon, setGameWon] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [operationHints, setOperationHints] = useState<OperationHint[]>([])
  const [selectedOperation, setSelectedOperation] = useState<Operation>('+')
  const [operand, setOperand] = useState<string>('')
  const [gameStarted, setGameStarted] = useState(false)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [encouragement, setEncouragement] = useState<string>('')
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [stars, setStars] = useState(0)

  // Initialize game
  const initGame = () => {
    let target: number
    let start: number

    switch (difficulty) {
      case 'easy':
        target = Math.floor(Math.random() * 30) + 10 // 10-40
        start = Math.floor(Math.random() * 15) + 1 // 1-15
        break
      case 'medium':
        target = Math.floor(Math.random() * 70) + 20 // 20-90
        start = Math.floor(Math.random() * 25) + 1 // 1-25
        break
      case 'hard':
        target = Math.floor(Math.random() * 150) + 50 // 50-200
        start = Math.floor(Math.random() * 40) + 1 // 1-40
        break
    }

    setTargetNumber(target)
    setStartNumber(start)
    setCurrentNumber(start)
    setMoveHistory([])
    setGameWon(false)
    setOperand('')
    setGameStarted(true)
    setShowHints(false)
    setShowEncouragement(false)
    setStars(0)
  }

  // Calculate hints for current position
  useEffect(() => {
    if (!gameStarted || gameWon) return

    const hints: OperationHint[] = []
    const operations: Operation[] = ['+', '-', '*', '/']

    // Test various operands for each operation
    const testOperands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 50]

    operations.forEach(op => {
      testOperands.forEach(operandValue => {
        let result: number

        switch (op) {
          case '+':
            result = currentNumber + operandValue
            break
          case '-':
            result = currentNumber - operandValue
            break
          case '*':
            result = currentNumber * operandValue
            break
          case '/':
            result = currentNumber / operandValue
            break
        }

        // Only include if result is positive and reasonable
        if (result > 0 && result <= 1000 && Number.isFinite(result)) {
          const currentDistance = Math.abs(currentNumber - targetNumber)
          const newDistance = Math.abs(result - targetNumber)
          const works = result === targetNumber || newDistance < currentDistance

          hints.push({
            operation: op,
            operand: operandValue,
            result,
            works
          })
        }
      })
    })

    setOperationHints(hints)
  }, [currentNumber, targetNumber, gameStarted, gameWon])

  // Apply operation
  const applyOperation = () => {
    const operandNum = parseFloat(operand)

    if (isNaN(operandNum) || operandNum <= 0) {
      setEncouragement("Oops! Please enter a positive number!")
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 2000)
      return
    }

    let result: number

    switch (selectedOperation) {
      case '+':
        result = currentNumber + operandNum
        break
      case '-':
        result = currentNumber - operandNum
        break
      case '*':
        result = currentNumber * operandNum
        break
      case '/':
        result = currentNumber / operandNum
        break
    }

    // Round to 2 decimal places
    result = Math.round(result * 100) / 100

    if (result <= 0) {
      setEncouragement("Try a different number! Keep it positive!")
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 2000)
      return
    }

    const distance = Math.abs(result - targetNumber)
    const previousDistance = Math.abs(currentNumber - targetNumber)

    setMoveHistory([
      ...moveHistory,
      {
        fromNumber: currentNumber,
        operation: selectedOperation,
        operand: operandNum,
        toNumber: result,
        distance
      }
    ])

    setCurrentNumber(result)
    setOperand('')

    if (result === targetNumber) {
      setGameWon(true)
      // Award stars based on number of moves
      const moveCount = moveHistory.length + 1
      if (moveCount === 1) setStars(3)
      else if (moveCount <= 3) setStars(2)
      else setStars(1)
    } else {
      // Show encouragement
      if (distance < previousDistance) {
        setEncouragement(encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)])
      } else {
        setEncouragement("Try a different operation!")
      }
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 2000)
    }
  }

  // Get working operations summary
  const getWorkingOperations = (): string[] => {
    const working = new Set<string>()

    operationHints.forEach(hint => {
      if (hint.works) {
        working.add(hint.operation)
      }
    })

    return Array.from(working)
  }

  const workingOps = getWorkingOperations()

  if (!gameStarted) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="card max-w-2xl w-full text-center space-y-8 animate-bounce-in">
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300">
              <SparklesIcon className="w-20 h-20 text-white" />
            </div>
          </div>

          <div>
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4 animate-wiggle">
              Math Number Quest!
            </h1>
            <p className="text-2xl text-purple-700 font-bold">
              Can you reach the magic number?
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg font-bold text-purple-600">Pick Your Level:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setDifficulty('easy')}
                className={`py-6 px-6 rounded-3xl font-black text-xl transition-all duration-300 transform hover:scale-110 shadow-xl ${
                  difficulty === 'easy'
                    ? 'bg-gradient-to-r from-green-400 to-green-600 text-white scale-110 border-4 border-yellow-300'
                    : 'bg-white text-green-600 border-4 border-green-300 hover:bg-green-50'
                }`}
              >
                <div className="text-3xl mb-2">🌟</div>
                Easy Peasy
              </button>
              <button
                onClick={() => setDifficulty('medium')}
                className={`py-6 px-6 rounded-3xl font-black text-xl transition-all duration-300 transform hover:scale-110 shadow-xl ${
                  difficulty === 'medium'
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white scale-110 border-4 border-red-300'
                    : 'bg-white text-orange-600 border-4 border-orange-300 hover:bg-orange-50'
                }`}
              >
                <div className="text-3xl mb-2">⭐⭐</div>
                Super Fun
              </button>
              <button
                onClick={() => setDifficulty('hard')}
                className={`py-6 px-6 rounded-3xl font-black text-xl transition-all duration-300 transform hover:scale-110 shadow-xl ${
                  difficulty === 'hard'
                    ? 'bg-gradient-to-r from-red-500 to-purple-600 text-white scale-110 border-4 border-pink-300'
                    : 'bg-white text-red-600 border-4 border-red-300 hover:bg-red-50'
                }`}
              >
                <div className="text-3xl mb-2">🔥🔥🔥</div>
                Brain Power
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-blue-300 rounded-3xl p-6 text-left space-y-3">
            <p className="text-xl text-blue-900 font-black flex items-center gap-2">
              <LightBulbIcon className="w-6 h-6" />
              How to Play:
            </p>
            <ul className="text-lg text-blue-800 space-y-2 font-bold">
              <li className="flex items-start">
                <span className="text-2xl mr-2">➕</span>
                <span>Use +, -, ×, ÷ to reach the target number!</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-2">🎯</span>
                <span>Get helpful hints along the way</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-2">⭐</span>
                <span>Finish in fewer moves to earn more stars!</span>
              </li>
            </ul>
          </div>

          <button
            onClick={initGame}
            className="btn-primary w-full text-2xl py-6 sparkle-btn font-black"
          >
            🚀 START ADVENTURE! 🚀
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-bounce-in">
          <div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Math Quest! 🎮
            </h1>
            <p className="text-xl text-purple-700 font-bold mt-2">
              Reach the magic number!
            </p>
          </div>
          <button onClick={initGame} className="btn-secondary flex items-center gap-2 text-xl">
            <ArrowPathIcon className="w-6 h-6" />
            New Game
          </button>
        </div>

        {/* Encouragement Message */}
        {showEncouragement && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-8 py-4 rounded-full font-black text-2xl shadow-2xl border-4 border-white">
              {encouragement}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status */}
            <div className="card animate-bounce-in">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-200 to-blue-400 rounded-3xl transform hover:scale-105 transition-transform shadow-xl">
                  <p className="text-xl text-blue-900 mb-3 font-black">Your Number</p>
                  <p className="text-7xl font-black text-white drop-shadow-lg">
                    {currentNumber}
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-200 to-purple-500 rounded-3xl transform hover:scale-105 transition-transform shadow-xl">
                  <p className="text-xl text-purple-900 mb-3 font-black">Target Number</p>
                  <p className="text-7xl font-black text-white drop-shadow-lg">
                    {targetNumber}
                  </p>
                </div>
              </div>

              {/* Feedback */}
              <div className="mt-6 p-6 rounded-3xl text-center font-black text-2xl shadow-inner">
                {currentNumber === targetNumber ? (
                  <div className="text-green-600 flex items-center justify-center gap-3 animate-wiggle">
                    <TrophyIcon className="w-10 h-10" />
                    <span className="text-4xl">YOU WON! 🎉</span>
                    <TrophyIcon className="w-10 h-10" />
                  </div>
                ) : currentNumber < targetNumber ? (
                  <div className="text-orange-600 bg-orange-100 py-4 rounded-2xl border-4 border-orange-300">
                    <span className="text-3xl mr-3">⬆️</span>
                    Go Higher!
                    <span className="text-3xl ml-3">⬆️</span>
                  </div>
                ) : (
                  <div className="text-red-600 bg-red-100 py-4 rounded-2xl border-4 border-red-300">
                    <span className="text-3xl mr-3">⬇️</span>
                    Go Lower!
                    <span className="text-3xl ml-3">⬇️</span>
                  </div>
                )}
              </div>

              {/* Working Operations Indicator */}
              {!gameWon && workingOps.length > 0 && (
                <div className="mt-6 p-5 bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-300 rounded-3xl">
                  <p className="text-xl font-black text-green-800 mb-3 flex items-center gap-2">
                    <FireIcon className="w-6 h-6" />
                    These can help you:
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {workingOps.map(op => (
                      <span
                        key={op}
                        className="px-6 py-3 bg-green-400 text-white rounded-full text-2xl font-black shadow-lg transform hover:scale-110 transition-transform"
                      >
                        {op}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Operation Input */}
            {!gameWon && (
              <div className="card">
                <h3 className="text-3xl font-black text-purple-700 mb-6 flex items-center gap-3">
                  <SparklesIcon className="w-8 h-8" />
                  Make Your Move!
                </h3>

                {/* Operation Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <button
                    onClick={() => setSelectedOperation('+')}
                    className={`operation-btn ${
                      selectedOperation === '+'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white border-4 border-yellow-300'
                        : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-4 border-blue-300 hover:from-blue-200 hover:to-blue-300'
                    }`}
                  >
                    <PlusIcon className="w-8 h-8" />
                    <span className="text-2xl">Add</span>
                  </button>
                  <button
                    onClick={() => setSelectedOperation('-')}
                    className={`operation-btn ${
                      selectedOperation === '-'
                        ? 'bg-gradient-to-r from-red-400 to-red-600 text-white border-4 border-yellow-300'
                        : 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border-4 border-red-300 hover:from-red-200 hover:to-red-300'
                    }`}
                  >
                    <MinusIcon className="w-8 h-8" />
                    <span className="text-2xl">Subtract</span>
                  </button>
                  <button
                    onClick={() => setSelectedOperation('*')}
                    className={`operation-btn ${
                      selectedOperation === '*'
                        ? 'bg-gradient-to-r from-green-400 to-green-600 text-white border-4 border-yellow-300'
                        : 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-4 border-green-300 hover:from-green-200 hover:to-green-300'
                    }`}
                  >
                    <MultiplyIcon className="w-8 h-8" />
                    <span className="text-2xl">Multiply</span>
                  </button>
                  <button
                    onClick={() => setSelectedOperation('/')}
                    className={`operation-btn ${
                      selectedOperation === '/'
                        ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white border-4 border-yellow-300'
                        : 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border-4 border-purple-300 hover:from-purple-200 hover:to-purple-300'
                    }`}
                  >
                    <span className="text-4xl font-black">÷</span>
                    <span className="text-2xl">Divide</span>
                  </button>
                </div>

                {/* Operand Input */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={operand}
                      onChange={(e) => setOperand(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && applyOperation()}
                      placeholder="Type a number..."
                      className="flex-1 px-6 py-5 border-4 border-purple-300 rounded-2xl focus:border-blue-500 focus:outline-none text-2xl font-bold bg-purple-50 focus:bg-white transition-colors"
                      step="any"
                      min="0"
                    />
                    <button
                      onClick={applyOperation}
                      disabled={!operand}
                      className="btn-primary px-12 text-2xl disabled:opacity-50 disabled:cursor-not-allowed sparkle-btn"
                    >
                      GO! 🚀
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowHints(!showHints)}
                  className="mt-6 btn-secondary w-full flex items-center justify-center gap-3 text-xl"
                >
                  <LightBulbIcon className="w-7 h-7" />
                  {showHints ? 'Hide' : 'Show'} Magic Hints ✨
                </button>
              </div>
            )}

            {/* Hints Panel */}
            {showHints && !gameWon && (
              <div className="card">
                <h3 className="text-2xl font-black text-yellow-700 mb-6 flex items-center gap-3">
                  <LightBulbIcon className="w-8 h-8 text-yellow-500" />
                  Magic Hints ✨
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {operationHints
                    .filter(hint => hint.works)
                    .slice(0, 20)
                    .map((hint, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedOperation(hint.operation)
                          setOperand(hint.operand.toString())
                        }}
                        className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-300 rounded-2xl text-left hover:from-green-200 hover:to-emerald-200 transition-all transform hover:scale-105 shadow-lg"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xl text-green-800">
                            {currentNumber} {hint.operation} {hint.operand} = {hint.result}
                          </span>
                          {hint.result === targetNumber && (
                            <span className="text-sm bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-black border-2 border-yellow-600">
                              WINNER! 🎯
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Move History Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <h3 className="text-2xl font-black text-purple-700 mb-4 flex items-center gap-2">
                <ChartBarIcon className="w-7 h-7" />
                Your Moves ({moveHistory.length})
              </h3>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {moveHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-purple-500 text-xl font-bold">
                      No moves yet!
                    </p>
                    <p className="text-purple-400 text-lg mt-2">
                      Start playing! 🎮
                    </p>
                  </div>
                ) : (
                  moveHistory.map((move, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border-l-8 transform hover:scale-105 transition-transform ${
                        move.toNumber === targetNumber
                          ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-500 shadow-lg'
                          : move.distance < Math.abs(move.fromNumber - targetNumber)
                          ? 'bg-gradient-to-r from-blue-100 to-blue-200 border-blue-500'
                          : 'bg-gradient-to-r from-red-100 to-red-200 border-red-500'
                      }`}
                    >
                      <div className="text-sm text-gray-600 mb-1 font-bold">
                        Move {idx + 1}
                      </div>
                      <div className="font-black text-lg">
                        {move.fromNumber} {move.operation} {move.operand} = {move.toNumber}
                      </div>
                      {move.toNumber === targetNumber && (
                        <div className="text-green-600 font-black mt-2 text-lg">
                          🎯 PERFECT!
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Win Modal */}
      <Transition appear show={gameWon} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-50"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 p-8 text-left align-middle shadow-2xl transition-all border-8 border-yellow-400">
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-32 w-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-6 animate-bounce shadow-2xl border-8 border-white">
                      <TrophyIcon className="h-20 w-20 text-white" />
                    </div>

                    {/* Stars */}
                    <div className="flex justify-center gap-3 mb-4">
                      {[...Array(3)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-16 h-16 ${
                            i < stars
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          } animate-wiggle`}
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>

                    <Dialog.Title
                      as="h3"
                      className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4"
                    >
                      {winMessages[Math.floor(Math.random() * winMessages.length)]}
                    </Dialog.Title>

                    <div className="text-3xl mb-6">
                      🎉 🎊 🎈 ⭐ 🌟 ✨
                    </div>

                    <p className="text-purple-700 text-2xl font-bold mb-6">
                      You reached the target in{' '}
                      <span className="text-4xl font-black text-pink-600">{moveHistory.length}</span>{' '}
                      {moveHistory.length === 1 ? 'move' : 'moves'}!
                    </p>

                    <div className="bg-white rounded-3xl p-6 mb-8 border-4 border-purple-300 shadow-xl">
                      <p className="text-xl text-purple-600 mb-3 font-bold">Your Journey:</p>
                      <p className="font-black text-4xl text-purple-800">
                        {startNumber} ➡️ {targetNumber}
                      </p>
                    </div>

                    <button
                      onClick={initGame}
                      className="btn-primary w-full text-3xl py-6 sparkle-btn font-black"
                    >
                      🎮 PLAY AGAIN! 🎮
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  )
}
