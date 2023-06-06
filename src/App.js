import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Navbar = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const BrandName = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 20px;
  margin: 20px;
`;

const UserCard = styled.div`
  background-color: rgb(207 220 219);
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const UserEmail = styled.p`
  margin: 0;
  color: #666;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://reqres.in/api/users?page=1");
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <><div style={{ background: "linear-gradient(45deg, black, transparent)",height: 750}}>
      <Navbar>
        <BrandName>ABC-Company</BrandName>
        <Button onClick={getUsers}>Get Users</Button>
      </Navbar>
      
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <UserGrid>
            {users.map((user) => (
              <UserCard key={user.id}>
                <UserImage src={user.avatar} alt={user.first_name} />
                <UserName>{`${user.first_name} ${user.last_name}`}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserCard>
            ))}
          </UserGrid>
        )}
      </div>
    </>
  );
}

export default App;
