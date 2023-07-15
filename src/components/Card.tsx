import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

interface CardProps {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

function Card({ id, image, title, description, price, rating, category }: CardProps) {
  return (
    <div key={id} className="card card-compact w-auto bg-base-100 shadow-xl pt-5">
      <figure>
        <img src={image} alt="Shoes" className="w-[100px]" />
      </figure>
      <div className="card-body">
        <Link to={`/product/${id}`}>
          <h2 className="card-title">{title}</h2>
        </Link>
        <div className="badge badge-outline">{category}</div>
        <p>{description.substring(0, 50)}</p>
        <span className="flex items-center">
          <AiFillStar className="mr-1 text-lg" />
          {rating.rate}
        </span>
        <div className="card-actions justify-between items-center">
          <span className="text-xl font-semibold">{price}$</span>
          <button className="btn btn-ghost">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
