import React from "react";
import { BookeoProduct } from "utils/types";
import styles from "./ticketdisplay.module.scss";
import BookeoProductComponent from "components/tickets/BookeoProduct";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

interface Props {
  products?: BookeoProduct[];
}

const TicketsDisplay: React.FC<Props> = ({products}) => {
  //TODO: Look into booking limits and times.
  //Number of seats an event can possibly have is the sum of numbers in booking limits.
  return (
    <div>
      <Calendar />
      {products && (
        products.map(product => {
          return <BookeoProductComponent product={product}/>
        })
      )}
    </div>
  );
};

export default TicketsDisplay;
