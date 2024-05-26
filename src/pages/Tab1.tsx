import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton, IonApp, IonRouterOutlet, IonToast } from '@ionic/react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel} from '@ionic/react';
import { calendar, personCircle, map, informationCircle, walkOutline } from 'ionicons/icons';
import { IonButtons, IonMenu, IonMenuButton } from '@ionic/react';
import {getDatabase,ref,push} from "firebase/database"
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { ellipse, logoReact, square, triangle } from "ionicons/icons";

import './Tab1.css';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import { getAuth, signOut } from 'firebase/auth';


const Tab1: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [alerta, setAlerta] = useState(false);
  const history = useHistory();

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Logged out");
      history.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>UWU</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonButton onClick={() => agregarClaves(1)}>Agregar Claves</IonButton> 
      <IonButton id="open-toast" onClick={logout}>Logout</IonButton>
      <IonToast trigger="open-toast" message="Succesful logout,later!" duration={5000} icon={walkOutline}></IonToast>
      </IonContent>
    </IonPage>
  );
  
};

export default Tab1;
