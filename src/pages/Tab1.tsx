import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton, IonApp, IonRouterOutlet, IonToast, IonInput, IonItem } from '@ionic/react';
import {getDatabase,ref,push} from "firebase/database"
import React, { useState } from 'react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [totalkeys, SetKeys] = useState<number>(0);

  const agregarClaves = async (claves: number) => {
    console.log(claves);
    const db = getDatabase();
    let errores = 0;

    for (let i = 0; i < claves; i++) {
      try {
        await push(ref(db, "claves/"), {
          status: "libre",
          usuario: "",
        });
        console.log("claves agregadas " + errores + " errores");
        setTitulo("Claves agregadas");
        setSubtitulo("Claves agregadas con éxito");
        setMensaje("Se agregaron " + claves.toString() + " claves con éxito");
        setAlerta(true);
      } catch (error) {
        console.log(error);
        errores++;
        setTitulo("Error en agregar claves");
        setSubtitulo("Error al agregar claves");
        setMensaje("Error al agregar " + claves.toString() + " claves");
        setAlerta(true);
      }
    }
  };

  return (
    <IonPage>
    <div className= "tab1back">
      <div className="login-container2">
      <IonInput 
            className='custom-input'
            label="Number of keys"
            labelPlacement="floating"
            fill="outline"
            type="number"
            min={1}
            max={100}  
            placeholder="000"
            onIonChange={(e) => SetKeys(Number(e.detail.value))}
            ></IonInput>
      <IonButton className="boton" onClick={() => agregarClaves(totalkeys)}>Add</IonButton>
       
        </div>
        </div>
        </IonPage>
  );
  
};
//<IonButton onClick={() => agregarClaves(1)}>Agregar Claves</IonButton> 
export default Tab1;
