import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const COLOR = "#00BFFF";

export const Loader = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <ClipLoader
        size={100}
        color={COLOR}
        loading={loading}
      />
    </div>
  );
}
