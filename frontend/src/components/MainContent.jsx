import { useState } from "react";
import ExpenseList from "../components/ExpenseList";
import GroupSection from "../components/GroupSection";
import GroupDetails from "../components/GroupDetails";
import FriendDetails from "../components/FriendDetails";

export default function MainContent({ selectedGroup, selectedFriend }) {
  const [showForm, setShowForm] = useState(false);

  // 👉 If a group is selected
  if (selectedGroup) {
    return <GroupDetails group={selectedGroup} />;
  }

  // 👉 If a friend is selected
  if (selectedFriend) {
    return <FriendDetails friend={selectedFriend} />;
  }



  // 👉 Default dashboard view
  return (
    <main className="flex-1 bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            className="rounded-full"
            alt="profile"
          />
          <div>
            <h2 className="font-semibold">Dashboard</h2>
            <p className="text-sm text-gray-500">
              Select a group or friend
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-orange-500 text-white rounded">
            Add an expense
          </button>

          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Settle up
          </button>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            + Create Group
          </button>
        </div>
      </div>

      {/* Create Group Modal */}
      <GroupSection showForm={showForm} setShowForm={setShowForm} />

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
          title="For course"
          note="Suman lent you"
          amount="₹150.00"
        />
      </div>
    </main>
  );
}
