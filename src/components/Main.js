import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [cheese, setCheese] = useState(null);

  const URL = "https://dashboard.heroku.com/apps/cheese-app-lab-day-1/cheese/";

  const getCheese= async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCheese(data);
  };

  const createCheese = async cheese => {
    // make post request to create cheese
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese),
    });
    // update list of cheese
    getCheese();
  };

  // UPDATE FUNCTION
  const updateCheese = async (cheese, id) => {
    // make post request to create people
    await fetch(URL + id, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cheese),
    })
    // update list of people
    getCheese()
}


  // DELETE FUNCTION
  const deleteCheese = async id => {
    // make post request to create people
    await fetch(URL + id, {
        method: "delete",
    })
  }

  useEffect(() => getCheese(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index cheese={cheese} createCheese={createCheese} />
        </Route>
        <Route
          path="/cheese/:id"
          render={(rp) => (
            <Show
            cheese={cheese}
            updateCheese={updateCheese}
            deleteCheese={deleteCheese}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;