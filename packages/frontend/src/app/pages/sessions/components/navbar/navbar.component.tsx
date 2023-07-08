import { AdminNavbar } from './admin-navbar.component';
import { BasicNavbar } from './basic-navbar.component';

const Navbar = ({ role, userName }: { role: string; userName: string }) => {
  return role === 'ADMIN' ? (
    <AdminNavbar userName={userName} role={role} />
  ) : (
    <BasicNavbar userName={userName} role={role} />
  );
};

export { Navbar };
