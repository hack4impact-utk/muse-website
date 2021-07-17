import React from "react";
import styles from "./individualItem.module.scss";
import { Item, ItemOption } from "utils/types";
import urls from "utils/urls";
import { mutate } from "swr";
interface Props {
  item: Item;
}
const IndividualItem: React.FC<Props> = ({ item }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [success, setSuccess] = React.useState(false);
  const [selectedVariationIndex, setSelectedVariationIndex] = React.useState(0); //An item will have at least 1 variation stored in index 0.
  const [selectValues, setSelectValues] = React.useState({});
  console.log(item.variations[selectedVariationIndex]);
  //Handles the quantity state.
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
  //Updates the state that contains the values from the select field(s).
  const handleOptionInfo = (e: React.SyntheticEvent) => {
    e.persist();
    const target = e.target as HTMLInputElement;
    setSelectValues(selectValues => ({
      ...selectValues,
      [target.name]: target.value !== "" ? JSON.parse(target.value) : "",
    }));
    //After the values are set, we need to check and make sure that all the values have been selected before getting the variation.
    getVariationInfo();
  };
  //Makes sure that the correct variation is displayed.
  const getVariationInfo = () => {
    //Need to filter the item's variation array by item option id and item option value id
    let key: any;
    for (key in selectValues) {
      //Check each variation's itemOptionValues for the selected values from the frontend. If they match, then we need to update what variation's information is displayed.
      item.variations.forEach((variation, variationIndex) => {
        variation.itemOptionValues.forEach(valueSet => {
          if (
            valueSet.itemOptionId == selectValues[key].itemOptionId &&
            valueSet.itemOptionValueId == selectValues[key].itemOptionValueId
          ) {
            setSelectedVariationIndex(variationIndex);
          }
        });
      });
    }
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
          <h1>{item && item.name}</h1>
        </div>
        <div className={styles.content}>
          <h2>${item && item.variations[selectedVariationIndex].price}</h2>
          <div className={styles.quantity}>
            <h4>Quantity</h4>
            <input
              type="number"
              value={quantity || 1}
              onChange={handleChange}
            />
          </div>
          {item.variations.length > 1 &&
            (item.options as ItemOption[]) &&
            (item.options as ItemOption[]).map((option: ItemOption) => {
              const defaultValue = item.variations[
                selectedVariationIndex
              ].itemOptionValues.filter(
                value => value.itemOptionId === option.id
              )[0].itemOptionValueId;
              return (
                <>
                  <h3>{option.name}</h3>
                  <select name={option.name} onChange={handleOptionInfo}>
                    {option.values?.map(value => {
                      //This is the default value of the selected variation index.

                      return (
                        <option
                          key={value.id}
                          value={JSON.stringify({
                            itemOptionId: option.id,
                            itemOptionValueId: value.id,
                          })}
                          selected={defaultValue === value.id}
                        >
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                </>
              );
            })}
          <div className={styles.description}>{item && item.description}</div>
          {success && (
            <div className={styles.cartSuccess}>
              <div className={styles.cartSuccessText}>
                Item successfully added to cart.
              </div>
              <a href="/cart" className={styles.cartButton}>
                View Cart
              </a>
            </div>
          )}
          <button className={styles.button} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualItem;
