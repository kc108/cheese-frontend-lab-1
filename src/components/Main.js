import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

  const [cheeses, setCheeses] = useState(null);

  const URL = "https://cheese-app-lab-day-1.herokuapp.com/cheese/";

  const getCheeses = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCheeses(data);
  };

  const createCheeses = async cheese => {
    // make post request to create cheese
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese),
    })
    // update list of cheese
    getCheeses();
  }

  // UPDATE FUNCTION
  const updateCheeses = async (cheese, id) => {
    // make post request to create people
    await fetch(URL + id, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cheese),
    })
    // update list of cheeses
    getCheeses()
}


  // DELETE FUNCTION
  const deleteCheeses = async id => {
    // make post request to create people
    await fetch(URL + id, {
        method: "delete",
    })
  }

  useEffect(() => getCheeses(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index cheeses={cheeses} createCheeses={createCheeses} />
        </Route>
        <Route
          path="/cheese/:id"
          render={(rp) => (
            <Show
            cheeses={cheeses}
            updateCheeses={updateCheeses}
            deleteCheeses={deleteCheeses}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;