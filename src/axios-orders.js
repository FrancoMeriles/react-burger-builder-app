import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-react-app-849ee.firebaseio.com/"
});

export default instance;
