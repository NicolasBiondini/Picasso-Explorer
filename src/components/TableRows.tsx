import { TableCell, TableRow } from "./ui/table";

type Props = {
  fields: string[];
  color?: string;
};

function TableRows({ fields, color }: Props) {
  return (
    <TableRow className=" ">
      {fields.map((field, index) => {
        return (
          <TableCell
            key={`${field} index ${index}`}
            className={`font-medium text-beige ${
              index == 0 && (color ? color : "text-violet")
            } truncate max-w-[100px] text-center `}
          >
            {field}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default TableRows;
