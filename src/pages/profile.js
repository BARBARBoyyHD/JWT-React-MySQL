import { useEffect, useState } from "react";

const Profile = () => {
  const [token, setToken] = useState(null);

  const getUser = ()=>{
    fetch('http://localhost:5252/profile',{
      method:"GET",
      headers:{
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
    })
    .then(res=>res.json())
    .then(data=>{
      setToken(data.username)
    })
  }


  useEffect(() => {
    getUser()
  }, []);

  if (!token) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {token}!</p>
    </div>
  );
};

export default Profile;