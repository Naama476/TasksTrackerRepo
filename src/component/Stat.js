import { useContext } from "react";
import { StoreContext } from "../StoreContext";
import { observer } from "mobx-react";

const Stat = () => {
  let store = useContext(StoreContext);
  // let open = () => (store.getUsersTasks.length-store.getCompletedCount )
  return (
    <div>
      <h3>Stat</h3>
      <h4>Total completed: {store.getCompletedCount}</h4>
      <h4>Total Tasks: {store.getUsersTasks.length}</h4>
      <h4>
        Open Tasks: {store.getUsersTasks.length - store.getCompletedCount}
      </h4>
    </div>
  );
};

export default observer(Stat);
