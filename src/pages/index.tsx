import { useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import Searcher from "@/components/Searcher";
import TableContainer from "@/components/TableContainer";
import TableRows from "@/components/TableRows";
import useBlocks from "@/hooks/useBlocks";

export default function Home() {
  const { blocks, lastBlock, time, lastTime, ibcEvents } = useBlocks();

  const [blockId, setBlockId] = useState("");
  // Loading flag fetching serverSideProps onClick
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <nav className=" w-[90%] xl:w-[1224px] h-28 flex items-center md:items-end justify-between">
        <Link href={"/"}>
          <Logo />
        </Link>
      </nav>
      <section className="flex flex-col gap-y-5 w-[90%] xl:w-[1224px] min-h-[85vh] items-center justify-center font-mukta ">
        {lastBlock === "" || isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col mt-6 md:mt-14 lg:mt-0 lg:flex-row gap-y-10 lg:gap-x-5 lg:gap-y-0 w-full ">
              <div className="lg:w-[60%] bg-blacklight backdrop-blur-3xl flex flex-col gap-10 justify-center pl-4 md:pl-8 h-[250px] md:h-[315px] items-stretch rounded-lg">
                <div className="flex flex-col gap-2">
                  <p className="font-crimson text-xl md:text-4xl font-bold text-beige">
                    Welcome 👋 to{" "}
                    <span className=" text-transparent bg-clip-text bg-gradient-to-r from-violet to-orange">
                      picasso explorer
                    </span>
                    !
                  </p>
                  <p className="text-sm md:text-lg">
                    Insert a block number or hash to see more info
                  </p>
                </div>
                <Searcher
                  setLoading={setLoading}
                  blockId={blockId}
                  setBlockId={setBlockId}
                />
              </div>
              <div className="flex flex-col gap-y-5 lg:w-[40%]">
                <div className="flex flex-row gap-x-5">
                  <div className="w-1/2 flex flex-col items-center lg:h-28 justify-center bg-loworange rounded-lg">
                    <p className="font-crimson text-lg md:text-xl font-semibold">
                      Actual block
                    </p>
                    <span className="font-crimson text-xl md:text-2xl">
                      {time} s
                    </span>
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-center h-28 bg-lowviolet rounded-lg">
                    <p className="font-crimson text-lg md:text-xl font-semibold">
                      Last block
                    </p>{" "}
                    <span className="font-crimson text-xl md:text-2xl">
                      {lastTime} s
                    </span>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-3 justify-center h-full bg-gradient-to-r py-8 lg:py-0 from-lowviolet to-loworange rounded-lg">
                  <p className="font-crimson text-lg md:text-2xl font-semibold">
                    Last block number
                  </p>{" "}
                  <span className="text-3xl md:text-5xl ">N. {lastBlock}</span>{" "}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-y-10 lg:gap-x-5 lg:gap-y-0">
              <TableContainer
                title="Recent blocks"
                titles={["Number", "Hash", "Author"]}
                clasName="bg-lowviolet"
              >
                {blocks.map((block, index) => {
                  return (
                    <TableRows
                      fields={[
                        block.number.toString(),
                        block.hash,
                        block.author,
                      ]}
                      key={index}
                      color="text-orange w-[20px]"
                      link={setLoading}
                    />
                  );
                })}
              </TableContainer>
              <TableContainer
                title="IBC Connections"
                titles={["Method", "Hash", "Signer"]}
              >
                {ibcEvents.map((event, index) => {
                  return (
                    <TableRows
                      key={index}
                      fields={[event.method, event.hash, event.signer.Id]}
                    />
                  );
                })}
              </TableContainer>
            </div>
          </>
        )}
      </section>
    </>
  );
}
