import { RouterProvider } from 'react-router-dom';
import { myRouter } from './router/router';

function App() {
  return <RouterProvider router={myRouter} />;
}

export default App;
