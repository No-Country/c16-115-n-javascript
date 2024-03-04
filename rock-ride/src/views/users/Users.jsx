import { useSelector } from "react-redux";
import { UserCard } from "./ui/UserCard";
import { useAuthStore } from "../../hooks/useAuthStore";

export default function UsersPage() {

  const { users } = useSelector( state => state.user )
  const { user } = useAuthStore()


  return (
    <div className="w-full mx-auto px-2 sm:px-10 gap-4 max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screenContent">
      {
        users
        .filter( userFilter => userFilter.id !== user.user.id)
        .map( user => (
          <UserCard key={user.id} user={ user } />
        ))
      }
    </div>
  );
}