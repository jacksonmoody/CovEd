import { Outlet } from 'react-router-dom';
import '../styling/Layout.css';

function Layout() {
  return (
    <>
      <div className = "outlet">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;