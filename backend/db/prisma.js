import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient({
//     log: [
//        "query"
//     ],
// });


// export default prisma;

export const prisma = new PrismaClient(
    // {
    //     log: [
    //     "query"
    //     ],
    // }
);
prisma
  .$connect()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log({ msg: "Error connecting to db", err });
  });