import React from "react";
import styles from "./individualItem.module.scss";
import { Item } from "utils/types";
import urls from "utils/urls";
import { mutate } from "swr";
interface Props {
  item: Item;
}
const IndividualItem: React.FC<Props> = ({ item }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [success, setSuccess] = React.useState(false);

  /* const incrementQuantity = (e: React.SyntheticEvent) => { */
  /*   e.preventDefault(); */
  /*   if (quantity <= 0) { */
  /*     setQuantity(1); */
  /*     return; */
  /*   } */
  /*   setQuantity((quantity += 1)); */
  /* }; */

  /* const decrementQuantity = (e: React.SyntheticEvent) => { */
  /*   e.preventDefault(); */
  /*   if (quantity <= 0 || quantity - 1 === 0) { */
  /*     setQuantity(1); */
  /*     return; */
  /*   } */
  /*   setQuantity((quantity -= 1)); */
  /* }; */

  const handleChange = (e: React.SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    if (isNaN(parseInt(input.value))) {
      setQuantity(1);
      return;
    }
    if (input.value === "") {
      setQuantity(1);
      return;
    }
    if (quantity <= 0) {
      setQuantity(1);
      return;
    }
    setQuantity(parseInt(input.value));
  };

  const addToCart = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const body = { quantity: quantity, id: item.id };
    const response = await fetch("/api/cart", {
      method: "PUT",
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as {
      success: boolean;
      payload: Item[];
    };
    if (data.success === true && data.payload != []) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    void mutate(`${urls.baseUrl}${urls.api.cart}`, null, true);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img
          src={item && item.imageUrl ? item.imageUrl : "/item.png"}
          alt={item && item.name}
        ></img>
      </div>

      <div className={styles.body}>
        <div className={styles.title}>
          {/*TODO: Add success message for adding to cart.*/}
          <h1>{item && item.name}</h1>
        </div>
        <div className={styles.content}>
          <h2>${item && item.variations[0].price}</h2>
          <div className={styles.quantity}>
            Quantity
            <input
              type="number"
              value={quantity || 1}
              onChange={handleChange}
            />
          </div>
          <div className={styles.description}>{item && item.description}</div>
          {success && 
            <div className={styles.cartSuccess}>
              <div className={styles.cartSuccessText}>Item successfully added to cart.</div>
              <a href="/cart" className={styles.cartButton}>View Cart</a>
            </div>
          }
          <button className={styles.button} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualItem;
