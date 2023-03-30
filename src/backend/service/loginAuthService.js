
import Store from 'electron-store';
import octoService from './octokitService'

export class LoginAuthService {
    constructor(gitHubToken) {
        this.store = new Store();
        this.token = gitHubToken
    }

    setLoginToken() {
        const base64 = Buffer.from(this.token).toString('base64');
        this.store.set('gitHubToken', base64);
    }

    getLoginToken() {
        const tokenEncoded = this.store.get('gitHubToken');

        if (!tokenEncoded)
            return null

        let token = Buffer.from(tokenEncoded, 'base64').toString();
        this.token = token
        
        
        return token
    }

    async loggin () {
        
        if (!this.token)
            this.token = this.getLoginToken()
        
        if (!this.token)
            return false

        let octo = new octoService(this.token);   
        
        try {
            const response = await octo.getAuthenticatedAvatar()

            if (!response)
                return false
        } catch(e) {
            return false
        }

        this.setLoginToken(this.token)
        return true;
    }

}


