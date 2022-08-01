import { useState } from "react";

import { FiEdit3, FiTrash } from "react-icons/fi";
import { IFoodPlate } from "../../types";

import { Container } from "./styles";

interface IProps {
  food: IFoodPlate;
  handleDelete: (id: number) => {};
  handleEditFood: (food: IFoodPlate) => void;
}

export function Food({ food, handleDelete, handleEditFood }: IProps) {
  const [isAvailable, setIsAvailable] = useState(food.available);
  console.log(food);

  async function toggleAvailable() {
    setIsAvailable(!isAvailable);
  }

  function setEditingFood() {
    handleEditFood(food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>

      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>

      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingFood()}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
