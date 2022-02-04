var db;
var trx;

self.addEventListener('install', event => {
    console.log("install");

    let openRequest = indexedDB.open("BudgetTrackerDB", 1);

    openRequest.onerror = function() {
        console.error("Error", openRequest.error);
    };
      
    openRequest.onsuccess = function() {
        console.log('Success');
    };

    openRequest.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('transaction')) {
            trx = db.createObjectStore('transaction', {keyPath: 'id'});
        };
    };
    
});

self.addEventListener('active', event => {
    event.waitUntil(
        createDB()
    );
    console.log("activ");
});

function createDB() {
    idb.open('products', 1, function(upgradeDB) {
      var store = upgradeDB.createObjectStore('beverages', {
        keyPath: 'id'
      });
      store.put({id: 123, name: 'coke', price: 10.99, quantity: 200});
      store.put({id: 321, name: 'pepsi', price: 8.99, quantity: 100});
      store.put({id: 222, name: 'water', price: 11.99, quantity: 300});
    });
}