const electron = require('electron');
const { v4 : uuidv4 } = require('uuid');
uuidv4();

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;

let todayWindow;
let pesanbaruWindow;
let daftarmobilWindow;



var daftarsewamobil = [];
var daftarbayar = [];



app.on("ready", () => {
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }, 
        title : "Rentaku - Sewa Mobil Jadi Mudah"
    });

    todayWindow.loadURL(`file://${__dirname}/index.html`);
    todayWindow.on("closed", () => {

        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

//Membuat jendela

const daftarmobilWindowCreator = () => {
    daftarmobilWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },
        width: 600,
        height: 600,
        title: "Daftar Mobil"
    });

    daftarmobilWindow.setMenu(null);
    daftarmobilWindow.loadURL(`file://${__dirname}/daftarmobil.html`);
    daftarmobilWindow.on("closed", () => (daftarmobilWindow = null));
};

// const pesanbaruWindowCreator = () => {
//     pesanbaruWindow = new BrowserWindow({
//         webPreferences: {
//             nodeIntegration : true
//         },
//         width: 600,
//         height: 400,
//         title: "Daftar Mobil"
//     });

//     pesanbaruWindow.setMenu(null);
//     pesanbaruWindow.loadURL(`file://${__dirname}/sewabaru.html`);
//     pesanbaruWindow.on("closed", () => (pesanbaruWindow = null));
// };





// Menu Template
//Membuka jendela pesan baru

ipcMain.on('mobilsewa', (event, arg) =>{
    console.log(arg);
    todayWindow.webContents.send('update', arg);
});

ipcMain.on("datakirim", function(){
    todayWindow.loadURL(`file://${__dirname}/pembayaran.html`)
})

ipcMain.on("booknow", function(){
    todayWindow.loadURL(`file://${__dirname}/sewabaru.html`);
});

ipcMain.on("carimobil", function(){
    daftarmobilWindowCreator();
});

ipcMain.on("opelcorsa", function(){
    opelcorsaWindowCreator();
});

ipcMain.on("sewa:create", (event, pesan) => {
    pesan["id"] = uuidv4();
    daftarsewamobil.push(pesan);
    console.log(daftarsewamobil);
});


ipcMain.on("pembayaran", (event, pesan) => {
    pesan["id"] = uuidv4();
    daftarbayar.push(pesan)
    console.log(daftarbayar);
    todayWindow.loadURL(`file://${__dirname}/daftarbayar.html`);
});

ipcMain.on("bayar:request:list", event =>{
    todayWindow.webContents.send('bayar:response:list', daftarbayar)
});



ipcMain.on("sewa:request:list", event => {
    todayWindow.webContents.send('sewa:response:list', daftarsewamobil)
});



// Menu Template

const menuTemplate = [{
        label : "Beranda",
        click(){
            todayWindow.loadURL(`file://${__dirname}/index.html`);  
        }
    },

    {
        label : "Pesanan",
        submenu:[{
            label: "Pesan Baru",
            click(){
                todayWindow.loadURL(`file://${__dirname}/sewabaru.html`);
            }
        },
        {
            label: "Daftar Pesanan",
            click(){
                todayWindow.loadURL(`file://${__dirname}/daftarsewa.html`);
            }
        },
        ]
    },

    {
        label : "Mobil",
        submenu:[{
            label: "Daftar Mobil",
            click(){
                todayWindow.loadURL(`file://${__dirname}/viewmobil.html`);
            }
        },
        {
            label: "Pembayaran",
            click(){
                todayWindow.loadURL(`file://${__dirname}/daftarbayar.html`);
            }
        },
        ]
    },

   

    {
        label : "About us",
        click(){
            todayWindow.loadURL(`file://${__dirname}/about.html`);
        }
    },

    {
        label: "View",
        submenu: [{ role: "reload" }, { role: "toggledevtools" }]
    }
]