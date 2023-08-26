import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ErrorPage() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  return null;
}

export default ErrorPage;
