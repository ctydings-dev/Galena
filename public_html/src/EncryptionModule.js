
class EncryptionModule {

    constructor(controller, server) {
        this.publicRSAKey = null;

        this.serverRSAKey = null;

        this.privateRSAKey = null;
        this.server = server;
        this.controller = controller;
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

    getController = function () {
        return this.controller;
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

    getPrivateRSAKey = function () {
        return this.privateRSAKey;
    }

    decryptRSA = function (message) {


        var priKey = this.getPrivateRSAKey();


        var crypt = new Crypt({

            rsaStandard: 'RSA-OAEP'
        });

        var temp = 'HELLOD DOLLY';


        temp = crypt.encrypt(this.getPublicRSAKey(), temp);
        temp = crypt.decrypt(this.getPrivateRSAKey(), temp);


        var decrypted = crypt.decrypt(priKey, message);
        return decrypted.message;




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
        this.getController().printText(out);
    }

    generateAESKey = function () {
        this.aesKey = 'TEST KEY';
    }

    getSessionId = function () {
        return 'test_session';
    }

    sendRSACommand = function (cmd) {
        this.printText('Sending Command: ' + cmd);
        var http = new XMLHttpRequest();
        var url = this.getServer() + '/rsa_request';
        http.open('POST', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        var payload = this.packageRSACommand(cmd);
        ;
        var s = new URLSearchParams(Object.entries(payload)).toString();
        var term = this;
        var stop = false;
        http.onreadystatechange = (e) => {

            if (stop === true) {
                return;
            }

            if (e.target.status !== 200) {
                term.printErrorText('RSA command could not be completed!');
            }

            var encrypted = e.target.response;
            if (encrypted.length > 0) {
                stop = true;
                encrypted = JSON.parse(encrypted);

                var decrypted = term.decryptRSA(encrypted.payload);
                decrypted = JSON.parse(decrypted);
                term.getController().processOutput(decrypted);




            }
        };
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
        var term = this;
        var stop = false;
        http.onreadystatechange = (e) => {

            if (stop === true) {
                return;
            }
            if (e.target.status !== 200) {
                term.printErrorText('RSA tunnel could not be established!');
            }
            var encrypted = e.target.response;
            if (encrypted.length > 0) {
                term.printText('RSA tunnel established.');


                stop = true;
            }
        };
        http.send(s);

    }

    packageRSACommand = function (command) {
        var data = {

            session: this.getSessionId(),
            type: 'COMMAND',
            command: command

        };

        data = JSON.stringify(data);
        var ret = {};
        ret.payload = this.encryptRSA(data);


        return ret;
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

                caller.getController().printErrorText('RSA public key could not be obtained!');

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
