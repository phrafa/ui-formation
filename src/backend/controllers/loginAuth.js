import { LoginAuthService } from '../service/loginAuthService'

export async function execute(event, args) {
    const obj = new LoginAuthService(args);
    console.log('======', args)
    let isLoggIn = await obj.loggin()

    event.reply('loginAuth', isLoggIn)
}

