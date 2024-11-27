import React, { useState, useEffect } from "react";
import ComboList from "./components/ComboList";
import Pedidos from "./components/Pedidos";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pedidoActual, setPedidoActual] = useState([]);
  const [pedidosConfirmados, setPedidosConfirmados] = useState([]);
  const [mesa, setMesa] = useState("");

  
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    
    axios
      .get("http://localhost:5000/api/combos") 
      .then((response) => {
        setCombos(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los combos: ", error);
      });
  }, []);

 
  const handleAddCombo = (combo) => {
    setPedidoActual((prevPedido) => {
      const comboExistente = prevPedido.find((item) => item.id === combo.id);
      if (comboExistente) {
        return prevPedido.map((item) =>
          item.id === combo.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevPedido, { ...combo, quantity: 1 }];
    });
  };

  
  const handleAddMoreCombo = (combo) => {
    handleAddCombo(combo);
  };

  
  const handleEliminar = (index) => {
    const nuevoPedido = [...pedidoActual];
    nuevoPedido.splice(index, 1);
    setPedidoActual(nuevoPedido);
  };

  
  const handleConfirmar = () => {
    if (mesa.trim() !== "" && pedidoActual.length > 0) {
      const pedidoData = {
        mesa,
        combos: pedidoActual,
        total: pedidoActual.reduce(
          (total, combo) => total + combo.price * combo.quantity,
          0
        ),
      };

      axios
        .post("http://localhost:5000/api/pedidos", pedidoData)
        .then((response) => {
          setPedidosConfirmados((prevPedidos) => [
            ...prevPedidos,
            response.data,
          ]);
          setPedidoActual([]); 
          setMesa(""); 
        })
        .catch((error) => {
          console.error("Error al confirmar el pedido: ", error);
        });
    } else {
      alert("Debe ingresar un número de mesa y tener items en el pedido");
    }
  };

  return (
    <div className="App">
      <h1>APP MOZO EXPRESS</h1>
      <ComboList
        combos={combos}
        handleAddCombo={handleAddCombo}
        handleAddMoreCombo={handleAddMoreCombo}
      />
      <Pedidos
        pedidoActual={pedidoActual}
        pedidosConfirmados={pedidosConfirmados}
        onEliminar={handleEliminar}
        onConfirmar={handleConfirmar}
        mesa={mesa}
        setMesa={setMesa}
      />
    </div>
  );
};

export default App;
