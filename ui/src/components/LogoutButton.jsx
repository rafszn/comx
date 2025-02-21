import { LuLogOut } from "react-icons/lu";

const LogoutButton = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div
      className="logout flex flex-col items-center gap-2 cursor-pointer relative"
      onClick={logout}
    >
      <LuLogOut size={25} />
      <p className="text-[0.8rem]">Logout</p>
    </div>
  );
};
export default LogoutButton;
