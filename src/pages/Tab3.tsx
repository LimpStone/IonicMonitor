import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./Tab3.css";
interface Clave {
  apellido: string;
  nombre: string;
  carrera: string;
  semestre: string;
}
const Tab3: React.FC = () => {
  const [listaClaves, setListaClaves] = useState<Clave[]>([
    { apellido: "", nombre: "", carrera: "", semestre: "" },
  ]);
  const [listaKeys, setListaKeys] = useState<string[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "usuarios/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      const keys: string[] = [];
      const claves: Clave[] = [];

      snapshot.forEach((element) => {
        keys.push(element.key || "");
        claves.push(element.toJSON() as Clave);
      });

      setListaKeys(keys);
      setListaClaves(claves);

      console.log("lista de claves", claves);
    });
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            {listaClaves.map((clave, index) => (
              <IonCol size="12" sizeSm="6" sizeMd="4" key={listaKeys[index]}>
                <IonCard>
                <IonGrid>
                      <IonRow>
                        <IonCol size="8">
                          <IonCardTitle>{clave.nombre} {clave.apellido}</IonCardTitle>
                          <IonCardSubtitle>{clave.carrera}</IonCardSubtitle>
                        </IonCol>
                        <IonCol size="4" className="ion-text-right">
                          <img
                            src={"https://picsum.photos/80/80?random=" + index}
                            alt="avatar"
                            className="avatar-img"
                          />
                        </IonCol>
                      </IonRow>
                    </IonGrid>    
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
