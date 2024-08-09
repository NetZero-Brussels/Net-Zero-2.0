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
import DiscoveryIcon from "../../public/Discovery.svg";
import AccountIcon from "../../public/Account.svg";

import { Header } from "../../components";

const VoterTabs = () => {
  return (
    <IonPage>
      <Header />
      <IonTabs>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/voter/discovery">
            <IonIcon icon={rocketOutline} />
            <IonLabel>Discovery</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/voter/account">
            <IonIcon icon={personOutline} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
        <IonRouterOutlet>
          <Route path="/voter/discovery" render={() => <></>} exact={true} />
          <Route path="/voter/account" render={() => <></>} exact={true} />
          <Route
            path="/voter"
            render={() => <Redirect to="/voter/discovery" />}
            exact={true}
          />
        </IonRouterOutlet>
      </IonTabs>
    </IonPage>
  );
};

export default VoterTabs;
