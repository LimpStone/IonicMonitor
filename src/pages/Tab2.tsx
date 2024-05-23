import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonList,IonItem,IonLabel } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

import './Tab2.css';
interface Clave {
  status: string;
  usuario: string;
}
const Tab2: React.FC = () => {
  const [listaClaves, setListaClaves] = useState<Clave[]>([{ status: "", usuario: "" }]);
  const [listaKeys, setListaKeys] = useState<string[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "claves/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      const keys: string[] = [];
      const claves: Clave[] = [];

      snapshot.forEach((element) => {
        keys.push(element.key || '');
        claves.push(element.toJSON() as Clave);
      });

      setListaKeys(keys);
      setListaClaves(claves);

      console.log("lista de claves", claves);
    });
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList>
          {listaClaves.map((clave, index) => (
            <IonItem key={listaKeys[index]}>
              <IonLabel>
                <h2>{listaKeys[index]}</h2>
                <p>{JSON.stringify(clave)}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
    </IonPage>
  );
};

export default Tab2;
