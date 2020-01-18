import React, { useState, useEffect } from "react";
import "./App.css";
import sha1 from "js-sha1";
import base_answer from "./services/base_answer.json";
import axios, { post } from "axios";
import answer from "./services/answer.json";
const alfabeto = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

function App() {
  const [codinationData, setcodinationData] = useState([]);
  useEffect(() => {
    async function getData() {
      setcodinationData(base_answer);
    }
    getData();
  }, []);

  function descriptog() {
    const { cifrado } = codinationData;

    const cifradoArray = cifrado.split("");
    const decifradoArray = [];
    cifradoArray.map(element => {
      let letra = alfabeto.indexOf(element);

      if (letra !== -1) {
        let casas = letra + 1;
        let decifrado = [];
        if (casas > alfabeto.length - 1) {
          let restante = casas - alfabeto.length;
          decifrado = alfabeto[restante];
        } else {
          decifrado = alfabeto[casas];
        }
        decifradoArray.push(decifrado);
      } else {
        decifradoArray.push(element);
      }
    });
    const decifrado = decifradoArray.join("");
    const resumo_criptografico = sha1(decifrado);
    setcodinationData({ ...codinationData, decifrado, resumo_criptografico });
  }

  function criptog() {
    const { cifrado } = codinationData;
    const cifradoArray = cifrado.split("");
    const decifradoArray = [];
    cifradoArray.map(element => {
      let posAlfabeto = alfabeto.indexOf(element);

      if (posAlfabeto !== -1) {
        let posNova = posAlfabeto - 6;

        let decifrado = [];
        posNova < 0
          ? (decifrado = alfabeto[alfabeto.length - posNova * -1])
          : (decifrado = alfabeto[posNova]);

        decifradoArray.push(decifrado);
      } else {
        decifradoArray.push(element);
      }
    });
    const decifrado = decifradoArray.join("");
    const resumo_criptografico = sha1(decifrado);
    setcodinationData({ ...codinationData, decifrado, resumo_criptografico });
  }

  function handleSave() {
    const jsonData = codinationData;
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], { type: "multipart/form-data" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "answer.json";
    link.href = url;
    link.click();
  }

  return (
    <>
      <div>
        <div className="retorno-api">
          <strong>Numero de casas:</strong>
          <p>{codinationData.numero_casas}</p>
        </div>
        <div className="retorno-api">
          <strong>Token: </strong>
          <p>{codinationData.token}</p>
        </div>
        <div className="retorno-api">
          <strong>Cifrado:</strong>
          <p> {codinationData.cifrado}</p>
        </div>
        <div className="retorno-api">
          <strong>Decifrado: </strong>
          <p>{codinationData.decifrado}</p>
        </div>
        <div className="retorno-api">
          <strong>Resumo criptografico:</strong>
          <p>{codinationData.resumo_criptografico}</p>
        </div>
        <button onClick={descriptog}>Criptografar</button>
        <button onClick={criptog}>Decifrar</button>
        <button onClick={handleSave}>Salvar</button>
      </div>
    </>
  );
}

export default App;
