export default class CreditReport {
   constructor(
      public ssn: string,
      public bureauName: string,
      public creditScore: number,
      public id?: string
   ) { }
}
