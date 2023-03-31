import { createApplicationService } from '../service/createApplicationService'
import { App } from '../entities/app'

export async function execute(event, args) {
    console.log(args)

    args.rds.split(',')
    args.s3.split(',')
    args.envVar.split('\n')
    
    let app = new App(
        args.projectName, 
        args.tribe, 
        'nodejs', 
        args.ingress, 
        args.rds, 
        args.sqs, 
        args.s3, 
        args.envVar
    )

    let formation = new createApplicationService(app, event)

    await formation.createApp()

}

