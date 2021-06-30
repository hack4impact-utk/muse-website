import React from "react";
import { BookeoProduct } from "utils/types";
import styles from "./bookeoproduct.module.scss";
interface Props {
    product: BookeoProduct;
}
const BookeoProductComponent: React.FC<Props> = ({product}) => {
    console.log(product);
    return (
        <div className={styles['bookeo-product']}>
            <div className={styles['product-info-wrapper']}>
                <div className={styles['product-info']}>
                    <h2>{product.name}</h2>
                </div>
                <div className={styles['product-button-container']}>
                    <button className={styles['product-button']}>Buy Tickets</button>
                </div>

            </div>
        </div>

    );
}

export default BookeoProductComponent;