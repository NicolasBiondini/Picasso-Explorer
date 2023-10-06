import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const regex = /^(0x[0-9a-fA-F]{64})|\d+$/;

type Props = {
  setLoading?: Dispatch<SetStateAction<boolean>>;
  handleSearch?: (blockId: string) => void;
};

const Searcher = ({ setLoading, handleSearch }: Props) => {
  const [blockId, setBlockId] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBlockId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(regex.test(blockId));
    if (!regex.test(blockId)) return;
    if (setLoading) {
      setLoading(true);
      router.push(`/${blockId}`);
      return;
    }
    if (handleSearch) {
      window.history.pushState({}, "", `/${blockId}`);
      handleSearch(blockId);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-row max-w-sm items-center space-x-2 "
    >
      <Input
        className="bg-beige text-violet placeholder:text-violet placeholder:font-medium placeholder:text-md "
        type="text"
        placeholder="Introduce a block number or hash"
        onChange={handleChange}
        value={blockId}
      />
      <Button className=" bg-lowviolet hover:bg-violet" type="submit">
        Search
      </Button>
    </form>
  );
};

export default Searcher;
