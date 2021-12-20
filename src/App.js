import "./App.css";
import SingleCard from "./SingleCard";

function App() {

  const handleClick = () => {
    console.log("Hey!");
  }

  //console.log("aaaaaaa");

  return (
    <div className="App">
      <div className="container">
        {
          Array(4).fill("").map(() => (
              <SingleCard 
                key={Math.random()} 
                onClick={handleClick}
                />
            )
          )
        }
      </div>
    </div>
  );
}

export default App;
