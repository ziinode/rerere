import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductList from "@/components/ProductList";
import AboutSection from "@/components/AboutSection";
import Newsletter from "@/components/Newsletter";
import ContactSection from "@/components/ContactSection";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <ProductList />
      <AboutSection />
      <Newsletter />
      <ContactSection />
    </>
  );
};

export default Home;
