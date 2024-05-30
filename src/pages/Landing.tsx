import {
  IonPage,
  IonButton,
  IonItem,
  IonInput,
  IonToast,                                  
} from "@ionic/react";
import "./Landing.css";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "../components/Providers";
import { useMemo, useState } from "react";
import { useHistory } from "react-router";
import { warningOutline } from "ionicons/icons";

export const Landing: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const auth = useMemo(() => {
    return getAuth(firebaseApp);
  }, [firebaseApp]);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      history.push("/");
      
    } catch (error) {
      const err = error as { code: string; message: string };
      console.error("Error signing in with password and email", err);
      setError(
        "Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo."
      );
      setShowAlert(true);
    }
  };
  return (
    <IonPage>
      <div className= "nepe">
      <div className="login-container">
        <IonItem className="NoCol">
          <IonInput
            label="Email input"
            type="email"
            placeholder="email@domain.com"
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem className="NoCol">
          <IonInput
            label="Password input"
            type="password"
            placeholder="MyPassWord123"
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton className="boton" expand="block" onClick={() => signIn(email, password)}>
          Log in
        </IonButton>
        <IonToast
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={error}
          duration={3000}
          icon={warningOutline}
        ></IonToast>
      </div>
      </div>
    </IonPage>
  );
};
