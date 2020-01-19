import React, { useState, useEffect } from "react";
import "./App.css";
import "./global.css";
import sha1 from "js-sha1";
import base_answer from "./services/base_answer.json";

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

  function encrypt() {
    const { cifrado } = codinationData;
    const encryptSwitchNumber = 6;
    const cifradoArray = cifrado.split("");
    const decifradoArray = [];
    cifradoArray.map(element => {
      let letra = alfabeto.indexOf(element);

      if (letra !== -1) {
        let casas = letra + encryptSwitchNumber;
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

  function decipher() {
    const { cifrado } = codinationData;
    const decipherSwitchNumber = 6;
    const cifradoArray = cifrado.split("");
    const decifradoArray = [];
    cifradoArray.map(element => {
      let posAlfabeto = alfabeto.indexOf(element);

      if (posAlfabeto !== -1) {
        let posNova = posAlfabeto - decipherSwitchNumber;

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
      <div className="module-box">
        <main>
          <h1>CIFRA DE CÉSAR</h1>

          <ul>
            <li>
              <label>Numero de casas: </label>
              <p>{codinationData.numero_casas}</p>
            </li>
            <li>
              <label>Cifrado:</label>
              <p> {codinationData.cifrado}</p>
            </li>
            <li>
              <label>Decifrado: </label>
              <p>{codinationData.decifrado}</p>
            </li>
            <li className="buttom-group">
              <button onClick={decipher}>Decifrar</button>
              <button onClick={encrypt}>Cifrar</button>
              <button onClick={handleSave}>Salvar</button>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
}

export default App;
