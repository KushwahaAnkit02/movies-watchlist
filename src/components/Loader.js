import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <ColorRing
        visible={true}
        height="40"
        width="40"
        wrapperclassName="color-ring-wrapper"
        colors={["white", "white", "white", "white", "white"]}
      />
    </div>
  );
};

export default Loader;
