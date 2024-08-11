import { Redirect, Route } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonPage,
} from "@ionic/react";
import {
  cog,
  flash,
  list,
  personCircleOutline,
  personOutline,
  rocketOutline,
} from "ionicons/icons";
import DiscoveryPage from "./DiscoveryPage";

import IProfilePage from "./ProfilePage";

const ITabs = () => {
  return (
    <IonPage>
      <IonTabs>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/institutions/discovery">
            <IonIcon icon={rocketOutline} />
            <IonLabel>Discovery</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/institutions/account">
            <IonIcon icon={personOutline} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
        <IonRouterOutlet>
          <Route
            path="/institutions/discovery"
            render={() => <DiscoveryPage />}
            exact={true}
          />
          <Route
            path="/institutions/account"
            render={() => <IProfilePage />}
            exact={true}
          />
          <Route
            path="/institutions"
            render={() => <Redirect to="/institutions/discovery" />}
            exact={true}
          />
        </IonRouterOutlet>
      </IonTabs>
    </IonPage>
  );
};

export default ITabs;
