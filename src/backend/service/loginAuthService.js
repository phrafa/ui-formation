
import Store from 'electron-store';

export class LoginAuthService {
    constructor(gitHubToken) {
        this.store = new Store();
        this.token = gitHubToken
    }

    setLoginToken() {
        this.store.set('gitHubToken', this.token);
    }

    getLoginToken() {
        this.store.get('gitHubToken');
    }

    loggin () {
        
        if (!this.token)
            this.token = this.getLoginToken()
        
        if (!this.token)
            return false

        //    

        this.setLoginToken(this.token)
        return true;
    }

}


