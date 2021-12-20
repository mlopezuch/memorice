import "./App.css";
import SingleCard from "./SingleCard";

function App() {
  
  return (
    <div className="App">
      <div className="container">
        {
          Array(4).fill("").map(() => (
              <SingleCard 
                key={Math.random()}
                />
            )
          )
        }
      </div>
    </div>
  );
}

export default App;
