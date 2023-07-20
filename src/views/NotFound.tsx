import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-60">
      <h3 className="text-xl font-bold">Page Not Found</h3>
      <h3 className="text-xl font-bold">404</h3>
      <Link to={"/"} className="btn btn-sm btn-outline rounded-full mt-2">
        back to home
      </Link>
    </div>
  );
}

export default NotFound;
