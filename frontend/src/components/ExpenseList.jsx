export default function ExpenseList({ expenses }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-3">
      <h2 className="text-lg font-semibold">Expenses</h2>

      {expenses.map((e) => (
        <div
          key={e._id}
          className="flex justify-between items-center border-b pb-2"
        >
          <div>
            <p className="font-medium">{e.title}</p>
            <p className="text-sm text-gray-500">
              Paid by {e.paidByName}
            </p>
          </div>

          <p className="font-semibold text-indigo-600">₹{e.amount}</p>
        </div>
      ))}
    </div>
  );
}
