import { useContext } from "react";
import FeaturedHabits from "../../components/FeaturedHabits/FeaturedHabits";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
    const {loading, setLoading} = useContext(AuthContext)

    return (
        <div className="md:max-w-7xl mx-auto">
            <HeroSlider></HeroSlider>
            <FeaturedHabits></FeaturedHabits>
        </div>
    );
};

export default Home;