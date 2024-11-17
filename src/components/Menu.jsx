import { useState } from "react";
import PropTypes from "prop-types";

const Menu = ({ input, setInput }) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
      <div>
        <span onClick={() => setShow(!show)} style={{ cursor: "pointer" }}>
          {show ? "X" : "Menu"}
        </span>
      </div>
      <br />
      {show && (
        <div>
          <label htmlFor="page">Page for request</label>
          <br />
          <input
            name="page"
            onChange={(e) => setInput({ ...input, page: e.target.value })}
            value={input.page}
            type="number"
          />
          <br />
          <br />
          <label htmlFor="limit">Limit for request</label>
          <br />
          <input
            name="limit"
            onChange={(e) => setInput({ ...input, limit: e.target.value })}
            value={input.limit}
            type="number"
          />
          <br />
          <br />
          <label htmlFor="scale">Scale for images</label>
          <br />
          <input
            name="scale"
            onChange={(e) => setInput({ ...input, scale: e.target.value })}
            value={input.scale}
            type="number"
          />
        </div>
      )}
    </div>
  );
};

Menu.propTypes = {
  input: PropTypes.object,
  setInput: PropTypes.func,
};

export default Menu;
