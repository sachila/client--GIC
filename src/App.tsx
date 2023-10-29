import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AccountDetailsPage } from "./pages/account/AccountDetailsPage";

function App() {
  return (
    <>
      <Provider store={store}>
        <AccountDetailsPage />
      </Provider>
      ,
    </>
  );
}

export default App;
