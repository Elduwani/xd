import { fromPromise, assign, setup } from "xstate";
import {
   checkBureauService,
   checkReportsTable,
   determineMiddleScore,
   generateInterestRate,
   saveCreditProfile,
   saveCreditReport,
   userCredential,
   verifyCredentials,
} from "./machineLogicService";

export default class CreditProfile {
   constructor(
      public SSN: string,
      public LastName: string,
      public FirstName: string,
      public GavUnionScore: number,
      public EquiGavinScore: number,
      public GavperianScore: number,
      public ErrorMessage: string,
      public MiddleScore: number,
      public InterestRateOptions: number[],
      public id?: string
   ) { }
}

export const creditCheckMachine = setup({
   types: {
      events: {} as {
         type: "Submit";
         SSN: string;
         lastName: string;
         firstName: string;
      },
      context: {} as CreditProfile,
   },

   actors: {
      checkBureau: fromPromise(async (props: { input: { ssn: string; bureauName: string } }) =>
         await checkBureauService(props.input)
      ),
      checkReportsTable: fromPromise(async (props: { input: { ssn: string; bureauName: string } }) =>
         await checkReportsTable(props.input)
      ),
      verifyCredentials: fromPromise(async (props: { input: userCredential }) =>
         await verifyCredentials(props.input)
      ),
      determineMiddleScore: fromPromise(async (props: { input: number[] }) =>
         await determineMiddleScore(props.input)
      ),
      generateInterestRates: fromPromise(async (props: { input: number }) =>
         await generateInterestRate(props.input)
      ),
   },
   actions: {
      saveReport: ({ context }: { context: CreditProfile }, params: { bureauName: string }) => {
         console.log("saving report to the database...");
         saveCreditReport({
            ssn: context.SSN,
            bureauName: params.bureauName,
            creditScore: context.EquiGavinScore,
         });
      },
      emailUser: function ({ context }) {
         console.log(
            "emailing user with their interest rate options: ",
            context.InterestRateOptions
         );
      },
      saveCreditProfile: async function ({ context }) {
         console.log("saving results to the database...");
         await saveCreditProfile(context);
      },
      emailSalesTeam: function ({ context, event }, params) {
         console.log(
            'emailing sales team with the user"s information: ',
            context.FirstName,
            context.LastName,
            context.InterestRateOptions,
            context.MiddleScore
         );
      },
   },
   guards: {
      allSucceeded: ({ context }) => {
         console.log("allSucceeded guard called");
         return true
      },
      gavUnionReportFound: ({ context }) => {
         return context.GavUnionScore > 0;
      },
      equiGavinReportFound: ({ context }) => {
         return context.EquiGavinScore > 0;
      },
      gavperianReportFound: ({ context }) => {
         return context.GavperianScore > 0;
      },
   },
}).createMachine({
   /** @xstate-layout N4IgpgJg5mDOIC5QFsCuAbALgSwA7rAGEAnSbTQgCzAGMBrAOhtInKtsYFEA7TMY7NygACAJLcAZgHtiyAIY4p3AMQBlVACNk5ANoAGALqJQuKbHLYlxkAA9EAZgAcAVgYB2ACwAmAIyO3zgA0IACeiD5ueu4AbM7RXs4AvonBaFh4BCRkFNT0TCxsuYwAavzYEiGCIlkQYLzYcuiwyhBKYAyCAG5SdO1pOPhEBTkc+dnseaUCFVXCNXU4jbAIXVI0Cpbc+gbb1qbmitzWdggAnB6u0Y72zqf2AcFhCAC0jgz20W5+AcmpGAOZYYTRjMcZFBhTcqVIRzFgLBpNZT8YgyBj4BTSWQMfoZIZg0ag1gjSZlGYw+b1JYrbjddaHba7JAgfYWKxMk56R6IPS-EA4wY1QoEoHg4FVQWYVQ0GRwFptBiwTAKPr-XES4FjIkasVCCVSmWwRkmMyso7sxBeDz+BgeU7OG56DwePTOZwuLkIa7RBiOFynPT2QNuaL2U6OXn8wH4vKEoV5HVQPXS0jNVrcdqK5XY1UCkXC6OMBNJg06HxGJksw7HRDOHyuV1uG5W+zeU5XD3PW7vRweOsfU5tl1eU4RnNRrXg2PEwtFcXDfUphgJzgAR1Q2AA4nJOoIl7OhAAxGScGzYRVVABKYFMxEwcvTHRpPXaYDXm+3ggAIgAhACCNEwGQjWZE0q3NBAAlOd5-ViV1HS8LxfQ9HxELeFDLRuAdh1ONxR3SXMC01OMZw4OdsgXOA91IoRV3XLcd24Kj6CqI9iBPM8cCEK8bzvNN2lWXoGFfOiP24H9-0A4hS3LY0Dk2asIK7UM9Fg5x4NQ5CnSieIMNuU5sNwlI+THPEJ3zMz433RN52TSjlzfejdwTVj2PPLjrxkO9kVRdFMExZAhIc0TxIAoDDD2UD5PAyDoJU101O8DTQnCN17HeNxdKwgdDL+fDx2IojpyYugyKJCjYGKqpaPfBiGAPMBMBoShLw829734p9BOEmrBHqxrKAksKZJAuS2VAE4fCtKDPjdHwUMiBJJs0vQvAYe1nC8Nw3EcaIZuiDw8IBUyCqnbUrOLRd7JE2q+qalqeKRYgUWINF0AxGQAu6xzuFugbQqk8KK0isbbHCW0ohbewfCh2s5r0O1NNdNaPltHtHEtbxDrVPMYxxkjmN1GyDUqoR6IAVW4TYSagFzTzcqBuM89rH26QSoG3CnNhCyTgMrKLxsQAJvUiOJfT0Rw9BW3bkO2nx3hbW5+y8PRIhy4y8uOorTtFc6icuqzycppRqdpjj7qZviWefBh2c6TmlG5oCywi0azQFxThZdK4JYlqXomQu40uuC47mifSVZVrGCIskE8epi67INjmjcY5zjzpziGdarynp8t6-I+m3k65v9-t54G3dBj33C9sXfa8aXkoQZXgzWntFbDluXSj-Ktbjos9cT6ioENqnfvNtrLYE9pbftn6GqawaAeGvmQYmjxYgYBJlLiHxznOf2m78AcGD37bPDbXs5pHIzI01jVtdGAfyNsiqE1H43x-ch7vJe3z-KLnbFOv0l7l1dgpSam99LoTdNEAMG03AB1tO4VWalHCnD8PYS0Pd76Tn7rrF+xN37blwGUOQqcrKm3pozSe8pp6ANIQIchwJQGA1kqaBS20oiug3v4eG4tQwem2q4S0-hMG+nQc4NWd91R4MIs-Mqr9qb0UYQ0Chw8qGZxobxOhnUZ4kLIdwFhZdnZA3AdFO0DAMG3D8JaHw8MfAejtG8BC4tvZ3BQr2HBsjzIFQUeQcqyiDFMPUQTGm6czbfyZr-V670sS21UcwoorCV4VwgXFNaXgnBOhmr2QMyE6xuAYPEaIER-QBG8NDbxcdH6WWHgnN+SdOiJMYl-LOD0p56KYEUeiAAFQxKSXYcPAnWR0p83Btj4f6a4pwnFjNRl8a4Ei7TSJMj43G8iCGKKIU0lpdUF7NSiW1GJ-9C5NQ4H0gZZc2EjWGe7UZHhxmTMiNMwRTc7RywHGIpZvoVnVMIrUxgn4Gr8G0JTIQ4g+ApkwBeZUAB5XAhwKrAqhWCqoABZbAEAIAEAoszehsBbIotBYIDYShBlmLuVXFsktilxGsdlDGTiMruEhlgm4GUslJFvmsmpcdiWyEEFUSF-A4AwvhYizYFU2mwr4KmXRrMVQa3WbHQiAq0UQt4KKxUsqwAIqRfs-ql5lTLFWHSTYDIbmr0rice4e9ikRBcC2HCTKm6+iKY2DwgYuWcpuMkIy3ApC1HgEyGReMhlgXds8NsHYsmPOyXWBC1xQzoPDDy5VfKCwRv5lXZ4VoOyQJ9D2RNA5Rm+HsP8mOhUNQ8ChbMcQ-kyWV2tZwtKIZEIoSCEfLs8RuW5SOiq6t4JIRkmqHCSkTRs1r0QKUj19oYKTXsU2D0HKbSOnOBLSIgZbSVpOvg+pg8Q3sMjVXDt8snBxrDrcLlHpnAby3labaysNoYI8KsjNAL91hIadTaq30p02ocMOc96MWxXv0jcZCyttIIS9Z8PQcMVq7r7psg9hD9bDz-aJE2ETqHZwAwpe4RTAwXrA3aCDXanh9iKegjKdYrSeMdMhh+X6SqE3Q0PMJWGboHPFFIZAgw+AEZGRlN4CGuWvJUo4o+NxXCSwSCGdCO0fjpoHZmqt-jJRKKuj1VpvGjmYGE-c6G00PieH8HejKCMj69lcPcBKmCEgN2Y3IjTWyAnaastx3cbSDxyGwAQCARmq4RBQlvBDjhPEd3sMhO9aU5ouGHBlL4+0+3qzU5+1D37D1BKATmlt4FAxRGDJFuu8nYiHyo2HIOCtzjOgQ54FzviiqacCcQvLxs05sQzhPQzlKT22u2jEUrPtytxA9MrLBDAVJfEbCrOIIYmsbLc2h7ZGGwkfz00a3U-HBNgGCxNL4UQ7gNi+JtfSiCj7JumxtFCNLdp1aW6qlb2WOONOHptw1d0DMHfCNfG0TgMqS3uPtC4AdxZty+AOe0dZodPaHU-dzWmdkfeLp-fTNN-OBd+wgULq1lZ+Ci6HRCActrvHtG+lswYMEoXh4C+OOX2stJxyRh9sGJZZX2jFpuYcPWPr3vDMOYY039uxpll7bHrJvdy3srrrktH4f6zm21kW2eiPhvpS+3OqOOiiLaO9oP2VzQrapsXVb6etc86j5phivuHMTLtggQmlfTtx54IOk2UL8JmR6HaaVRGLKcL8qRdPWOlQ8yjjbwS1F296zjuayDKn+BDgI2Z7zoYPu+UHyR76Mvm7D+xtbnHJcqNt75rHkB49XtPgkAMLp1JISPgGKCAfxHB4Oqb6Oe61UgsFeCqAIroW6v1VKnHiE4h0rDrDl1ToPS85tMW2IFxfT2lz2b7vVb1VCs1VCsVw-JVKGRb3jVUBMXYtxbZMf-pHkVYZTPjwvu1JbzZT6hCfrO+9xYz31F2+B9aqHxKgajKiaizhcPFr2MOBrhlLPm6iGM-l6uylIm-mlmGuLgVFvv3oPnvoAVKgwLqrAL0iiDuLUEFi7oBggKGHAZ2rtHpNAQ-m6laFYj2N6hysgf6okEAA */
   context: {
      SSN: "",
      FirstName: "",
      LastName: "",
      GavUnionScore: 0,
      EquiGavinScore: 0,
      GavperianScore: 0,
      ErrorMessage: "",
      MiddleScore: 0,
      InterestRateOptions: [],
   },
   id: "multipleCreditCheck",
   initial: "creditCheck",
   states: {
      creditCheck: {
         initial: "Entering Information",
         states: {
            "Entering Information": {
               on: {
                  Submit: {
                     target: "Verifying Credentials",
                     reenter: true,
                     actions: () => {
                        console.log("Submitting credentials");
                     }
                  },
               },
            },

            "Verifying Credentials": {
               invoke: {
                  src: "verifyCredentials",
                  input: ({ event }) => event,
                  onDone: {
                     target: "CheckingCreditScores",
                     actions: assign({
                        SSN: ({ event }) => event.output.SSN,
                        FirstName: ({ event }) => event.output.firstName,
                        LastName: ({ event }) => event.output.lastName,
                     }),
                  },
                  onError: {
                     target: "Entering Information",
                     actions: assign({
                        ErrorMessage: ({ event }: { context: any, event: { error: any } }) =>
                           "Failed to verify credentials. Details: " + event.error
                     }),
                  },
               },
            },

            CheckingCreditScores: {
               type: "parallel",
               description: "Kick off a series of requests to the 3 American Credit Bureaus and await their results",
               states: {
                  CheckingEquiGavin: {
                     initial: "CheckingForExistingReport",
                     states: {
                        CheckingForExistingReport: {
                           invoke: {
                              id: "equiGavinDBActor",
                              src: "checkReportsTable",
                              input: ({ context: { SSN } }) => ({
                                 bureauName: "EquiGavin",
                                 ssn: SSN,
                              }),
                              onDone: [
                                 {
                                    target: "FetchingComplete",
                                    guard: "equiGavinReportFound",
                                    actions: assign({
                                       EquiGavinScore: ({ event }) => event.output?.creditScore ?? 0,
                                    }),
                                 },
                                 { target: "FetchingReport" },
                              ],
                              onError: { target: "FetchingFailed" },
                           },
                        },
                        FetchingComplete: {
                           type: "final",
                           entry: {
                              type: "saveReport",
                              params: {
                                 bureauName: "EquiGavin",
                              },
                           },
                        },
                        FetchingReport: {
                           invoke: {
                              id: "equiGavinFetchActor",
                              src: "checkBureau",
                              input: ({ context: { SSN } }) => ({
                                 bureauName: "EquiGavin",
                                 ssn: SSN,
                              }),
                              onDone: {
                                 target: "FetchingComplete",
                                 actions: assign({
                                    EquiGavinScore: ({ event }) => event.output ?? 0,
                                 }),
                              },
                              onError: {
                                 target: "FetchingFailed",
                              },
                           },
                        },
                        FetchingFailed: {
                           type: "final",
                        },
                     },
                  },
                  CheckingGavUnion: {
                     initial: "CheckingForExistingReport",
                     states: {
                        CheckingForExistingReport: {
                           invoke: {
                              id: "gavUnionDBActor",
                              src: "checkReportsTable",
                              input: ({ context: { SSN } }) => ({
                                 bureauName: "GavUnion",
                                 ssn: SSN,
                              }),
                              onDone: [
                                 {
                                    actions: assign({
                                       GavUnionScore: ({ event }) =>
                                          event.output?.creditScore ?? 0,
                                    }),
                                    target: "FetchingComplete",
                                    guard: "gavUnionReportFound",
                                 },
                                 {
                                    target: "FetchingReport",
                                 },
                              ],
                              onError: {
                                 target: "FetchingFailed",
                              },
                           },
                        },
                        FetchingComplete: {
                           type: "final",
                           entry: {
                              type: "saveReport",
                              params: {
                                 bureauName: "GavUnion",
                              },
                           },
                        },
                        FetchingReport: {
                           invoke: {
                              src: "checkBureau",
                              id: "gavUnionFetchActor",
                              input: ({ context: { SSN } }) => ({
                                 bureauName: "GavUnion",
                                 ssn: SSN,
                              }),
                              onDone: {
                                 actions: assign({
                                    GavUnionScore: ({ event }) => event.output ?? 0,
                                 }),
                                 target: "FetchingComplete",
                              },
                              onError: {
                                 target: "FetchingFailed",
                              },
                           },
                        },
                        FetchingFailed: {
                           type: "final",
                        },
                     },
                  },
                  CheckingGavperian: {
                     initial: "CheckingForExistingReport",
                     states: {
                        CheckingForExistingReport: {
                           invoke: {
                              id: "gavperianCheckActor",
                              src: "checkReportsTable",
                              input: ({ context: { SSN } }) => ({
                                 bureauName: "Gavperian",
                                 ssn: SSN,
                              }),
                              onDone: [
                                 {
                                    target: "FetchingComplete",
                                    guard: "gavperianReportFound",
                                    actions: assign({
                                       GavperianScore: ({ event }) =>
                                          event.output?.creditScore ?? 0,
                                    }),
                                 },
                                 { target: "FetchingReport" },
                              ],
                              onError: { target: "FetchingFailed" },
                           },
                        },
                        FetchingComplete: {
                           type: "final",
                           entry: {
                              type: "saveReport",
                              params: {
                                 bureauName: "Gavperian",
                              },
                           },
                        },
                        FetchingReport: {
                           invoke: {
                              id: "checkGavPerianActor",
                              src: "checkBureau",
                              input: ({ context: { SSN } }) => ({
                                 ssn: SSN,
                                 bureauName: "Gavperian",
                              }),
                              onDone: {
                                 target: "FetchingComplete",
                                 actions: assign({
                                    GavperianScore: ({ event }) => event.output ?? 0,
                                 }),
                              },
                              onError: {
                                 target: "FetchingFailed",
                              },
                           },
                        },
                        FetchingFailed: {
                           type: "final",
                        },
                     },
                  },
               },
               onDone: [
                  {
                     target: "DeterminingInterestRateOptions",
                     guard: "allSucceeded",
                     reenter: true,
                  },
                  {
                     target: "Entering Information",
                     actions: assign({
                        ErrorMessage: ({ context }) =>
                           "Failed to retrieve credit scores.",
                     }),
                  },
               ],
            },

            DeterminingInterestRateOptions: {
               description: "After retrieving results, determine the middle score to be used in home loan interest rate decision",
               initial: "DeterminingMiddleScore",
               states: {
                  DeterminingMiddleScore: {
                     invoke: {
                        id: "scoreDeterminationActor",
                        src: "determineMiddleScore",
                        input: ({ context: { EquiGavinScore, GavUnionScore, GavperianScore } }) => [EquiGavinScore, GavUnionScore, GavperianScore],
                        onDone: {
                           target: "FetchingRates",
                           actions: [
                              { type: "saveCreditProfile" },
                              assign({
                                 MiddleScore: ({ event }) => event.output,
                              }),
                           ],
                        },
                     },
                  },
                  FetchingRates: {
                     invoke: {
                        src: "generateInterestRates",
                        input: ({ context: { MiddleScore } }) => MiddleScore,
                        onDone: [
                           {
                              target: "RatesProvided",
                              actions: assign({
                                 InterestRateOptions: ({ event }) => [event.output],
                              }),
                           },
                        ],
                     },
                  },
                  RatesProvided: {
                     type: "final",
                     entry: [
                        { type: "emailUser" },
                        { type: "emailSalesTeam" },
                     ],
                  },
               },
            },
         },
      },
   },
});
