function JSONrandomFill(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

const statuses = ['Approved', 'Pending', 'Completed', 'Canceled', 'Returned'];

export interface Request {
    id: string;
    number: number;
    status: string;
    description: string;
    quantity: number;
    comments?: string; 
    date: string;
    time: string;
}

export const requests: Request[] = Array.from({ length: 50 }, (_,index) => ({
    number: Math.random(),
    id: `ID${index + 1}`,
    status: JSONrandomFill(statuses),
    description: '',
    quantity: Math.random(),
    comments: "",
    date: "24.12.2020",
    time: "11:16 AM",
}));

export function paginate(array: Request[], page_size: number, page_number: number): Request[] {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export function fetchDummyData(page = 1, pageSize = 5) {
    const paginatedData = paginate(requests, pageSize, page);
    return {
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(requests.length / pageSize),
      totalItems: requests.length,
    };
  }