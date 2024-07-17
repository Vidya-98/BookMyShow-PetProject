import { defineStore } from 'pinia';

export const useReceiptStore = defineStore('receiptStore', {
    state: () => ({
      receipts: [],
    }),
    actions: {
      addReceipt(receipt) {
        this.receipts.push(receipt);
      },
    },
  });
  