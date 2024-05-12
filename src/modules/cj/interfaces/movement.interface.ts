export interface IMovement {
  id: number | null;
  movementType: number | null; //egreso ingreso
  currencyType: number | null;
  amount: number | null;
  dateTime: string | null;
  accountId: number | null;
  numberAccount: number | null;
}
