import React from "react";

export function PersonalContribution() {
  return (
    <>
      <div className="mx-[10%] mt-7 mb-20">
        <div className="flex flex-row mb-4 justify-between items-center">
          <h1 className="text-[28px] font-semibold leading-[32px] text-center ">
            Personal Contribution{" "}
          </h1>
        </div>
        <p>
          Record of your successfully voted projects’ contribution to the
          environment.
        </p>
        <div className="mt-7 flex items-center justify-center">
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
      </div>
    </>
  );
}
