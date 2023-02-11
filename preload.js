const { ipcRenderer , contextBridge} = require('electron');
//console.log("preload ♥ ... ")

contextBridge.exposeInMainWorld(
    'electronAPI' , {
        saveProducts : products => ipcRenderer.send('notify',products),
        loadDocuments : _ => ipcRenderer.invoke('loadDocuments'),
        loadProducts : _ => ipcRenderer.invoke('loadProducts'),
        deleteProduct : (id) => ipcRenderer.invoke('deleteProduct' , id),
        updateProduct : (product) =>ipcRenderer.invoke('updateProduct' ,product),
        loadCategories : () => ipcRenderer.invoke('loadCategories'),
        loadMarks : () => ipcRenderer.invoke('loadMarks'),
        createProduct : (product) => ipcRenderer.invoke('createProduct',product),
        getImagePath : _ => ipcRenderer.invoke('getImagePath'),
        addMark : (mark) => ipcRenderer.invoke('createMark',mark),
        addCategory : (category) => ipcRenderer.invoke('createCategory',category),
        loadClients : () => ipcRenderer.invoke('loadClients'),
        addClient : (client) => ipcRenderer.invoke('addClient' ,client),
        updateClient : (client) =>ipcRenderer.invoke('updateClient' ,client),
        deleteClient : (id) => ipcRenderer.invoke('deleteClient' , id),
        addDocument : (document) => ipcRenderer.invoke('addDocument',document),
        deleteDocument : (id) => ipcRenderer.invoke('deleteDocument',id),
        getDocumentById : (id) => ipcRenderer.invoke('getDocumentById',id),
        changeStatut :(id,statut) => ipcRenderer.invoke('changeStatut',id,statut),
        switchDocumentType :(id,type,reference) => ipcRenderer.invoke('switchDocumentType',id,type,reference),
        getPayments: (clientId) => ipcRenderer.invoke('getPayments',clientId),
        addPayments: (PersonId,amount,date,typePayments,checkNum,checkName,checkDate) => ipcRenderer.invoke('addPayments',PersonId,amount,date,typePayments,checkNum,checkName,checkDate),
        removePayments: (id) => ipcRenderer.invoke('removePayments',id),
    }
);