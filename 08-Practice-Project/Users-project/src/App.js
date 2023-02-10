import React, {useState} from 'react';

import AddUser from './components/Users/AddUsers'
import ListUsers from './components/Users/ListUsers';

function App() {
  const [users,setUsers] = useState([]);

  const addUserHandler = (newUser) => {
    setUsers((prevUsers) => {
      return[newUser, ...prevUsers];
    });
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler}/>
      <ListUsers allUsers={users}/>
    </div>
  );
}

export default App;
