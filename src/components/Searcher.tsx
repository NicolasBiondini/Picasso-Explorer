import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const regex = /^(0x[0-9a-fA-F]{64})|\d+$/;

type Props = {
  blockId: string;
  setBlockId: Dispatch<SetStateAction<string>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  handleSearch?: (blockId: string) => void;
  className?: string;
};

const Searcher = ({
  blockId,
  setBlockId,
  setLoading,
  handleSearch,
  className,
}: Props) => {
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBlockId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!regex.test(blockId))
      return toast.error("Not a valid hash or block number. Try again! ", {
        position: toast.POSITION.TOP_RIGHT,
      });

    if (setLoading) {
      setLoading(true);
      router.push(`/${blockId}`);
      return;
    }
    if (handleSearch) {
      handleSearch(blockId);
      window.history.pushState({}, "", `/${blockId}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex max-w-[80%] md:max-w-[350px] md:w-full flex-row items-center space-x-2 ${className}`}
    >
      <Input
        className="bg-beige w-[70%] text-violet placeholder:text-violet placeholder:font-medium placeholder:text-md "
        type="text"
        placeholder="Introduce a block number or hash"
        onChange={handleChange}
        value={blockId}
      />
      <Button className="w-[30%] bg-lowviolet hover:bg-violet" type="submit">
        Search
      </Button>
    </form>
  );
};

export default Searcher;
