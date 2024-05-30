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
  IonAlert,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";

import "./Tab2.css";
import { createOutline, trashOutline } from "ionicons/icons";
import { Redirect } from "react-router";

interface Clave {
  status: string;
  usuario: string;
}

const Tab2: React.FC = () => {
  const [items, setItems] = useState<Clave[]>([]);
  const [itemToDeleteKey, setItemToDeleteKey] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [itemsWithKeys, setItemsWithKeys] = useState<
    { key: string; data: Clave }[]
  >([]);
  useEffect(() => {
    const db = getDatabase();
    const clavesRef = ref(db, "claves/");

    const unsubscribe = onValue(clavesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const claves: Clave[] = Object.values(data);
        const keys = Object.keys(data);
        const itemsWithKeysData = keys.map((key, index) => ({
          key,
          data: claves[index],
        }));
        setItems(claves);
        setItemsWithKeys(itemsWithKeysData);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const confirmDelete = (itemKey: string) => {
    setItemToDeleteKey(itemKey);
    setShowDeleteAlert(true);
  };

  const handleDelete = (itemKey: string) => {
    const db = getDatabase();
    const claveRef = ref(db, `claves/${itemKey}`);
    remove(claveRef)
      .then(() => {
        console.log("Item deleted successfully.");
        setItemsWithKeys((prevItems) =>
          prevItems.filter((item) => item.key !== itemKey)
        );
      })
      .catch((error) => {
        console.error("Error deleting item: ", error);
      });
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            {itemsWithKeys.map((item) => (
              <IonCol size="12" sizeSm="6" sizeMd="4" key={item.key}>
                <IonCard className="card">
                  <IonGrid>
                    <IonRow>
                      <IonCol size="8">
                        <IonCardHeader>
                          <IonCardTitle>
                            Status: {item.data.status}
                          </IonCardTitle>
                          <IonCardSubtitle>
                            User: {item.data.usuario}
                          </IonCardSubtitle>
                        </IonCardHeader>
                      </IonCol>
                      
                      <IonCol size="4">
                        <div className="center-right">
                          <IonButton
                            className="btncolor"
                            fill="clear"
                            onClick={() => confirmDelete(item.key)}
                          >
                            <IonIcon icon={trashOutline} />
                          </IonButton>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Confirm Delete"
          message="Are you sure you want to delete this item?"
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                setShowDeleteAlert(false);
              },
            },
            {
              text: "Delete",
              handler: () => {
                if (itemToDeleteKey) {
                  handleDelete(itemToDeleteKey);
                  setItemToDeleteKey(null);
                }
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
