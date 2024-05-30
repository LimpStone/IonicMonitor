import { useEffect, useMemo, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonAlert,
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToast,
  IonToggle,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";

setupIonicReact();

import { useHistory } from "react-router-dom";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "./components/Providers";
import { Landing } from "./pages/Landing";
import { addOutline, keyOutline, logOutOutline, peopleOutline, walkOutline } from "ionicons/icons";

const App: React.FC = () => {
 
  const history = useHistory();
  const auth = useMemo(() => {
    return getAuth(firebaseApp);
  }, [firebaseApp]);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push("/");
      } else {
        history.push("/login");
      }
    });
    return () => unsubscribe();
  }, [history]);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Landing />
          </Route>
          <Route path="/tabs">
            <Tabs />
          </Route>
          <Route exact path="/">
            <Redirect to="/tabs/tab1" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
const Tabs: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();
  const handleTabButtonClick = () => {
    setShowAlert(true);
  };
  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Logged out");
      history.push("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return(
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/tabs/tab1" component={Tab1} />
      <Route path="/tabs/tab2" component={Tab2} />
      <Route path="/tabs/tab3" component={Tab3} />
    </IonRouterOutlet>
    <IonTabBar  slot="bottom">
      <IonTabButton className="btncolor2"  tab="tab1" href="/tabs/tab1">
        <IonIcon icon={addOutline} />
        <IonLabel>Add Keys</IonLabel>
      </IonTabButton>
      <IonTabButton className="btncolor2" tab="tab2" href="/tabs/tab2">
        <IonIcon icon={keyOutline} />
        <IonLabel>Keys</IonLabel>
      </IonTabButton>
      <IonTabButton className="btncolor2" tab="tab3" href="/tabs/tab3">
        <IonIcon icon={peopleOutline} />
        <IonLabel>Users</IonLabel>
      </IonTabButton>
      <IonTabButton className="btncolor2"  onClick={handleTabButtonClick} tab="Options">
        <IonIcon icon={logOutOutline} />
        <IonLabel>LogOut</IonLabel>
        <IonAlert
          header="Do you want to Logout?"
          isOpen={showAlert}
          buttons ={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Alert canceled");
              },
            },
            {
              text: "OK",
              role: "confirm",
              handler: () => {
                logout();
                setShowToast(true);
                console.log("Alert si");  
              },
            },
          ]}
          onDidDismiss={() => setShowAlert(false)}
        ></IonAlert>
        <IonToast className="toast1" isOpen={showToast} onDidDismiss={() => setShowToast(false)} message="Succesful logout,later!" duration={5000} icon={walkOutline}></IonToast>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);};
export default App;
