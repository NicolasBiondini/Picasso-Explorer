import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { TableCell, TableRow } from "./ui/table";

type Props = {
  fields: string[];
  color?: string;
  link?: Dispatch<SetStateAction<boolean>>;
};

function TableRows({ fields, color, link }: Props) {
  return (
    <TableRow className=" ">
      {fields.map((field, index) => {
        return (
          <TableCell
            key={`${field} index ${index}`}
            className={`font-medium text-beig truncate max-w-[100px] text-center ${
              index === 0 && (color ? color : "text-violet w-[20px]")
            } `}
          >
            {link && index == 0 ? (
              <Link
                className="hover:text-lowviolet"
                onClick={() => link(true)}
                href={`/${[fields[1]]}`}
              >
                {field}
              </Link>
            ) : (
              field
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default TableRows;
