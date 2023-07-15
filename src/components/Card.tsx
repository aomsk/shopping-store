import { Link } from "react-router-dom";

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

function Card({ id, image, title }: CardProps) {
  return (
    <div key={id} className="card card-compact w-auto bg-base-100 shadow-xl pt-5">
      <figure>
        <img src={image} alt="Shoes" className="w-[100px]" />
      </figure>
      <div className="card-body">
        <Link to={`/product/${id}`}>
          <h2 className="card-title">{title}</h2>
        </Link>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-ghost">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
