
import Hero from "./Hero";
import { useParams } from "react-router-dom";
import Sad_face from "../images/Sad_face.png";


const Error404 = () => {
    const { id2 } = useParams();
    const text = `404 Error. Page "${id2}" does not exist !!!`

    return <>
    <Hero text={text} />
    <img src={Sad_face} 
    className="card-img-top" 
    alt="..."
    />
      </>

  };
  
  export default Error404;
  