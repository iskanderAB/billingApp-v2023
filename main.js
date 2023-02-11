const path = require("path");
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  session,
  dialog,
  inAppPurchase,
} = require("electron");
const controller = require("./controllers/mainController");
// const reloader = require('electron-reload');
const isDev = require("electron-is-dev");
const {
  User,
  Document,
  Product,
  Category,
  Mark,
  Person,
  CommandLine,
  Payments,
} = require("./models");
const { type } = require("os");


let win = null;
function createSplashScreen() {
  const win = new BrowserWindow({
    width: 300, // 400
    height: 400, // 60
    x: "center",
    y: "center",
    transparent: true,
    frame: false,
    minHeight: 300,
    minWidth: 300,
    resizable: false,
  });
  win.loadFile("atomCSS/index.html");
  return win;
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "white",
    show: false,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      webSecurity: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // win.loadFile(`file://${path.join(__dirname, '/build/index.html')}`);
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "build/index.html")}`
  );
  // Open the DevTools.
  // if (isDev) {
  //   win.webContents.openDevTools();
  // }
  //win.webContents.openDevTools();
  return win;
}

// desktop application
app.whenReady().then(() => {
  const mainApp = createWindow();
  const splash = createSplashScreen();
  mainApp.once("ready-to-show", () => {
    splash.show();
    setTimeout(() => {
      splash.destroy();
      mainApp.show();
    }, 1000);
  });
});

// app.whenReady().then(async () => {
//   if (isDev)
//     await session.defaultSession.loadExtension(
//       path.join(__dirname, "react-devtools"),
//       { allowFileAccess: true }
//     );
// });

app.on("window-all-closed", () => {
  if (process.platform === "win32") {
    app.quit();
  }
});

ipcMain.on("notify", (_, message) => {
  new Notification({
    title: "stockApp",
    body: message,
  }).show();
});


controller.connection();

ipcMain.handle("loadDocuments", async (_, arges) => {
  const documents = await Document.findAll({
    include: [
      {
        model: Person,
        attributes: ["fullName"],
      },
    ],
    where: {
      archived : false
    },
  });
  //win.webContents.send('ping', users);
  return JSON.stringify(documents);
});

ipcMain.handle("loadProducts", async (_, args) => {
  const products = await Product.findAll({ include: { all: true } });
  return JSON.stringify(products);
});
ipcMain.handle("deleteProduct", async (_, id) => {
  const result = await Product.destroy({
    where: {
      id: id,
    },
  });
  new Notification({
    title: `${app.getName()}`,
    body: "produit effacer avec succeé",
  }).show();
  return result;
});

ipcMain.handle("loadMarks", async (_, id) => {
  const marks = await Mark.findAll({ row: true });
  return marks.map((v) => v.dataValues);
});
ipcMain.handle("loadCategories", async (_, id) => {
  const categories = await Category.findAll({ row: true });
  return categories.map((v) => v.dataValues);
});

ipcMain.handle("createProduct", async (_, newProduct) => {
  Object.keys(newProduct).forEach((key) =>
    newProduct[key] === undefined || newProduct[key] === null
      ? delete newProduct[key]
      : {}
  );
  const product = await Product.create({
    ...newProduct,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return product;
});


ipcMain.handle("updateProduct", async (_, product) => {
  Product.update(product, {
    where: {
      id: product.id,
    },
  })
    .then((result) => {
      ////console.log("result ♥ ", result);
    })
    .catch((error) => {
      ////console.log(error);
    });
});


//services//
ipcMain.handle("getImagePath", async (_, args) => {
  let path = null;
  await dialog
    .showOpenDialog(win, {
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png"] }],
    })
    .then((result) => {
      path = result.filePaths[0] || null;
    })
    .catch((err) => {
      ////console.log(err);
    });
  return path;
});

ipcMain.handle("createMark", async (_, newMark) => {
  const mark = Mark.create({
    name: newMark,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return mark;
});

ipcMain.handle("createCategory", async (_, newCategory) => {
  const category = Category.create({
    name: newCategory,
  });
  return category;
});

ipcMain.handle("loadClients", async (_, args) => {
  const clients = await Person.findAll({
    include: { all: true },
    where: {
      type: "C",
      archived : false
    },
  });
  return JSON.stringify(clients);
});

ipcMain.handle("addClient", async (_, newClient) => {
  const client = await Person.create({
    ...newClient,
    type: "C",
    Payments:[]
  },
  {
    include: [ Payments ]
  });
  return JSON.stringify(client);
});

ipcMain.handle("updateClient", async (_, client) => {
  Person.update(client, {
    where: {
      id: client.id,
    },
  })
    .then((result) => {
      ////console.log("result ♥ ", result);
    })
    .catch((error) => {
      ////console.log(error);
    });
});

ipcMain.handle("deleteClient", async (_, id) => {
  const result = await Person.update(
    {
      archived : true
    },
    {
        where: {
        id: id,
      }
  }
  );
  ////console.log("result => ", result);
  new Notification({
    title: `${app.getName()}`,
    body: "client  effacer avec succeé",
  }).show();
  return result;
});

ipcMain.handle("addDocument", async (_, newDocument) => {
  if (newDocument.type =="Facture")
    newDocument.CommandLines.forEach(async(p) => {
      await Product.increment(
        {
          stock : -p.quantity
        },
      {
        where : {
          id : p.ProductId
        }
      })
    });



  const document = await Document.create(
    {
      ...newDocument,
    },
    {
      include: [CommandLine],
    }
  );
  const person = await document.getPerson();
  const data = { ...document.dataValues, Person: person.fullName };
  return data;
});

ipcMain.handle("deleteDocument", async (_, id) => {
  const result = await Document.update(
    {
      archived : true
    },
    {
        where: {
        id: id,
      }
  });
  ////console.log("result => ", result);
  new Notification({
    title: `${app.getName()}`,
    body: "Document effacer avec succeé",
  }).show();
  return result;
});

ipcMain.handle("getDocumentById", async (_, id) => {
  const document = await Document.findByPk(id, { include: { all: true } });
  return JSON.stringify(document);
});


ipcMain.handle("changeStatut", async (_, id , statut) => {
  const document = await Document.update(
    {
      status : !statut
    },
    {
        where: {
        id: id,
      }
  }
  );
  return JSON.stringify(document);
});

ipcMain.handle("switchDocumentType", async (_, id , type ,reference) => {
  const oldDocument = await Document.findByPk(id, { include: { all: true } });
  // ////console.log("old  1 =>" , oldDocument);


  if (type == "Facture")
  oldDocument.CommandLines.forEach(async(p) => {
    // delete p.id;
    await Product.increment(
      {
        stock : -p.quantity
      },
    {
      where : {
        id : p.ProductId
      }
    })
  });
  delete  oldDocument.dataValues.id;
  oldDocument.dataValues.reference = reference;
  oldDocument.dataValues.type = type;
  const document = await Document.create(
    {...oldDocument.dataValues ,
      CommandLines: oldDocument.CommandLines.map(v => {
        delete v.dataValues.id;
        return v.dataValues
      }),

    }, 
    {
      include: [CommandLine],
    }
  );

  const person = await document.getPerson();
  const data = { ...document.dataValues, Person: person.fullName };
  await Document.update(
    {
      archived : true
    },
    {
        where: {
        id: id,
      }
  });
  return data;
});


ipcMain.handle("getPayments", async (_, id) => {
  ////console.log(" id => ", id);
  const document = await payments.findByPk(id, { include: { all: true } });
  ////console.log("document by id => ", document);
  return JSON.stringify(document);
});


ipcMain.handle("addPayments", async (_, PersonId,amount,date,type,checkNum,checkName,checkDate) => {
  ////console.log("debug => " ,PersonId,amount,date,type,checkNum,checkName,checkDate);
  const payments = await Payments.create({
    PersonId,
    amount,
    date,
    type,
    checkNum,
    checkName,
    checkDate
  });
  ////console.log("debug => " , payments);
  return payments;
});


ipcMain.handle("removePayments", async (_, id) => {
  const result = await Payments.destroy({
    where: {
      id: id,
    },
  });
  new Notification({
    title: `${app.getName()}`,
    body: "Payment effacer avec succeé",
  }).show();
  return result;
});