// import { motion } from "framer-motion";

// const HabitsCard = ({ habit }) => {
//   return (
//     <div>
//       <motion.div
//         key={habit._id}
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: i * 0.1 }}
//         className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
//       >
//         {/* --------- Photo -------- */}
//         <div>
//           <img
//             src={habit.imageUrl || "No Image Found"}
//             alt={habit.title}
//             className="w-full h-48 object-cover"
//           />
//         </div>

//         <div className="p-5">
//           <h3 className="text-xl font-semibold text-primary mb-2">
//             {habit.title}
//           </h3>
//           <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//             {habit.description}
//           </p>

//           <div className="flex justify-between items-center text-xs md:text-sm text-gray-500">
//             <p>
//               <span className="font-semibold">By</span> {habit.userName}
//             </p>
//           </div>
//           <Link></Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default HabitsCard;
