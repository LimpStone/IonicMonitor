/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Theme variables */
import "../theme/variables.css";
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";
import {
  IonApp,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";


import { initializeApp } from "firebase/app";
import React, { PropsWithChildren } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBtouk1HAW1HNf8WInK174r2LzGEaYsbtk",
  authDomain: "peliculas-793b9.firebaseapp.com",
  databaseURL: "https://peliculas-793b9-default-rtdb.firebaseio.com",
  projectId: "peliculas-793b9",
  storageBucket: "peliculas-793b9.appspot.com",
  messagingSenderId: "368143259290",
  appId: "1:368143259290:web:d5279eee7e3b2ce8c6f123",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const Providers: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <IonApp>
      <IonReactRouter>
        {children}
      </IonReactRouter>
    </IonApp>
  );
};
