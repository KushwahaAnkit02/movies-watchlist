import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <ColorRing
        visible={true}
        height="70"
        width="70"
        wrapperclassName="color-ring-wrapper"
        colors={["black", "black", "black", "black", "black"]}
      />
    </div>
  );
};

export default Loader;
