class ServerPing {

    constructor(terminal, address) {
        this.terminal = terminal;
        this.address = address;

    }

    getTerminal = function () {
        return this.terminal;
    }

    getAddress = function () {
        return this.address;
    }

    ping = function () {
        var mod = new EncryptionModule(this.getTerminal(), this.getAddress());

    }

}