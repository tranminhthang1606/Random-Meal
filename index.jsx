const { useEffect, useState,useRef } = React;

const app = document.getElementById("app");

const RandomAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';
const searchAPI = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const Meal = ({food}) => {
  
  return (
    <div>
      <h1>{food.strMeal}</h1>
      <img src={food.strMealThumb} />

      <p>{food.strInstructions}</p>
    </div>
  );
};

const App = () => {
  const [keyinput, setKeyinput] = React.useState("");
  const [food, setFood] = React.useState("");

  

  const RandomMeal = () => {
    fetch(RandomAPI)
      .then((res) => res.json())
      .then((food) => {
        setFood(food.meals[0]);
      });
  };

  useEffect(() => {
    RandomMeal();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (keyinput != "") {
      fetch(searchAPI + keyinput, { signal: controller.signal })
        .then((res) => res.json())
        .then(
          (food) => {
            setFood(food.meals[0]);
          },
          [keyinput]
        );
    }

    return () => {
      controller.abort();
    };
  });

  return (
    <div className="container">
      <h1>Food Menu</h1>

      <div>
        <input
          type="text"
          value={keyinput}
          onChange={(e) => setKeyinput(e.target.value.trim())}
        />
      </div>

      <button>Search</button>

      <button onClick={RandomMeal}>Random</button>

      <div className="main-content">
        <Meal food={food} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, app);
