import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
      Pizza is a dish of Italian origin consisting of a usually round,
       flat base of leavened wheat-based dough topped with tomatoes,
        cheese, and often various other ingredients, which is then baked 
        at a high temperature, traditionally in a wood-fired oven.
         A small pizza is sometimes called a pizzetta.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
