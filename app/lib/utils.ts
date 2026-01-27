import { Revenue } from './definitions';

export class NumMatrix {
  private pefMatrix: number[][] = [];
  
  constructor(matrix: number[][]) {
    for (let i = 1; i < matrix.length + 1; i++) {
      // if (i === 1) {
      //   this.pefMatrix[i - 1] = [];
      //   this.pefMatrix[i] = [];
      // } else {
      //   this.pefMatrix[i] = [];
      // }
      if (typeof this.pefMatrix[i - 1] === 'undefined') {
        this.pefMatrix[i - 1] = [];
      }

      if (typeof this.pefMatrix[i] === 'undefined') {
        this.pefMatrix[i] = [];
      }

      for (let j = 1; j < matrix[0].length + 1; j++) {
        if (i === 1) {
          this.pefMatrix[i - 1][j] = 0;
          this.pefMatrix[i - 1][j - 1] = 0
        }

        if (j === 1) {
          this.pefMatrix[i][j - 1] = 0
        }

        console.log("🚀 ~ NumMatrix ~ constructor ~ this.pefMatrix[i - 1][j]:", this.pefMatrix[i - 1][j])
        const top = this.pefMatrix[i - 1][j];
        const left = this.pefMatrix[i][j - 1];
        const diagonal = this.pefMatrix[i - 1][j - 1];
        this.pefMatrix[i][j] = matrix[i - 1][j - 1] + top + left - diagonal;
        console.log("🚀 ~ NumMatrix ~ constructor ~ this.pefMatrix:", this.pefMatrix)
      }
    }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
      return this.pefMatrix[row2 + 1][col2 + 1] - this.pefMatrix[row1][col2 + 1] - this.pefMatrix[row2 + 1][col1] + this.pefMatrix[row1][col1];
  }
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
