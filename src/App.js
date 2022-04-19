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
        const response = await axios.get("https://damon-to-do-list.herokuapp.com/items/table")
        setItems(response.data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [buttonPressed])

  const handleClick = async (statusChange, id) => {
    try {
      const response = await axios.put(`https://damon-to-do-list.herokuapp.com/items/${id}`, {
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
      const response = await axios.post('https://damon-to-do-list.herokuapp.com/items', {
        entry: entry.current.value,
        status: "TO-DO",
      });

    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://damon-to-do-list.herokuapp.com/items/${id}`)
      if (response.status === 200) {
        setButtonPressed(!buttonPressed)
      } else {
        console.log("Delete function not working.")
      }
    } catch (err) {
      console.log(err)
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
                        <button onClick={() => { handleDelete(item._id) }} className="button">Delete</button>
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
                        <button onClick={() => { handleDelete(item._id) }} className="button">Delete</button>
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