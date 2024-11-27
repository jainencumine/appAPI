import React, { useEffect, useState } from "react";
import { obtenerCombos } from "../data/api";

const ComboList = ({ handleAddCombo, handleAddMoreCombo }) => {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    const fetchCombos = async () => {
      const data = await obtenerCombos();
      setCombos(data);
    };
    fetchCombos();
  }, []);

  return (
    <div className="menu-section">
      <div className="menu-title">
        <h2>Menu</h2>
      </div>
      {combos.map((combo) => (
        <div key={combo.id} className="combo-item">
          <span>{combo.name} - ${combo.price}</span>
          <div className="button-container">
            <button onClick={() => handleAddCombo(combo)}>Agregar</button>
            <button onClick={() => handleAddMoreCombo(combo)}>Agregar más</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComboList;
