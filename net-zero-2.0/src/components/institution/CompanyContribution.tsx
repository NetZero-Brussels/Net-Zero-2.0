import React from "react";

export function ContributionCard() {
  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex flex-col gap-[8px]">
        <div className="text-[24px] not-italic font-medium leading-[32px] text-[#3C3C3C] font-futura">
          Personal contribution
        </div>
        <p className="text-[14px] not-italic font-semibold leading-[22px] text-[#656565]">
          Record of your travel history and environmental impacts.
        </p>
      </div>
      <div
        id="first-row"
        className="flex flex-row gap-[24px] content-center justify-around"
      >
        <div id="col1" className="flex flex-col p-[11px] gap-[5px]">
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px]">
            Walking
          </p>
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px] text-[#8FB8A8]">
            293KM
          </p>
        </div>
        <div className="w-px h-[74px] bg-[#D2F8E1]"></div>
        <div id="col2" className="flex flex-col p-[11px] gap-[5px]">
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px]">
            Car Rides
          </p>
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px] text-[#8FB8A8]">
            14.1k-km
          </p>
        </div>
        <div className="w-px h-[74px] bg-[#D2F8E1]"></div>
        <div id="col3" className="flex flex-col p-[11px] gap-[2px]">
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px]">
            Subway
          </p>
          <p className="text-center text-[16px] not-italic font-semibold leading-[26px] text-[#8FB8A8]">
            4.2k-km
          </p>
        </div>
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
            567t
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
            32kWh
          </p>
        </div>
      </div>
    </div>
  );
}
