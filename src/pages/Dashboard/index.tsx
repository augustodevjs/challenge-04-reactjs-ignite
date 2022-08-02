import { useState, useEffect } from "react";

import { Header } from "../../components/Header";

import api from "../../services/api";

import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";

import { FoodsContainer } from "./styles";
import { IFoodPlate } from "../../types";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  console.log(editingFood);

  // Lista os foods na aplicação - GET
  useEffect(() => {
    async function loadFoods() {
      const response = await api.get("/foods");
      const data = setFoods(response.data);
      return data;
    }

    loadFoods();
  }, []);

  // Cria um novo food na aplicação - POST
  async function handleAddFood(food: Omit<IFoodPlate, "id" | "available">) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  // Atualiza o food da aplicação - PUT
  async function handleUpdateFood(food: Omit<IFoodPlate, "id" | "available">) {
    console.log(food);
    try {
      const response = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const updateFood = foods.map((mappedFood) =>
        mappedFood.id === editingFood.id ? { ...response.data } : mappedFood
      );

      setFoods(updateFood);
    } catch (err) {
      console.log(err);
    }
  }

  // Delete um food da aplicação - DELETE
  async function handleDeleteFood(id: number) {
    try {
      await api.delete(`/foods/${id}`);
      const filteredFoods = foods.filter((food) => food.id !== id);

      setFoods(filteredFoods);
    } catch (error) {
      console.log(error);
    }
  }

  // Abrir e fechar o modal
  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  // Abre o modal com os dados já cadastrados.
  function handleEditFood(food: IFoodPlate) {
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />

      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer>
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
