import { useContext } from "react";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {
    const {loading, setLoading} = useContext(AuthContext)

    return (
        <div className="md:max-w-7xl mx-auto">
            {loading && <Loading></Loading>}
            <HeroSlider></HeroSlider>
        </div>
    );
};

export default Home;