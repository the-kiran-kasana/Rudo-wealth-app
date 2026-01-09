export default function GroupDetails({ group }) {

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">{group.name}</h2>

      {/* Members */}
      <div>
        <h3 className="font-semibold">Members</h3>
        {group.members.map(m => (
          <p key={m.email}>
            {m.name || m.email} — Balance: ₹{m.balance}
          </p>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="bg-pink-600 text-white px-4 py-2 rounded">
          + Add Expense
        </button>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Settle Up
        </button>
      </div>

      {/* Expenses */}
      <ExpenseList groupId={group._id} />
    </div>
  );
}
