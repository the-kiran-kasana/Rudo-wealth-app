
import ExpenseList from "../components/ExpenseList";
import GroupSection from "../components/GroupSection";
import { useState } from "react";



export default function MainContent(){

const [showForm, setShowForm] = useState(false);

return (
  <main className="flex-1 bg-white p-6">
    {/* Header */}
    <div className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
        />
        <div>
          <h2 className="font-semibold">Suman</h2>
          <p className="text-sm text-gray-500">suman@gmail.com</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-orange-500 text-white rounded">
          Add an expense
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Settle up
        </button>

        <button onClick={() => setShowForm(!showForm)}  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" > + Create Group</button>
        <GroupSection showForm={showForm} setShowForm={setShowForm}/>

       </div>
    </div>

    {/* Expense List */}
    <div className="mt-6 space-y-4">
      <p className="text-xs text-gray-400">JANUARY 2026</p>

      <ExpenseList
        date="Jan 09"
        title="heyBuddy"
        note="You owe Suman nothing"
      />

      <ExpenseList
        date="Jan 08"
        title="for course"
        note="Suman lent you"
        amount="₹150.00"
      />
    </div>




  </main>
)}
