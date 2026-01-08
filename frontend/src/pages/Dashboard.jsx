import { useState } from "react";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
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
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          + Create Group
        </button>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-bold">Create New Group</h2>

            {/* Group Name */}
            <input
              placeholder="Group name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            {/* Members */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Group Members</h3>

              {members.map((member, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center mb-3"
                >
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
                      className="text-red-500 hover:text-red-600 font-semibold"
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


            <select className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select group type</option>
              <option value="trip">Trip</option>
              <option value="home">Home</option>
              <option value="couple">Couple</option>
            </select>


            <div className="flex justify-end gap-3">
              <button onClick={() => setShowForm(false)}  className="px-4 py-2 bg-gray-100 rounded-lg" >
                Cancel
              </button>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg"> Save Group </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
