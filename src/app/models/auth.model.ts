export class Auth {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        private _token:string,
        private _expirationDate: Date
    ) {}

    
    get token() {
        if (!this._expirationDate || new Date() > this._expirationDate) {
            return null;
        }
        
        return this._token;
    }
    
}