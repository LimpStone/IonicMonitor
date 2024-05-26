import { useEffect, useMemo } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
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
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseApp } from "./components/Providers";
import { Landing } from "./pages/Landing";
import { ellipse, logoReact, square } from "ionicons/icons";

const App: React.FC = () => {
  const history = useHistory();

  const auth = useMemo(() => {
    return getAuth(firebaseApp);
  }, [firebaseApp]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si el usuario está autenticado, redirige a la página principal
        history.push("/");
      } else {
        // Si no está autenticado, redirige a la página de inicio
        history.push("/login");
      }
    });

    // Cleanup subscription on unmount
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
const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/tabs/tab1" component={Tab1} />
      <Route path="/tabs/tab2" component={Tab2} />
      <Route path="/tabs/tab3" component={Tab3} />
      <Redirect exact path="/tabs" to="/tabs/tab1" />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/tabs/tab1">
        <IonIcon icon={logoReact} />
        <IonLabel>XD</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/tabs/tab2">
        <IonIcon icon={ellipse} />
        <IonLabel>Tab 2</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/tabs/tab3">
        <IonIcon icon={square} />
        <IonLabel>Tab 3</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);
export default App;
