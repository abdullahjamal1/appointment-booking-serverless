import {createContext} from "react";
import {IUser} from '../interfaces/user'
const UserContext = createContext<IUser | null>(null);
export default UserContext;