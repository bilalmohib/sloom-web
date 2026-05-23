import router from '@/routes';
import { RouterProvider } from 'react-router-dom';

import '@/styles/globals.css';
import '@/App.css';

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
