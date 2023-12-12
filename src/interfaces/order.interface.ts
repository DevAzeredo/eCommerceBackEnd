import iItem from "./item.interface";
interface iOrder {
    id: string;
    sellerId: string;
    buyerName: string;
    buyerCellPhone: string;
    dateRegistration: Date;
    observation: string;
    status: string;
    itens: iItem[];
  }
  export default iOrder