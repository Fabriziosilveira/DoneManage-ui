// eslint-disable-next-line @typescript-eslint/no-explicit-any
function JSONrandomFill(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)];
}

const statuses = ['Approved', 'Pending', 'Completed', 'Canceled', 'Returned'];
const inventories = ['Sufficient', 'Insufficient'];

export interface Order {
  name: string;
  id: string;
  status: string;
  inventory: string;
  date: string;
  time: string;
}

export const orders: Order[] = Array.from({ length: 100 }, (_, index) => ({
  name: `Company ${index + 1}`,
  id: `ID${index + 1}`,
  status: JSONrandomFill(statuses),
  inventory: JSONrandomFill(inventories),
  date: "24.12.2020",
  time: "11:16 AM",
}));

// Função para paginar os dados
// eslint-disable-next-line @typescript-eslint/no-explicit-any
 export function paginate(array: Order[], page_size: number, page_number: number): Order[] {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

// Função para simular uma resposta de API
export function fetchDummyData(page = 1, pageSize = 5) {
  const paginatedData = paginate(orders, pageSize, page);
  return {
    data: paginatedData,
    currentPage: page,
    totalPages: Math.ceil(orders.length / pageSize),
    totalItems: orders.length,
  };
}

