import { useContext } from "react";
import FeaturedHabits from "../../components/FeaturedHabits/FeaturedHabits";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import TestimonialCarousel from "../../components/TestimonialCarousel/TestimonialCarousel";
import WhyBuildHabits from "../../components/WhyBuildHabits/WhyBuildHabits";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
    const {loading, setLoading} = useContext(AuthContext)

    return (
        <div className="md:max-w-7xl mx-auto bg-linear-to-r from-blue-100 via-purple-100 to-green-100">
            <HeroSlider></HeroSlider>
            <FeaturedHabits></FeaturedHabits>
            <WhyBuildHabits></WhyBuildHabits>
            <HowItWorks></HowItWorks>
            <TestimonialCarousel></TestimonialCarousel>
        </div>
    );
};

export default Home;