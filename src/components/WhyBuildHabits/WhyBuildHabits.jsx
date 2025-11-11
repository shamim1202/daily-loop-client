// https://i.ibb.co.com/kVDvxcDN/consistency.png
// https://i.ibb.co.com/FbFLTysX/Enhance-Wellbeing.png
// https://i.ibb.co.com/xtMFMX3r/productivity.png
// https://i.ibb.co.com/HLF0s2qY/Track-Your-Progress.png

const WhyBuildHabits = () => {
  return (
    <section className="bg-linear-to-r from-blue-100 via-purple-100 to-green-100 px-6 py-16">
      <h2 className="text-3xl md:text-5xl font-bold text-secondary text-center mb-12">
        Why Build Habits?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
        {/* Item 1 */}
        <div className="flex flex-col md:flex-row rounded-2xl shadow-lg hover:shadow-xl items-center gap-4 md:gap-8 p-3 md:p-5">
          <img
            src="https://i.ibb.co.com/kVDvxcDN/consistency.png"
            alt="Consistency"
            className="md:w-1/3 rounded-2xl object-cover"
          />
          <div className="md:w-1/2">
            <h3 className="text-primary text-lg md:text-2xl font-semibold mb-3">Build Consistency</h3>
            <blockquote className="italic text-gray-800 border-l-4 border-primary pl-4">
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
            className="md:w-1/3 rounded-2xl  object-cover"
          />
          <div className="md:w-1/2">
            <h3 className="text-primary text-lg md:text-2xl font-semibold mb-3">
              Improve Productivity
            </h3>
            <blockquote className="italic text-gray-800 border-l-4 border-primary pl-4">
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
            className="md:w-1/3 rounded-2xl  object-cover"
          />
          <div className="md:w-1/2">
            <h3 className="text-primary text-lg md:text-2xl font-semibold mb-3">Enhance Wellbeing</h3>
            <blockquote className="italic text-gray-800 border-l-4 border-primary pl-4">
              “The chains of habit are too weak to be felt until they are too
              strong to be broken.” — Samuel Johnson
            </blockquote>
          </div>
        </div>

        {/* Item 4 */}
        <div className="flex flex-col md:flex-row rounded-2xl shadow-lg hover:shadow-xl items-center gap-4 md:gap-8 p-3 md:p-5">
          <img
            src="https://i.ibb.co.com/HLF0s2qY/Track-Your-Progress.png"
            alt="Track Progress"
            className="md:w-1/3 rounded-2xl  object-cover"
          />
          <div className="md:w-1/2">
            <h3 className="text-primary text-lg md:text-2xl font-semibold mb-3">Track Your Progress</h3>
            <blockquote className="italic text-gray-800 border-l-4 border-primary pl-4">
              “You will never change your life until you change something you do
              daily.” — Mike Murdock
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBuildHabits;
