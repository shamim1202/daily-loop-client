import FeaturedHabits from "../../components/FeaturedHabits/FeaturedHabits";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import MiniLeaderboard from "../../components/MiniLeaderboard/MiniLeaderboard";
import TestimonialCarousel from "../../components/TestimonialCarousel/TestimonialCarousel";
import WhyBuildHabits from "../../components/WhyBuildHabits/WhyBuildHabits";

const Home = () => {
  return (
    <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100 space-y-12 md:space-y-16">
      <HeroSlider></HeroSlider>
      <FeaturedHabits></FeaturedHabits>
      <WhyBuildHabits></WhyBuildHabits>
      <HowItWorks></HowItWorks>
      <TestimonialCarousel></TestimonialCarousel>
      <MiniLeaderboard></MiniLeaderboard>
    </div>
  );
};

export default Home;
