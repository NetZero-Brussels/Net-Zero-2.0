import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import NetZeroIcon from "../public/NetZeroIcon.svg";


export default function Header() {
    return(
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton routerLink="/landing">
                        <IonIcon slot="icon-only" icon={NetZeroIcon}/>
                    </IonButton>
            </IonButtons>
                <IonTitle className="text-2xl font-bold text-[#54BBE9] text-center">Net Zero</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}