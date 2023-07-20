import { Link } from "react-router-dom";

function CheckOut() {
  return (
    <div className="flex flex-col justify-center items-center mt-60">
      <h3 className="text-xl font-bold">Check Out Successfully!!!</h3>
      <Link to={"/"} className="btn btn-sm btn-outline rounded-full mt-2">
        back to home
      </Link>
    </div>
  );
}

export default CheckOut;
