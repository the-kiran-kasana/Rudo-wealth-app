import { useState } from "react";

export default function Dashboard({ balances, onPay }) {
  const [showForm, setShowForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("");

  const [expense, setExpense] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [splitType, setSplitType] = useState("EQUAL");
  const [paidBy, setPaidBy] = useState("");
  const [splits, setSplits] = useState([]);

  const handleSplitChange = (index, value) => {
    const updated = [...splits];
    updated[index].value = value;
    setSplits(updated);
  };

  const [members, setMembers] = useState([
    { name: "", email: "" },
  ]);


  const addMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
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

  const saveGroup = () => {
    console.log({
      groupName,
      groupType,
      members,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full  px-4 py-2 border rounded-lg max-w-2xl space-y-4">

        {/* Header */}
        <div className="flex justify-between rounded-xl w-full px-4 py-2 border rounded-sm shadow-lg items-center border-sm">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button onClick={addExpense} className="text-white px-2 py-2  font-medium rounded-lg  bg-pink-600 hover:underline" > + Add Expense </button>
          <button onClick={handleSettleUp} className="text-white px-2 py-2  rounded-lg  bg-green-600 font-medium hover:underline" > Settle Up </button>
          <button  onClick={() => setShowForm(true)} className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
                    + Create Group
          </button>

        </div>







{/*          <h2 className="text-lg font-semibold mb-3">Your Balances</h2> */}

{/*               {balances.length === 0 && ( */}
{/*                 <p className="text-green-600">🎉 You are settled up!</p> */}
{/*               )} */}

{/*               {balances.map((b, i) => ( */}
{/*                 <div */}
{/*                   key={i} */}
{/*                   className="flex justify-between items-center border-b py-2" */}
{/*                 > */}
{/*                   <p className="text-sm"> */}
{/*                     You owe <span className="font-medium">{b.toName}</span> */}
{/*                   </p> */}

{/*                   <div className="flex items-center gap-3"> */}
{/*                     <span className="text-red-500 font-semibold"> */}
{/*                       ₹{b.amount} */}
{/*                     </span> */}

{/*                     <button */}
{/*                       onClick={() => onPay(b)} */}
{/*                       className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700" */}
{/*                     > */}
{/*                       Pay */}
{/*                     </button> */}
{/*                   </div> */}
{/*                 </div> */}
{/*               ))} */}


















{expense && (
  <div className="bg-white rounded-xl shadow-lg p-6 space-y-5">
    <h3 className="text-lg font-semibold">Add an Expense</h3>

    {/* Description */}
    <input
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Expense description"
      className="w-full px-4 py-2 border rounded-lg"
    />

    {/* Amount */}
    <input
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      type="number"
      placeholder="Amount"
      className="w-full px-4 py-2 border rounded-lg"
    />

    {/* Paid By */}
    <select
      value={paidBy}
      onChange={(e) => setPaidBy(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg"
    >
      <option value="">Paid by</option>
      {members.map((m, i) => (
        <option key={i} value={m.name}>
          {m.name || "Member"}
        </option>
      ))}
    </select>

    {/* Split Type */}
    <div>
      <p className="text-sm font-medium mb-2">Split Type</p>
      <div className="flex gap-3">
        {["EQUAL", "EXACT", "PERCENT"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setSplitType(type);
              setSplits(members.map(m => ({ name: m.name, value: "" })));
            }}
            className={`px-4 py-2 rounded-lg border ${
              splitType === type
                ? "bg-indigo-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>

    {/* Split Inputs */}
    {splitType !== "EQUAL" && (
      <div className="space-y-2">
        {splits.map((s, i) => (
          <div key={i} className="flex gap-2">
            <input
              disabled
              value={s.name}
              className="flex-1 px-3 py-2 border rounded-lg bg-gray-100"
            />
            <input
              type="number"
              placeholder={splitType === "EXACT" ? "Amount" : "%"}
              value={s.value}
              onChange={(e) => handleSplitChange(i, e.target.value)}
              className="w-32 px-3 py-2 border rounded-lg"
            />
          </div>
        ))}
      </div>
    )}

    {/* Actions */}
    <div className="flex justify-end gap-3">
      <button
        onClick={() => setExpense(false)}
        className="px-4 py-2 bg-gray-100 rounded-lg"
      >
        Cancel
      </button>

      <button
        onClick={() =>
          console.log({
            description,
            amount,
            paidBy,
            splitType,
            splits,
          })
        }
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Save Expense
      </button>
    </div>
  </div>
)}






















        {/* Create Group Button */}


        {/* Create Group Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">

            <h2 className="text-xl font-bold">Create New Group</h2>

            {/* Group Name */}
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            {/* Members */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Group Members</h3>

              {members.map((member, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />

                  {members.length > 1 && (
                    <button
                      onClick={() => removeMember(index)}
                      className="text-red-500 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addMember}
                className="text-indigo-600 font-medium hover:underline"
              >
                + Add another member
              </button>
            </div>

            {/* Group Type */}
            <select
              value={groupType}
              onChange={(e) => setGroupType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select group type</option>
              <option value="trip">Trip</option>
              <option value="home">Home</option>
              <option value="couple">Couple</option>
            </select>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveGroup}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Save Group
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
