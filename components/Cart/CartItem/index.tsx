import React, { useState } from "react";
import { Item, CartAPIResponse } from "utils/types";
import styles from "./cartitem.module.scss";
import { mutate } from "swr";
import Spinner from "components/Loading/Spinner";

interface Props {
  item: Item;
}
const CartItem: React.FC<Props> = ({ item }) => {

  const[loading, setLoading] = useState(false); //Controls the spinner next to the remove button

  const [quantity, setQuantity] = React.useState(
    item.quantity ? item.quantity : 1
  );

  //Update the item's quantity if the value is entered manually.
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

  //Remove an item from the cart, then update the cart page to display the new list of cart items.
  const removeFromCart = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ id: item.id, quantity: item.quantity }),
    });

    const data = (await response.json()) as CartAPIResponse;
    if (data.success) {
      await mutate("/api/cart", null, true);
    }
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemWrapper}>
        <figure className={styles.cartItemImageContainer}>
          <img
            src={item.imageUrl ? item.imageUrl : "/item.png"}
            alt={item.name}
            className={styles.cartItemImage}
          />
        </figure>
        <div className={styles.cartItemText}>
          <div className={styles.headerContainer}>
            <h2>{item.name}</h2>
            <button type="button" onClick={removeFromCart}>
              Remove
            </button>
            {loading ? <div className={styles.spinner}><Spinner/></div> : <></>}
          </div>
          <h3>${item.variations[0].price}</h3>
          <h4>Quantity</h4>
          <div className={styles.quantity}>
            <input
              type="number"
              className={styles.quantityInput}
              placeholder="0"
              onChange={handleChange}
              value={quantity || 0}
              onBlur={async () => {
                //When the user removes focus from the quantity input, this will make a call to update the item's quantity in the cart cookie, then update the page to display the new quantity.
                if (quantity != item.quantity) {
                  const response = await fetch("/api/cart", {
                    method: "PATCH",
                    body: JSON.stringify({ id: item.id, quantity: quantity }),
                  });

                  const data = (await response.json()) as CartAPIResponse;
                  if (data.success) {
                    void mutate("/api/cart", null, true);
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
