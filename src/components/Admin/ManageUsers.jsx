import Management from "./Management";
import accountApi from "../../api/modules/account.api";
import { useState , useEffect} from "react";
const users = [
    { id: "id", label: "ID" },
    { id: "username", label: "Username" },
    { id: "date_of_birth", label: "Date of Birth" },
    { id: "display_name", label: "Display Name" },
    { id: "email", label: "Email" },
    { id: "gender", label: "Gender" },
    { id: "user_role", label: "User Role" },
  ];
function ManageUsers() {
  return  (
    <Management delete={accountApi.deleteUser} getAllData={accountApi.getAllUsers}  columns={users}/>
  );
}
export default ManageUsers;
