/* eslint-disable */
import "./App.css";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ThirdwebProvider } from "thirdweb/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./variables.css";

/* Page Imports */
import {
  LandingPage,
  Onboarding,
  OnboardingCompleted,
  VoterTabs,
  ITabs,
} from "./pages";

setupIonicReact({});

function App() {
  return (
    <IonApp>
      <ThirdwebProvider>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route path="/landing" render={() => <LandingPage />} />
            <Route path="/onboarding" render={() => <Onboarding />} />
            <Route
              path="/onboarding-completed"
              render={() => <OnboardingCompleted />}
            />
            <Route path="/voter" render={() => <VoterTabs />} />
            <Route path="/institutions" render={() => <ITabs />} />
            <Route
              path="/"
              render={() => <Redirect to="/landing" />}
              exact={true}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </ThirdwebProvider>
    </IonApp>
  );
}

export default App;
