import './App.css';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function App() {
  const [items, setItems] = useState({})
  const [buttonPressed, setButtonPressed] = useState(false)
  const entry = useRef();
  const status = useRef();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:3001/items/table")
        setItems(response.data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [buttonPressed])

  const handleClick = async (statusChange, id) => {
    try {
      const response = await axios.put(`http://localhost:3001/items/${id}`, {
        status: statusChange
      })

      if (response.status === 200) {
        setButtonPressed(!buttonPressed)
      } else {
        console.log('Something went wrong')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/items', {
        entry: entry.current.value,
        status: "TO-DO",
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div className="container">

        <div id="to-do" className="section">
          <h2>To-Do</h2>
          <div className="list">
            <div className="formContainer">
              <form className="form" onSubmit={handleSubmit}>
                <label>
                  Entry: <input type="text" ref={entry} />
                </label>
                <label>
                  Status:
                  <select>
                    <option value="to-do">To-Do</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
                <button className="submit" onSubmit={handleClick}>Add</button>
              </form>
            </div>
            {
              items["TO-DO"] ?
                items["TO-DO"].map((item, idx) => {
                  return (
                    <div className="item" key={idx}>
                      <Link to={`/${item._id}`}>{item.entry}</Link>
                      <div>
                        <button onClick={() => { handleClick("COMPLETED", item._id) }} className="button">Completed</button>
                      </div>
                    </div>
                  )
                })
                :
                ""
            }
            <h2>Completed</h2>
            {
              items["COMPLETED"] ?
                items["COMPLETED"].map((item, idx) => {
                  return (
                    <div className="item" key={idx}>
                      <Link to={`/${item._id}`}>{item.entry}</Link>
                      <div>
                        <button onClick={() => { handleClick("TO-DO", item._id) }} className="button">To-Do</button>

                      </div>
                    </div>
                  )
                })
                :
                ""
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;