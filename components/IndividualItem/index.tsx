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
  const [displayedVariation, setDisplayedVariation] = React.useState(item.variations[0])
  const [optionValues, setOptionValues] = React.useState(item.variations[0].itemOptionValues);
  const [selectValues, setSelectValues] = React.useState({});
  console.log(displayedVariation);
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
    //From here: https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
    const target = e.target as HTMLInputElement;
    const selectValue = JSON.parse(target.value);
    console.warn("Option change detected.");
    const indexToUpdate = optionValues.findIndex(option => option.itemOptionId === selectValue.itemOptionId);
    let optionsCopy = [...optionValues];
    let optionToUpdate = {...optionsCopy[indexToUpdate]};
    optionToUpdate.itemOptionValueId = selectValue.itemOptionValueId;
    optionsCopy[indexToUpdate] = optionToUpdate;
    setOptionValues(optionsCopy);
  };
  //Makes sure that the correct variation is displayed.
  const getVariationInfo = () => {
    //Now that we have the correct option values, we check all of the variations to find the one with matching option values.
    const newVariationToDisplay = item.variations.filter(v => JSON.stringify(v.itemOptionValues) == JSON.stringify(optionValues))
    //If that variation exists, then we can set it to be the new displayed variation.
    if(newVariationToDisplay.length != 0){
        setDisplayedVariation(newVariationToDisplay[0]);
    }

  };

  React.useEffect(() => {
    getVariationInfo();
  }, [optionValues]);

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
        <h3>{displayedVariation && displayedVariation.name}</h3>
        <div className={styles.content}>
          <h2>${item && displayedVariation.price}</h2>
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
              return (
                <>
                  <h3>{option.name}</h3>
                  <select name={option.name} onBlur={handleOptionInfo}>
                    {option.values?.map(value => {
                      //This is the default value of the selected variation index.
                      return (
                        <option
                          key={value.id}
                          value={JSON.stringify({
                            itemOptionId: option.id,
                            itemOptionValueId: value.id,
                          })}
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
