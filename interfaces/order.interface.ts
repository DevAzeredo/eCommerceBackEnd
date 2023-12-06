import Item from "./item.interface";
interface Order {
    save(): unknown;
    id: string;
    sellerId: string;
    buyerName: string;
    buyerCellPhone: string;
    dateRegistration: Date;
    observation: string;
    status: string;
    itens: Array<Item>;
  }
  export default Order