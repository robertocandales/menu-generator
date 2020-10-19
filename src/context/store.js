import React, { createContext, useReducer } from 'react';
import { CategodyReducer } from './CategodyReducer/CategodyReducer';
import { ContextDevTool } from 'react-context-devtool';
import { EditCategoryReducer } from './EditCategoryReducer/EditCategoryReducer';
import { TaxOptionsReducer } from './TaxOptionsReducer/TaxOptionsReducer';
import { AddSalesTaxOptionsReducer } from './AddSalesTaxOptionsReducer/AddSalesTaxOptionsReducer';
import { ResetItemFormDataReducer } from './ResetItemFormDataReducer/ResetItemFormDataReducer';
import { ProductReducer } from './ProductReducer/ProductReducer';
import { EditProductReducer } from './EditProductReducer/EditProductReducer';
import { MenuConfigReducer } from './MenuConfigReducer/MenuConfigReducer';
import { QRcodeReducer } from './QRcodeReducer/QRcodeReducer';

const initialState = {
  categories: [],
  edit: [],
  taxOptions: [],
  taxOptionSales: { salesTaxOption: '', salesTaxPorcent: '' },
  dataReset: false,
  allProducts: [],
  editAproduct: {},
  menuConfigData: {},
  url: '',
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategodyReducer, initialState.categories);
  const [editCategoryState, editCategorydispatch] = useReducer(
    EditCategoryReducer,
    initialState.editCategory,
  );
  const [addOptionsTax, addOptionsTaxDispatch] = useReducer(
    TaxOptionsReducer,
    initialState.taxOptions,
  );
  const [addSalesTaxOptions, addSalesTaxOptionsDispatch] = useReducer(
    AddSalesTaxOptionsReducer,
    initialState.taxOptionSales,
  );
  const [itemResetDataState, itemResetDataDispatch] = useReducer(
    ResetItemFormDataReducer,
    initialState.dataReset,
  );
  const [productState, productDispatch] = useReducer(ProductReducer, initialState.allProducts);
  const [editProductState, editProductDispatch] = useReducer(
    EditProductReducer,
    initialState.editAproduct,
  );
  const [menuConfigState, menuConfigDispatch] = useReducer(
    MenuConfigReducer,
    initialState.menuConfigData,
  );
  const [QRcodeURLState, QRcodeURLDispatch] = useReducer(QRcodeReducer, initialState.url);
  return (
    <Provider
      value={{
        state,
        dispatch,
        editCategoryState,
        editCategorydispatch,
        addOptionsTax,
        addOptionsTaxDispatch,
        addSalesTaxOptions,
        addSalesTaxOptionsDispatch,
        itemResetDataState,
        itemResetDataDispatch,
        productState,
        productDispatch,
        editProductState,
        editProductDispatch,
        menuConfigState,
        menuConfigDispatch,
        QRcodeURLState,
        QRcodeURLDispatch,
      }}>
      {children}
    </Provider>
  );
};

export { store, StateProvider };
