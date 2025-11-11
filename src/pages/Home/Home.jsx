import { useContext } from "react";
import FeaturedHabits from "../../components/FeaturedHabits/FeaturedHabits";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import WhyBuildHabits from "../../components/WhyBuildHabits/WhyBuildHabits";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
    const {loading, setLoading} = useContext(AuthContext)

    return (
        <div className="md:max-w-7xl mx-auto">
            <HeroSlider></HeroSlider>
            <FeaturedHabits></FeaturedHabits>
            <WhyBuildHabits></WhyBuildHabits>
        </div>
    );
};

export default Home;