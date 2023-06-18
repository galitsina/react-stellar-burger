import ClipLoader from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const Loader = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <ClipLoader
        size={100}
        color={"#00BFFF"}
        loading={loading}
        css={override}
      />
    </div>
  );
}
