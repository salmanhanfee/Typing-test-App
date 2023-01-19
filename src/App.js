// The highest typing speed ever recorded was 216 words per minute (wpm), set by Stella Pajunas in 1946, using an IBM electric typewriter. Currently, the fastest English language typist is Barbara Blackburn, who reached a peak typing speed of 212 wpm during a test in 2005, using a Dvorak simplified keyboard.
import {useState, useEffect} from 'react'
import randomWords from 'random-words'
const NUMB_OF_WORDS = 200
const SECONDS = 60

function App() {
  const [words, setWords] = useState([])
  const [countDown, setCountDown] = useState(SECONDS)
  const [currInput, setCurrInput] = useState("")
  const [currentWordIndex, setCurrWordIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setInCorrect] = useState(0)
  const [status, setStatus] = useState("waiting")
  useEffect(() => {
    setWords(generateWords())
  },[])
  
  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords())
  }

  function start() {
    let interval = setInterval(() => {
      setCountDown((prevCountdown) => {
        if(prevCountdown == 0) {
          clearInterval(interval)
        }
        else {
          return prevCountdown - 1
        }
      } )
    } , 1000 )
  }

  function handleKeyDown({keyCode}) {
    //SPAcE BAR = 32 
    if(keyCode == 32) {
      checkMatch()
      setCurrInput("")
      setCurrWordIndex(currentWordIndex + 1)

    }    
  }

  function checkMatch() {
    const wordToCompare = words[currentWordIndex]
    const doesItMatch = wordToCompare ==  currInput.trim()
    if(doesItMatch) {
      setCorrect(correct + 1)
    }
    else {
      setInCorrect(incorrect +1)
    }
  }

  return (
  <div className="App">
  <div className="section">
    <div className="is-size-1 has-text-centered has-text-primary">
      <h2>{countDown}</h2>
    </div>
  </div>
  <div className="control is-expanded section">
    <input disabled ={status !== "started"} type="text" className="input" onKeyDown={handleKeyDown} value ={currInput} onChange= {(e) => setCurrInput(e.target.value)}/>
  </div>
   
    <div className="secton">
    <button className="button is-info is-fullwidth" onClick={start}>
      Start
    </button>
      <div className="card">
        <div className="card-content">
          <div className="content">
            {words.map((word, i ) => (
              <span key ={i}>
              <span>
              {word.split("").map((char,idx) => (
                <span key = {idx}>{char}</span>
              ))}
              </span>
              <span> </span>
              </span> 
              
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="section">
      <div className="columns has text-centered">
        <div className="column">
          <p className="is-size-5">
            Words per minute:
          </p>
          <p className="has-text-primary is-size-1">
            {correct}
          </p>
        </div>
        <div className="column has text-centered">
          <div className="is-size-5">
            Accuracy :
          </div>
          <p className="has-text-info is-size-1">
           { Math.round((correct / (correct + incorrect))* 100)} %
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
