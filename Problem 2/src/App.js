import axios from "axios";
import { useState } from "react";
import "./App.css";

// Generate random number between 1-10
// Confirm if that number is still in the acceptedRandomValues array
// If it is, Get object based on random number and pop that number from the array
// If it is not, generate new random number and repeat
// If the array is empty, stop the loop and mention all random numbers between 1-10 have been used

function App() {
  const [acceptedRandomValues, setAcceptedRandomValues] = useState(
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
  const randomIntFromInterval = (
    min = Math.min(...acceptedRandomValues),
    max = Math.max(...acceptedRandomValues)
  ) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [listOfPeople, setListOfPeople] = useState([]);

  const [message, setMessage] = useState("");

  const addRecord = () => {
    let random = randomIntFromInterval();

    if (
      acceptedRandomValues.includes(random) &&
      acceptedRandomValues.length > 0
    ) {
      setAcceptedRandomValues(
        acceptedRandomValues.filter((value) => value !== random)
      );
      axios.get(`https://swapi.dev/api/people/${random}`).then((res) => {
        setListOfPeople([...listOfPeople, res.data]);
      });
    } else if (acceptedRandomValues.length === 0) {
      setMessage("All random numbers between 1-10 have been used");
    } else {
      addRecord();
    }
  };

  return (
    <div className="App form">
      <p
        style={{
          color: "red",
        }}
      >
        {message}
      </p>
      <button className="btn" onClick={addRecord}>
        Add Record{" "}
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <div className="tbody">
          <tbody>
            {listOfPeople.map((person, index) => (
              <tr key={index}>
                <td className="table-name">{person.name}</td>
                <td>
                  <span className="table-btn">
                    <button
                      className="btn"
                      onClick={() => {
                        setListOfPeople(
                          listOfPeople.filter(
                            (item) => item.name !== person.name
                          )
                        );
                      }}
                    >
                      Delete
                    </button>{" "}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </table>
    </div>
  );
}

export default App;
