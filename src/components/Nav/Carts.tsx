import "./Cart.css";
import { Link } from "react-router-dom";

type Props = {
  imageSrc: string;
  name: string;
  description: string;
  link: string;
};

export function Carts({ imageSrc, name, description, link }: Props) {
  return (
    <div className="nav">
      <Link to={link} style={{ color: "black", textDecoration: "none" }}>
        <div className="carts">
          <img className="icon" src={imageSrc} alt="" />
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}
