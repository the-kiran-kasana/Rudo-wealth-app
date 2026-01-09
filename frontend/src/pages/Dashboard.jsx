import { useState } from "react";
// src/pages/Dashboard.jsx
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import BalancePanel from "../components/BalancePanel";
import ExpenseList from "../components/ExpenseList";



export default function Dashboard({ balances, onPay }) {


  const [expense, setExpense] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [splitType, setSplitType] = useState("EQUAL");
  const [paidBy, setPaidBy] = useState("");
  const [splits, setSplits] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSplitChange = (index, value) => {
    const updated = [...splits];
    updated[index].value = value;
    setSplits(updated);
  };



  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addExpense = () => {
    setExpense(!expense)
    console.log("Open Add Expense Modal");
  };

  const handleSettleUp = () => {
     console.log("Open Add settle up Modal");
  }



 return (
   <div className="min-h-screen bg-gray-100 flex justify-center p-8">

   <div className="min-h-screen flex bg-gray-100">
      <Sidebar onGroupSelect={(group) => {
               setSelectedGroup(group);
               setSelectedFriend(null);
             }}
             onFriendSelect={(friend) => {
               setSelectedFriend(friend);
               setSelectedGroup(null);
             }}
           />
     <MainContent selectedGroup={selectedGroup} selectedFriend={selectedFriend} />
     <BalancePanel />
     <ExpenseList />
   </div>

   </div>
 );

}
