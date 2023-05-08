import LogIn from "./component/LogIn";
import "./App.css";
import { StoreContext } from "./StoreContext";
import store from "./store";

function App() {
  return (
    <StoreContext.Provider value={store}>
      <div className="App">
        <LogIn store={store}></LogIn>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
