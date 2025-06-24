import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
 
const PublicLayout = () => {
  return (
    <div className="App">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
 
export default PublicLayout;