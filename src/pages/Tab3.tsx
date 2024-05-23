import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonList,IonItem,IonLabel} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import './Tab3.css';
interface Clave {
  apellido: string;
  nombre: string;
  carrera: string;
  semestre: string;
}
const Tab3: React.FC = () => {
  const [listaClaves, setListaClaves] = useState<Clave[]>([{ apellido: "", nombre: "" ,carrera:"",semestre:""}]);
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
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList>
          {listaClaves.map((clave, index) => (
            <IonItem key={listaKeys[index]}>
              <IonLabel>
                <p>{JSON.stringify(clave)}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
    </IonPage>
  );
};

export default Tab3;
