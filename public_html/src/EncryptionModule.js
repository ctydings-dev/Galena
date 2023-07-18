
class EncryptionModule {

    constructor(terminal, server) {
        this.publicRSAKey = null;

        this.serverRSAKey = null;

        this.privateRSAKey = null;
        this.server = server;
        this.terminal = terminal;
        this.established = false;
        var rsa = new RSA();
        var caller = this;
        rsa.generateKeyPair(function (keyPair) {
            // Callback function receives new 1024 bit key pair as a first argument

            caller.publicRSAKey = keyPair.publicKey;
            caller.privateRSAKey = keyPair.privateKey;
            caller.setup();


        }, 1024); // Key size
    }

    getTerminal = function () {
        return this.terminal;
    }

    getServer = function () {
        return this.server;
    }

    getPublicRSAKey = function () {
        return this.publicRSAKey;
    }

    setRSAKey = function (toSet) {

        this.rsaKey = toSet;
        this.printText('RSA public key recieved.');


    }

    setServerRSAKey = function (toSet) {
        this.serverRSAKey = toSet;
        this.printText('Server RSA key recieved.');
        this.sendRSAKey();


    }

    getServerRSAKey = function () {

        return this.serverRSAKey;

    }

    encryptRSA = function (message) {

        var crypt = new Crypt({rsaStandard: 'RSA-OAEP'});

        var encrypted = crypt.encrypt(this.getServerRSAKey(), message);


        var ret = JSON.parse(encrypted);
        ret = ret.cipher;

        return encrypted;
    }

    getTerminal = function () {
        return this.terminal;
    }

    isEstablished = function () {
        return this.isEstablished === true;
    }

    setup = function () {
        this.requestRSAServerKey();

    }

    printText = function (out) {
        this.getTerminal().printText(out);
    }

    generateAESKey = function () {
        this.aesKey = 'TEST KEY';
    }

    getSessionId = function () {
        return 'test_session';
    }

    sendEcho = function () {

        this.printText('Sending client public RSA key to server.');

        var http = new XMLHttpRequest();
        var url = this.getServer() + '/rsa_echo';
        http.open('POST', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var params = {};
        params.session = this.getSessionId();

        //  params.session = this.encryptRSA(this.getSessionId());
        //   params.rsaKey = this.encryptRSA(this.getPublicRSAKey());

        params.session = this.getSessionId();
        params.rsaKey = this.getPublicRSAKey();



        var comb = JSON.stringify(params);

        var payload = {};
        payload.payload = this.encryptRSA(comb);
        var s = new URLSearchParams(Object.entries(payload)).toString();
        http.send(s);


    }

    sendRSAKey = function () {
        this.printText('Sending client public RSA key to server.');
        var http = new XMLHttpRequest();
        var url = this.getServer() + '/rsa_tunnel_request';
        http.open('POST', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var params = {};
        params.session = this.getSessionId();
        params.session = this.getSessionId();
        params.rsaKey = this.getPublicRSAKey();
        var comb = JSON.stringify(params);
        var payload = {};
        payload.payload = this.encryptRSA(comb);
        var s = new URLSearchParams(Object.entries(payload)).toString();
        http.send(s);

    }

    requestRSAServerKey = function () {


        this.printText('Requesting public key from ' + this.getServer() + '.');
        var http = new XMLHttpRequest();
        var url = this.getServer() + '/?public_key_request=true';
        http.open('GET', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var params = 'orem=ipsum&name=binny';
        var term = this.getTerminal();
        var caller = this;

        var stop = false;
        http.onreadystatechange = (e) => {

            if (e.target.status !== 200) {

                term.printErrorText('RSA public key could not be obtained!');

            }

            if (stop === true) {
                return;
            }
            var out = e.target.response + '';

            if (out.length > 0) {

                if (e.target.status === 200) {
                    stop = true;
                    caller.setServerRSAKey(e.target.response);
                }
            }





        };
        http.send(params);








    }

}

