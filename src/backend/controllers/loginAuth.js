import { LoginAuthService } from '../service/loginAuthService'

export async function execute(event, args) {
    const obj = new LoginAuthService(args);
    
    let isLoggIn = await obj.loggin()

    event.reply('loginAuth', {
        login: isLoggIn,
        message: (isLoggIn) ? 'Success' : 'Token Invalid.'
    })
}

