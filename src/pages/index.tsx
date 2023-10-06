import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import Searcher from "@/components/Searcher";
import TableContainer from "@/components/TableContainer";
import TableRows from "@/components/TableRows";
import useBlocks from "@/hooks/useBlocks";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // Loading flag fetching serverSideProps onClick
  const [isLoading, setLoading] = useState(false);

  const { blocks, lastBlock, time, lastTime, ibcEvents } = useBlocks();

  return (
    <>
      <section className="flex flex-col gap-y-5 w-[90%] xl:w-[1224px] min-h-[85vh] items-center justify-center font-mukta ">
        {lastBlock === "" || isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-x-5 lg:gap-y-0 w-full ">
              <div className="lg:w-[60%] bg-blacklight backdrop-blur-3xl flex flex-col gap-10 justify-center pl-8 h-[315px] items-stretch rounded-lg">
                <div className="flex flex-col gap-2">
                  <p className="font-crimson text-4xl font-bold text-beige">
                    Welcome 👋 to{" "}
                    <span className=" text-transparent bg-clip-text bg-gradient-to-r from-violet to-orange">
                      picasso explorer
                    </span>
                    !
                  </p>
                  <p className="text-lg">
                    Insert a block number or hash to see more info
                  </p>
                </div>
                <Searcher setLoading={setLoading} />
              </div>
              <div className="flex flex-col gap-y-5 lg:w-[40%]">
                <div className="flex flex-row gap-x-5">
                  <div className="w-1/2 flex flex-col items-center lg:h-28 justify-center bg-loworange rounded-lg">
                    <p className="font-crimson text-xl font-semibold">
                      Actual block
                    </p>{" "}
                    <span className="font-crimson text-2xl">{time} s</span>
                  </div>
                  <div className="w-1/2 flex flex-col items-center justify-center h-28 bg-lowviolet rounded-lg">
                    <p className="font-crimson text-xl font-semibold">
                      Last block
                    </p>{" "}
                    <span className="font-crimson text-2xl">{lastTime} s</span>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center gap-3 justify-center h-full bg-gradient-to-r py-8 lg:py-0 from-lowviolet to-loworange rounded-lg">
                  <p className="font-crimson text-2xl font-semibold">
                    Last block number
                  </p>{" "}
                  <span className="text-5xl ">N. {lastBlock}</span>{" "}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-y-10 lg:gap-x-5 lg:gap-y-0">
              <TableContainer
                title="Recent blocks"
                titles={["Number", "Hash", "Author"]}
                bg="bg-lowviolet"
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
                      color="text-orange"
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
