import React from "react";
import { Dropdown } from "../../Dropdown/DropDown";

export type TableHeaderProps = {
  gridDisposition: string;
  items: string[];
};

export type TableRowsProps = {
  ceil: (string | number | React.ReactNode)[];
}[];

export type TableProps = {
  title: string;
  tableHeaders: TableHeaderProps;
  tableRows: TableRowsProps;
  children?: React.ReactNode;
};
export const MobileContent = ({
  tableHeaders,
  tableRows,
}: Pick<TableProps, "tableHeaders" | "tableRows">) => {
  return (
    <section aria-label="Card Content" className={`flex flex-col w-ful`}>
      {tableRows.map(({ ceil }) => (
        <div className="flex-col w-90 m-2">
          <Dropdown title={<p className="text-base  ">{ceil[2]}</p>} shortCaption={<p className="">{ceil[1]}</p>}>
            <div>
              <div className="flex flex-wrap justify-around rounded-b-lg text-black bg-gray-100">
                {/* Dropdown Content Items when click on the card */}
                {tableHeaders.items.map((header, headerIndex) => {
                  const excludedHeaders = ["status", "title"];
                  if (!excludedHeaders.includes(header)) {
                    return (
                      <div
                        key={`cell-${headerIndex}`}
                        className={`grid items-baseline justify-center text-center max-w-[70%] min-w-[10rem] m-2`}
                      >
                        <span className=" p-2 border-b border-slate-500 text-md font-bold">
                          {header[0].toUpperCase() + header.slice(1)}
                        </span>
                        <span>{ceil[headerIndex]}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </Dropdown>
        </div>
      ))}
    </section>
  );
}