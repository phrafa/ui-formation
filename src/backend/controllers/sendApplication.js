import { createApplicationService } from '../service/createApplicationService'
import { App } from '../entities/app'

export async function execute(event, args) {
    console.log(args)

    args.rds.split(',')
    args.s3.split(',')
    args.envVar.split('\n')
    args.tribe.split('/')
    
    let app = new App(
        args.projectName, 
        args.tribe[2], 
        args.tribe[1], 
        args.tribe[0],
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

