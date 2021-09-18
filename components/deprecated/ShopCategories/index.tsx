import styles from "./shopcategories.module.scss";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const ShopCategories: React.FC = () => {
  // Controls if categories should be collapsed or retracted.
  const [isCollapsed, setCollapse] = useState(false);

  return (
    <div className={styles.container}>
      <header>
        <span>Categories</span>
        <button onClick={() => setCollapse(!isCollapsed)}>
          {isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </header>
      <div
        className={styles.categories}
        style={isCollapsed ? { height: "auto" } : { height: 0 }}
      >
        <a href="x">tickets (5)</a>
        <a href="x">learning kits (3)</a>
        <a href="x">tickets (5)</a>
        <a href="x">learning kits (3)</a>
        <a href="x">tickets (5)</a>
        <a href="x">learning kits (3)</a>
        <a href="x">tickets (5)</a>
        <a href="x">learning kits (3)</a>
        <a href="x">tickets (5)</a>
        <a href="x">learning kits (3)</a>
        <a href="x">tickets (5)</a>
        <a href="x">learning kits (3)</a>
      </div>
    </div>
  );
};

export default ShopCategories;
