import React, { useRef } from "react";
import { IonContent, IonModal } from "@ionic/react";
import { ProjectCardData } from "../../types";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectCardData;
}

const DetailModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      trigger="open-modal"
      initialBreakpoint={0.9}
      breakpoints={[0, 0.9, 1]}
      className="scroll-auto"
    >
      <IonContent className="ion-padding">
        <div className="m-[5%]">
          <h2> {project.projectName}</h2>
          <div>
            <strong> {project.location} </strong>
          </div>
          <div>
            <strong>Fund Raise Goal:</strong> {project.fundRaiseGoal} USDC
          </div>
          <h2>About {project.teamName}</h2>
          <p>
            This project focuses on advanced monitoring and control technologies
            with integrated sensors for safety and energy transfer monitoring.
            The project also prioritizes interoperable communication systems, AI
            tools, and algorithms for optimal energy management and improved
            power quality.
          </p>
          <div style={{ marginTop: "20px" }}>
            <div>🌿 Energy Export: {project.energyExport} kWh / day</div>
            <div>💰 Minimum Investment: {1000} USDC</div>
            <div>📅 Project Duration: 1 to 3 years</div>
            <div>🧑🏼‍🦱 Current Votes: {project.currentVote}</div>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default DetailModal;
