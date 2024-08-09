import {
    IonPage,
    IonHeader,
    IonItem,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonToggle,
    IonLabel,
  } from "@ionic/react";
  
  const Settings = () => {
    
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>Enable Notifications</IonLabel>
              <IonToggle/>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Settings;
  