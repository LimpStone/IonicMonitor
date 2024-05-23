import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton } from '@ionic/react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel} from '@ionic/react';
import { calendar, personCircle, map, informationCircle } from 'ionicons/icons';
import { IonButtons, IonMenu, IonMenuButton } from '@ionic/react';
import {getDatabase,ref,push} from "firebase/database"
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';

import './Tab1.css';


const Tab1: React.FC = () => {

  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [alerta, setAlerta] = useState(false);
  
  const agregarClaves = async (claves: number) => {
    console.log(claves);
    const db = getDatabase();
    let errores = 0;

    for (let i = 0; i < claves; i++) {
      try {
        await push(ref(db, "claves/"), {
          status: "",
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>UWU</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonButton onClick={() => agregarClaves(1)}>Agregar Claves</IonButton>
      </IonContent>
    </IonPage>
  );
  
};

export default Tab1;
