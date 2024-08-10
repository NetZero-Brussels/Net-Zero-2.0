import { IonButton } from "@ionic/react";
import { ApprovedCard } from "../../../components/discovery";
import { mockApprovedProjectData } from "../../../data/approvedCardData";

export default function ApprovedProjects() {
  return (
    <div className="mx-[10%] mt-7">
      <div className="flex flex-row mb-4 justify-between items-center">
        <h1 className="text-[28px] font-semibold leading-[32px] text-center ">
          Approved Projects
        </h1>
        <IonButton className="normal-case h-[80%]" fill="outline">
          View all projects
        </IonButton>
      </div>
      <div className="flex p-1 overflow-y-auto gap-7 whitespace-nowrap snap-proximity snap-y">
        {mockApprovedProjectData.map((project) => (
          <ApprovedCard
            id={project.id}
            key={project.id}
            name={project.name}
            description={project.description}
            moneyRaised={project.moneyRaised}
          />
        ))}
      </div>
    </div>
  );
}
