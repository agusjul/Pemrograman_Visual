const electron = require('electron')


const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;

let pesanbaruWindow;
let daftarpesanWindow;
let daftarmobilWindow;
let pembayaranWindow;

let daftarsewamobil = [];

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

ipcMain.on("booknow", function(){
    pesanbaruWindowCreator()
})

const pesanbaruWindowCreator = () => {
    pesanbaruWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },
        width: 600,
        height: 400,
        title: "Pesan Baru"
    });

    pesanbaruWindow.setMenu(null);
    pesanbaruWindow.loadURL(`file://${__dirname}/sewabaru.html`);
    pesanbaruWindow.on("closed", () => (pesanbaruWindow = null));
};

const daftarpesanWindowCreator = () => {
    daftarpesanWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },
        width: 600,
        height: 400,
        title: "Daftar Sewa"
    });

    daftarpesanWindow.setMenu(null);
    daftarpesanWindow.loadURL(`file://${__dirname}/daftarsewa.html`);
    daftarpesanWindow.on("closed", () => (daftarpesanWindow = null));
};

const daftarmobilWindowCreator = () => {
    daftarmobilWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },
        width: 600,
        height: 400,
        title: "Daftar Mobil"
    });

    daftarmobilWindow.setMenu(null);
    daftarmobilWindow.loadURL(`file://${__dirname}/daftarmobil.html`);
    daftarmobilWindow.on("closed", () => (daftarmobilWindow = null));
};

const pembayaranWindowCreator = () => {
    pembayaranWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },
        width: 600,
        height: 400,
        title: "Pembayaran"
    });

    pembayaranWindow.setMenu(null);
    pembayaranWindow.loadURL(`file://${__dirname}/pembayaran.html`);
    pembayaranWindow.on("closed", () => (pembayaranWindow = null));
};

ipcMain.on("sewa:create", (event, pesan) => {
    daftarsewamobil.push(pesan);
    pesanbaruWindow.close();
    console.log(daftarsewamobil);
});

const menuTemplate = [{
        label : "Beranda",
        submenu :[{
            label : "Sewa Mobil",
            
        }
        ]
    },

    {
        label : "Pesanan",
        submenu:[{
            label: "Pesan Baru",
            click(){
                pesanbaruWindowCreator()
            }
        },
        {
            label: "Daftar Pesanan",
            click(){
                daftarpesanWindowCreator()
            }
        },
        ]
    },

    {
        label : "Mobil",
        submenu:[{
            label: "Daftar Mobil",
            click(){
                daftarmobilWindowCreator()
            }
        },
        {
            label: "Pembayaran",
            click(){
                pembayaranWindowCreator()
            }
        },
        ]
    },

   

    {
        label : "Hubungi Kami",
    },

    {
        label: "View",
        submenu: [{ role: "reload" }, { role: "toggledevtools" }]
    }
]