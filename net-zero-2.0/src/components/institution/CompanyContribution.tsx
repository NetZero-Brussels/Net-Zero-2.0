import React from "react";

export function CompanyContribution() {
  return (
    <div className="mx-[10%] mt-14 mb-14">
      <div className="flex mb-2 justify-between items-center">
        <h1 className="text-[28px] font-semibold leading-[32px] text-center ">
          Company Contribution
        </h1>
      </div>
      <div className="mb-6">
        <p>
          Record of your successfully funded projects' contribution to the
          environment.
        </p>
      </div>
      <div
        id="second-row"
        className="flex flex-row gap-[24px] content-center justify-around"
      >
        <div
          id="col2_1"
          className="flex flex-col p-[11px] gap-[5px]  items-center"
        >
          <div className="flex flex-col items-center">
            <p className="text-center text-[16px] not-italic font-semibold leading-[26px]">
              Carbon Footprint
            </p>
            <p className="text-center text-[16px] not-italic font-semibold leading-[26px]">
              offsetted
            </p>
          </div>
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px] text-[#8FB8A8]">
            4,523,345t
          </p>
        </div>
        <div className="w-px h-[100px] bg-[#D2F8E1]"></div>
        <div
          id="col2_2"
          className="flex flex-col p-[11px] gap-[2px] items-center justify-center h-[105px]"
        >
          <p className="text-center items-center text-[16px] not-italic font-semibold leading-[26px]">
            Energy Converted
          </p>
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px] text-[#8FB8A8]">
            124,186kWh
          </p>
        </div>
      </div>
      <div
        id="first-row"
        className="flex flex-row gap-[24px] content-center justify-around"
      >
        <div id="col1" className="flex flex-col p-[11px] gap-[5px]">
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px]">
            Solar Energy
          </p>
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px] text-[#8FB8A8]">
            314kWh
          </p>
        </div>
        <div className="w-px h-[74px] bg-[#D2F8E1]"></div>
        <div id="col2" className="flex flex-col p-[11px] gap-[5px]">
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px]">
            Gas
          </p>
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px] text-[#8FB8A8]">
            267kWh
          </p>
        </div>
        <div className="w-px h-[74px] bg-[#D2F8E1]"></div>
        <div id="col3" className="flex flex-col p-[11px] gap-[2px]">
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px]">
            Hydro
          </p>
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px] text-[#8FB8A8]">
            155kWh
          </p>
        </div>
      </div>
    </div>
  );
}
