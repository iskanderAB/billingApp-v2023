export { 
    addCommandLine ,
    remouveCommandLine,
    editComandLine,
    changeClient,
    changeDate,
    addDocument,
    loadDocuments,
    cleanDocument,
    changePdfReaderVisibility,
    getDocumentById,
    changeTvaTable,
    deleteDocument,
    changeStatut,
    changeRegistrationNumber,
    changeDriver,
    switchDocumentType
} from './documentAction';
export {  
    loadProducts,
    deleteRecord,
    loadCategories,
    loadMarks,
    createProduct,
    changeVisible,
    addMark,
    addCategory,
    changeVisibleProduct,
    updateProduct
} from './productAction';

export {
    loadClients,
    addClient,
    changeVisibleClient,
    updateClient,
    deleteClient,
    filter,
    addPayments,
    removePayments,
} from './client'