// export default function ExpenseList({ expenses }) {
//   return (
//     <div className="bg-white rounded-xl shadow p-4 space-y-3">
//       <h2 className="text-lg font-semibold">Expenses</h2>
//
//       {expenses.map((e) => (
//         <div
//           key={e._id}
//           className="flex justify-between items-center border-b pb-2"
//         >
//           <div>
//             <p className="font-medium">{e.title}</p>
//             <p className="text-sm text-gray-500">
//               Paid by {e.paidByName}
//             </p>
//           </div>
//
//           <p className="font-semibold text-indigo-600">₹{e.amount}</p>
//         </div>
//       ))}
//     </div>
//   );
// }


export default function ExpenseList({ date, title, note, amount }) {

return (
          <div className="flex justify-between items-center border-b py-3">
            <div className="flex gap-4 items-center">
              <div className="text-center text-sm text-gray-500">
{/*                 <p>{date.split(" ")[0]}</p> */}
{/*                 <p className="font-bold">{date.split(" ")[1]}</p> */}
              </div>

              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-500">{note}</p>
              </div>
            </div>

            {amount && (
              <p className="text-orange-500 font-semibold">{amount}</p>
            )}
          </div>
  )
}
