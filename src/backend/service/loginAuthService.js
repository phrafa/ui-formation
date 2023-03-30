
import Store from 'electron-store';
import octoService from './octokitService'

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

    async loggin () {
        
        if (!this.token)
            this.token = this.getLoginToken()
        
        if (!this.token)
            return false

        let octo = new octoService(this.token);   
        
        try {
            if (!await octo.getAutenticatedAvatar())
            return false
        } catch {
            return false
        }

        this.setLoginToken(this.token)
        return true;
    }

}


