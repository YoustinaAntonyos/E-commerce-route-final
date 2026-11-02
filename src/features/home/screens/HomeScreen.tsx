import Details1Home from "../components/Details1Home";
import Details2Home from "../components/Details2Home";
import FeatureProducts from "../components/FeatureProducts";
import HomeCategories from "../components/HomeCategories";
import HomeSlider from "../components/HomeSlider";

export default function HomeScreen() {
  return (
  <>
     <HomeSlider />
    <HomeCategories />
    <Details1Home />
    <FeatureProducts />
    <Details2Home />
  </>
  )
   
  
}
