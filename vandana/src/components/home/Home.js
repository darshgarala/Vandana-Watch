import Slide from "../Slide/Slide";
import Scroll from "../scroll/Scroll";
import Slide1 from "../Slide/Slide1";
import Image from "../Image/Image";
import { useEffect, useState } from "react";
import axios from "axios";
import SlideW from '../Slide/SlideW'
import SlideC from "../Slide/SlideC";
const Home = ({account,setAccount}) => {
  
  const [brands, setbrands] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const doSomething = async () => {
      let brand1 = await axios.get("http://localhost:8001/brands");
      setbrands(brand1.data);
    };

    doSomething();
  }, []);

  useEffect(() => {
    const doSomething1 = async () => {
      let brand11 = await axios.get("http://localhost:8001/products");
      console.log(' = = = = = =',brand11.data.products);
      setProducts(brand11.data.products);
    };

    doSomething1();
  }, []);

  return (
    <>
      <Scroll></Scroll>
      <Slide1 brands={brands} title="Brands"></Slide1>
      <Slide products={products} title="For a Men`s"></Slide>
      <Image></Image>
      <SlideW products={products} title="For a Women`s"></SlideW>
      <SlideC products={products} title="For a Childern`s"></SlideC>
    </>
  );
};

export default Home;
