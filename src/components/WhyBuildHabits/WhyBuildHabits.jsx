import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Loading from "../Loading/Loading";

const WhyBuildHabits = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div className="px-6 md:px-12">
      {loading ? (
        <Loading></Loading>
      ) : (
        <section>
          <h2 className="text-2xl md:text-4xl font-bold text-secondary text-center mb-5 md:mb-8">
            Why Build Habits?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Item 1 */}
            <div className="flex flex-col md:flex-row rounded-2xl shadow-lg hover:shadow-xl items-center gap-4 md:gap-8 p-3 md:p-5">
              <img
                src="https://i.ibb.co.com/kVDvxcDN/consistency.png"
                alt="Consistency"
                className="w-1/4 md:w-1/3 rounded-2xl object-cover"
              />
              <div className="md:w-1/2 px-2 md:px-0 pb-2 md:pb-0">
                <h3 className="text-primary md:text-xl font-semibold mb-3">
                  Build Consistency
                </h3>
                <blockquote className="text-sm md:text-base italic text-gray-800 border-l-2 md:border-l-4 border-primary pl-4">
                  “Motivation is what gets you started. Habit is what keeps you
                  going.” — Jim Ryun
                </blockquote>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row rounded-2xl shadow-lg hover:shadow-xl items-center gap-4 md:gap-8 p-3 md:p-5">
              <img
                src="https://i.ibb.co.com/xtMFMX3r/productivity.png"
                alt="Productivity"
                className="w-1/4 md:w-1/3 rounded-2xl object-cover"
              />
              <div className="md:w-1/2 px-2 md:px-0 pb-2 md:pb-0">
                <h3 className="text-primary md:text-xl font-semibold mb-3">
                  Improve Productivity
                </h3>
                <blockquote className="text-sm md:text-base italic text-gray-800 border-l-2 md:border-l-4 border-primary pl-4">
                  “The secret of your future is hidden in your daily routine.” —
                  Mike Murdock
                </blockquote>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row rounded-2xl shadow-lg hover:shadow-xl items-center gap-4 md:gap-8 p-3 md:p-5">
              <img
                src="https://i.ibb.co.com/FbFLTysX/Enhance-Wellbeing.png"
                alt="Wellbeing"
                className="w-1/4 md:w-1/3 rounded-2xl object-cover"
              />
              <div className="md:w-1/2 px-2 md:px-0 pb-2 md:pb-0">
                <h3 className="text-primary md:text-xl font-semibold mb-3">
                  Enhance Wellbeing
                </h3>
                <blockquote className="text-sm md:text-base italic text-gray-800 border-l-2 md:border-l-4 border-primary pl-4">
                  “The chains of habit are too weak to be felt until they are
                  too strong to be broken.” — Samuel Johnson
                </blockquote>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col md:flex-row rounded-2xl shadow-lg hover:shadow-xl items-center gap-4 md:gap-8 p-3 md:p-5">
              <img
                src="https://i.ibb.co.com/HLF0s2qY/Track-Your-Progress.png"
                alt="Track Progress"
                className="w-1/4 md:w-1/3 rounded-2xl object-cover"
              />
              <div className="md:w-1/2 px-2 md:px-0 pb-2 md:pb-0">
                <h3 className="text-primary md:text-xl font-semibold mb-3">
                  Track Your Progress
                </h3>
                <blockquote className="text-sm md:text-base italic text-gray-800 border-l-2 md:border-l-4 border-primary pl-4">
                  “You will never change your life until you change something
                  you do daily.” — Mike Murdock
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WhyBuildHabits;
