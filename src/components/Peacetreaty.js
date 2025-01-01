// src/components/SignedUsers.js
import React, { useEffect, useState } from "react";
import { getFirestore,doc,deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firebaseApp } from "../config/firebase"; // Adjust the import path as per your project structure
import Colors from "../theme/Colors";

const db = getFirestore(firebaseApp);

function PeaceTreaty() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const deleteUser = async (userID) => {
    try {
      setLoading(true); // Optional: To show a loading state during deletion
      console.log("here 1")
      const userRef = doc(db, "Users", userID); // Reference to the specific user document
      await deleteDoc(userRef); // Delete the document
      console.log(`User with ID ${userID} deleted successfully.`);
      // Optionally refresh the user list after deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userID));
    } catch (error) {
      console.error("Error deleting user: ", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("signed", "!=", ""));
        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {users.length === 0 ? (
        <p>No users have signed the peace treaty yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: Colors.background,
              }}
            >
              <div style={{display:'flex',justifyContent:'space-between',flex:1,alignItems:'center'}}>
                <div>
                  <strong>{user?.usrName}</strong>
                  <p>Residency: {user?.residency || "Not provided"}</p>
                </div>
                <div>
                  <button onClick={()=>deleteUser(user?.userID)} style={{backgroundColor:Colors.primary,padding:10,borderRadius:10,color:'white',width:120}} type="submit">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PeaceTreaty;
