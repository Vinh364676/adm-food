import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import productReducer from "./slices/product";
import newsReducer from "./slices/news";
import brandReducer from "./slices/brand";
import categoryReducer from "./slices/category";
import supplierReducer from "./slices/supplier";
import accessoryReducer from "./slices/accessory";
import receiptReducer from "./slices/receipt";
import customerReducer from "./slices/customer";
import userReducer from "./slices/user";
import voucherReducer from "./slices/voucher";
import historyReducer from "./slices/history"
import historyDetailReducer from "./slices/historyDetail"
// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  product: productReducer,
   brand: brandReducer,
  news: newsReducer,
  category:categoryReducer,
  supplier:supplierReducer,
  accessory:accessoryReducer,
  receipt:receiptReducer,
  customer:customerReducer,
  user:userReducer,
  voucher:voucherReducer,
  history:historyReducer,
  historyDetail:historyDetailReducer,
});

export default rootReducer;
