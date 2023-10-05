import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  title: string;
  titles: string[];
  children: JSX.Element[];
  bg?: string;
};

const TableContainer = ({ title, titles, children, bg }: Props) => {
  return (
    <div
      className={`py-8 px-8 ${
        bg ? bg : "bg-blacklight"
      }   flex flex-col gap-8 justify-center items-center rounded-lg lg:w-1/2`}
    >
      <h4 className="self-start font-semibold text-2xl font-crimson">
        {title}
      </h4>
      <div className="relative w-full h-[250px] overflow-auto  ">
        <Table>
          <TableHeader>
            <TableRow>
              {titles.map((selectedTitle) => {
                return (
                  <TableHead key={selectedTitle} className="text-center">
                    {selectedTitle}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableContainer;
