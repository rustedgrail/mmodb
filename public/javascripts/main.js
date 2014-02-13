(function() {
    createPeer();
    window.data = {
        key: "value"
        , moar: "gaem"
    };

    window.openDb = openDb;
    function openDb() {
        var request = indexedDb.open('mmodb', 1);
        request.onerror = function(event) {
            console.log("ERR");
        };

        request.onsuccess = function(event) {
            var db = request.result;
        };
    }

    function createPeer() {
        var query = parseQuery();
        var peer = new Peer(query.me, {key: 'm8k5mfew7wlv7vi'});

        peer.on('connection', sendNewData);
        if(query.you) connectToPeer(peer, query.you);

    }

    function connectToPeer(peer, id) {
        var conn = peer.connect(id);
        conn.on('open', sendNewData.bind(null, conn));
    }

    function sendNewData(conn) {
        conn.on('data', function(data) {
            window.data = JSON.parse(data);
        });

        window.updateData = function(key, value) {
            window.data[key] = value;
            conn.send(JSON.stringify(window.data));
        };

        conn.send(JSON.stringify(window.data));
    }

    function parseQuery() {
        var search = window.location.search.substring(1).split('&');
        var retVal = {};

        search.forEach(function(query) {
            var parts = query.split('=');
            retVal[parts[0]] = parts[1];
        });

        return retVal;
    }
}());
