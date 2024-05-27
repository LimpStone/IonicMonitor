import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import "./Tab2.css";
import { trashOutline } from "ionicons/icons";
import { Redirect } from "react-router";

interface Clave {
  status: string;
  usuario: string;
}

const Tab2: React.FC = () => {
  const [items, setItems] = useState<Clave[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const clavesRef = ref(db, "claves/");

    const unsubscribe = onValue(clavesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const claves: Clave[] = Object.values(data);
        setItems(claves);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            {items.map((clave, index) => (
              <IonCol size="12" sizeSm="6" sizeMd="4" key={index}>
                <IonCard className="car">
                  <IonCardHeader>
                    <IonCardTitle>Status: {clave.status}</IonCardTitle>
                    <IonCardSubtitle>User: {clave.usuario}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonButton fill="clear">Edit</IonButton>
                  <IonButton fill="clear" ><IonIcon icon={trashOutline} /></IonButton>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
