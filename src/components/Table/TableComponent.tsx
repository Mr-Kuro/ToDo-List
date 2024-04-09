import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useIsMobile } from "@/utils/hooks";
import { MobileContent } from "./components/MobileContent";

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
export const TableComponent = ({
  title,
  tableHeaders,
  tableRows,
  children,
}: TableProps) => {
  const isMobile = useIsMobile();

  const tableBorder = isMobile ? "" : "border border-slate-500";
  return (
    <>
      <Table className={`order-collapse ${tableBorder} m-4 w-11/12 m-auto`}>
        <TableCaption className=" text-center	mt-4 mb-8">
          <h2 className="text-">{title}</h2>
        </TableCaption>

        {isMobile ? (
          <MobileContent tableHeaders={tableHeaders} tableRows={tableRows} />
        ) : (
          <>
            <TableHeader>
              <TableRow
                className="grid"
                style={{
                  gridTemplateColumns: tableHeaders.gridDisposition,
                }}
              >
                {tableHeaders.items.map((header, index) => (
                  <TableHead className="p-0" key={index}>
                    {header[0].toUpperCase() + header.slice(1)}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableRows.map(({ ceil }, index) => (
                <TableRow
                  style={{
                    display: "grid",
                    gridTemplateColumns: tableHeaders.gridDisposition,
                  }}
                  key={`row-${index}`}
                >
                  {ceil.map((value, index) => (
                    <TableCell
                      style={{
                        textAlign: "start",
                      }}
                      key={`cell-${index}`}
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
      {children}
    </>
  );
};
