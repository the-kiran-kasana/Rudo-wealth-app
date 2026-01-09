import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
   const [groups, setGroups] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
      fetchGroups();
    }, []);

    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/group/getGroup",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const groupsData = res.data.groups;
        setGroups(groupsData);

        // ✅ extract friend NAMES
        const allFriends = groupsData.flatMap(group =>
          group.members.map(member => member.name || member.email)
        );

        const uniqueFriends = [...new Set(allFriends)];
        setFriends(uniqueFriends);


      } catch (err) {
        console.error("Sidebar fetch error:", err);
      }
    };
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-6">
      <h1 className="text-xl font-bold text-green-600">Splitwise</h1>

      <nav className="space-y-2 text-sm">
        <p className="font-semibold text-gray-500">Dashboard</p>
        <p className="text-gray-600">Recent activity</p>
        <p className="text-gray-600">All expenses</p>
      </nav>

      {/* GROUPS */}
      <div>
             <h3 className="text-xs font-semibold text-gray-400">GROUPS</h3>
             <ul className="mt-2 space-y-1">
               {groups.map(group => (
                 <li key={group._id} className="text-gray-700">
                   {group.name}
                 </li>
               ))}
             </ul>
           </div>

           {/* FRIENDS */}
           <div>
             <h3 className="text-xs font-semibold text-gray-400 mt-4">FRIENDS</h3>
             <ul className="mt-2 space-y-1">
               {friends.map((friend, index) => (
                 <li key={index} className="text-gray-600">
                   {friend}
                 </li>
               ))}
             </ul>
           </div>



      <div className="pt-4">
        <input
          placeholder="Enter email"
          className="w-full px-2 py-1 border rounded text-sm"
        />
        <button className="mt-2 w-full bg-green-500 text-white py-1 rounded text-sm">
          Invite friend
        </button>
      </div>
    </aside>
  );
}
